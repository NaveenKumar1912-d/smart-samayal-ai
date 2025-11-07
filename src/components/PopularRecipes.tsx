import RecipeCard from "./RecipeCard";
import dosaImage from "@/assets/dosa.jpg";
import idliImage from "@/assets/idli.jpg";
import sambarImage from "@/assets/sambar.jpg";

const recipes = [
  {
    title: "Masala Dosa",
    image: dosaImage,
    time: "30 mins",
    servings: "4 people",
    category: "Breakfast",
    description: "Crispy golden dosa filled with spiced potato masala, served with sambar and chutneys"
  },
  {
    title: "Soft Idli with Sambar",
    image: idliImage,
    time: "20 mins",
    servings: "4 people",
    category: "Breakfast",
    description: "Fluffy steamed rice cakes served with aromatic sambar and coconut chutney"
  },
  {
    title: "Traditional Sambar",
    image: sambarImage,
    time: "45 mins",
    servings: "6 people",
    category: "Main Course",
    description: "Flavorful lentil-based vegetable stew with tamarind and aromatic spices"
  }
];

const PopularRecipes = () => {
  return (
    <section id="popular-recipes" className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Popular Tamil Recipes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover authentic South Indian dishes loved across Tamil Nadu
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, idx) => (
            <RecipeCard key={idx} {...recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRecipes;
