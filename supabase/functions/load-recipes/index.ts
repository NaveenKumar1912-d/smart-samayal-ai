import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Recipe {
  id: string;
  name: string;
  region: string;
  category: string;
  ingredients: string[];
  steps: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch the zip file from public directory
    const zipUrl = `${req.headers.get('origin')}/data/tamilnadu_recipes.zip`;
    const zipResponse = await fetch(zipUrl);
    
    if (!zipResponse.ok) {
      throw new Error('Failed to fetch zip file');
    }

    const zipData = await zipResponse.arrayBuffer();
    
    // Import JSZip dynamically
    const JSZip = (await import('https://esm.sh/jszip@3.10.1')).default;
    const zip = await JSZip.loadAsync(zipData);
    
    const recipes: Recipe[] = [];
    
    // Process all .txt files in the zip
    for (const [filename, file] of Object.entries(zip.files)) {
      if (filename.endsWith('.txt') && !file.dir) {
        const content = await file.async('text');
        const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
        
        const recipe: Recipe = {
          id: '',
          name: '',
          region: '',
          category: '',
          ingredients: [],
          steps: []
        };
        
        let currentSection = '';
        
        for (const line of lines) {
          if (line.startsWith('Recipe Name:')) {
            recipe.name = line.replace('Recipe Name:', '').trim();
            recipe.id = recipe.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          } else if (line.startsWith('Region Style:') || line.startsWith('Region:')) {
            recipe.region = line.replace('Region Style:', '').replace('Region:', '').trim();
          } else if (line.startsWith('Category:')) {
            recipe.category = line.replace('Category:', '').trim();
          } else if (line === 'Ingredients:') {
            currentSection = 'ingredients';
          } else if (line === 'Steps:' || line === 'Instructions:') {
            currentSection = 'steps';
          } else if (line.startsWith('-') && currentSection === 'ingredients') {
            recipe.ingredients.push(line.replace(/^-\s*/, '').trim());
          } else if (line.match(/^\d+\./) && currentSection === 'steps') {
            recipe.steps.push(line.replace(/^\d+\.\s*/, '').trim());
          }
        }
        
        // Only add valid recipes
        if (recipe.name && recipe.ingredients.length > 0 && recipe.steps.length > 0) {
          recipes.push(recipe);
        }
      }
    }
    
    console.log(`Loaded ${recipes.length} recipes from zip file`);
    
    return new Response(JSON.stringify({ recipes }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in load-recipes function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage, recipes: [] }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
