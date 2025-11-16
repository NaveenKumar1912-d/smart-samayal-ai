import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ChefHat, Sparkles, Loader2 } from "lucide-react";
import { ParsedRecipe } from "@/utils/recipeParser";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


const AllRecipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRecipe, setSelectedRecipe] = useState<ParsedRecipe | null>(null);
  const [generatedRecipes, setGeneratedRecipes] = useState<ParsedRecipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadedRecipes, setLoadedRecipes] = useState<ParsedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecipesFromZip();
  }, []);

  const loadRecipesFromZip = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('load-recipes');
      
      if (error) throw error;
      
      if (data?.recipes) {
        setLoadedRecipes(data.recipes);
        toast.success(`Loaded ${data.recipes.length} recipes successfully!`);
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
      toast.error('Failed to load recipes from zip file');
    } finally {
      setIsLoading(false);
    }
  };

  const allRecipes = [...loadedRecipes, ...generatedRecipes];
  const regions = ["all", ...new Set(allRecipes.map(r => r.region))];
  const categories = ["all", ...new Set(allRecipes.map(r => r.category))];

  const handleGenerateRecipe = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-recipe', {
        body: { 
          region: selectedRegion !== "all" ? selectedRegion : undefined,
          category: selectedCategory !== "all" ? selectedCategory : undefined
        }
      });

      if (error) throw error;
      
      if (data) {
        setGeneratedRecipes(prev => [data, ...prev]);
        toast.success(`Generated new recipe: ${data.name}`);
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast.error('Failed to generate recipe. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = selectedRegion === "all" || recipe.region === selectedRegion;
    const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
    
    return matchesSearch && matchesRegion && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading 500+ Tamil Nadu recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ChefHat className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-4xl font-bold">Tamil Nadu Recipe Collection</h1>
              <p className="text-muted-foreground mt-1">
                {allRecipes.length} recipes available ({generatedRecipes.length} AI-generated)
              </p>
            </div>
          </div>
          <Button 
            onClick={handleGenerateRecipe} 
            disabled={isGenerating}
            size="lg"
            className="gap-2"
          >
            <Sparkles className="h-5 w-5" />
            {isGenerating ? "Generating..." : "Generate Recipe"}
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground self-center">Region:</span>
              {regions.map(region => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground self-center">Category:</span>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card 
              key={recipe.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <CardContent className="p-4">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md mb-3 flex items-center justify-center">
                  <ChefHat className="h-12 w-12 text-primary/40" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">{recipe.region}</Badge>
                  <Badge variant={recipe.category === "Vegetarian" ? "default" : "destructive"}>
                    {recipe.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {recipe.ingredients.length} ingredients • {recipe.steps.length} steps
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No recipes found. Try adjusting your filters.</p>
          </div>
        )}

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRecipe(null)}
          >
            <Card 
              className="max-w-2xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <ScrollArea className="h-full max-h-[90vh]">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-2xl font-bold">{selectedRecipe.name}</h2>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedRecipe(null)}>
                        ✕
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{selectedRecipe.region}</Badge>
                      <Badge variant={selectedRecipe.category === "Vegetarian" ? "default" : "destructive"}>
                        {selectedRecipe.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Ingredients:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedRecipe.ingredients.map((ingredient, idx) => (
                          <li key={idx} className="text-sm">{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Steps:</h3>
                      <ol className="list-decimal list-inside space-y-2">
                        {selectedRecipe.steps.map((step, idx) => (
                          <li key={idx} className="text-sm">{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
