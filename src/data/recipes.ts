import idliImg from "@/assets/idli.jpg";
import dosaImg from "@/assets/dosa.jpg";
import sambarImg from "@/assets/sambar.jpg";
import pongalImg from "@/assets/pongal.jpg";
import chettinadChickenImg from "@/assets/chettinad-chicken.jpg";
import vadaImg from "@/assets/vada.jpg";
import payasamImg from "@/assets/payasam.jpg";
import rasamImg from "@/assets/rasam.jpg";

export type DietType = "veg" | "non-veg";
export type MealType = "breakfast" | "lunch" | "snacks" | "sweets" | "drinks";
export type SpiceLevel = "mild" | "medium" | "spicy";
export type Region = "chettinad" | "madurai" | "kongu" | "tanjore" | "general";

export interface Recipe {
  id: string;
  name: string;
  nameEnglish: string;
  category: MealType;
  dietType: DietType;
  spiceLevel: SpiceLevel;
  region: Region;
  image: string;
  cookTime: string;
  servings: number;
  calories: number;
  description: string;
  ingredients: string[];
  steps: string[];
}

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Idli",
    nameEnglish: "Steamed Rice Cakes",
    category: "breakfast",
    dietType: "veg",
    spiceLevel: "mild",
    region: "general",
    image: idliImg,
    cookTime: "30 mins",
    servings: 4,
    calories: 150,
    description: "Soft, fluffy steamed rice cakes - a Tamil Nadu breakfast staple!",
    ingredients: ["Rice", "Urad dal", "Fenugreek seeds", "Salt"],
    steps: [
      "Soak rice and urad dal separately for 4-6 hours",
      "Grind into smooth batter",
      "Ferment overnight",
      "Pour into idli moulds and steam for 10-12 minutes"
    ]
  },
  {
    id: "2",
    name: "Masala Dosa",
    nameEnglish: "Crispy Rice Crepe with Potato Filling",
    category: "breakfast",
    dietType: "veg",
    spiceLevel: "medium",
    region: "general",
    image: dosaImg,
    cookTime: "25 mins",
    servings: 2,
    calories: 220,
    description: "Crispy golden dosa with spiced potato masala - irresistible!",
    ingredients: ["Dosa batter", "Potatoes", "Onions", "Green chillies", "Curry leaves", "Mustard seeds"],
    steps: [
      "Prepare potato masala with spices",
      "Heat tawa and spread dosa batter thin",
      "Add masala filling",
      "Fold and serve hot with chutney and sambar"
    ]
  },
  {
    id: "3",
    name: "Sambar",
    nameEnglish: "Tangy Lentil Vegetable Stew",
    category: "lunch",
    dietType: "veg",
    spiceLevel: "medium",
    region: "general",
    image: sambarImg,
    cookTime: "40 mins",
    servings: 6,
    calories: 180,
    description: "Aromatic lentil stew with vegetables - soul food!",
    ingredients: ["Toor dal", "Drumsticks", "Tomatoes", "Sambar powder", "Tamarind", "Curry leaves"],
    steps: [
      "Cook toor dal until soft",
      "Boil vegetables separately",
      "Make sambar with tamarind extract and spices",
      "Add dal and vegetables, simmer"
    ]
  },
  {
    id: "4",
    name: "Pongal",
    nameEnglish: "Savory Rice & Lentil Porridge",
    category: "breakfast",
    dietType: "veg",
    spiceLevel: "mild",
    region: "general",
    image: pongalImg,
    cookTime: "35 mins",
    servings: 4,
    calories: 280,
    description: "Comforting rice-lentil dish with ghee, pepper, and cashews!",
    ingredients: ["Rice", "Moong dal", "Black pepper", "Cumin", "Cashews", "Ghee", "Curry leaves"],
    steps: [
      "Pressure cook rice and moong dal together",
      "Temper with ghee, pepper, cumin, and cashews",
      "Mix well and serve hot"
    ]
  },
  {
    id: "5",
    name: "Chettinad Chicken",
    nameEnglish: "Spicy Chettinad Style Chicken Curry",
    category: "lunch",
    dietType: "non-veg",
    spiceLevel: "spicy",
    region: "chettinad",
    image: chettinadChickenImg,
    cookTime: "50 mins",
    servings: 4,
    calories: 380,
    description: "Fiery Chettinad masala with tender chicken - full of flavor!",
    ingredients: ["Chicken", "Chettinad masala", "Onions", "Tomatoes", "Curry leaves", "Fennel seeds"],
    steps: [
      "Marinate chicken with spices",
      "Sauté onions and tomatoes",
      "Add Chettinad masala paste",
      "Cook chicken until tender"
    ]
  },
  {
    id: "6",
    name: "Medu Vada",
    nameEnglish: "Savory Lentil Donuts",
    category: "snacks",
    dietType: "veg",
    spiceLevel: "medium",
    region: "general",
    image: vadaImg,
    cookTime: "30 mins",
    servings: 6,
    calories: 200,
    description: "Crispy on outside, soft inside - perfect evening snack!",
    ingredients: ["Urad dal", "Green chillies", "Ginger", "Curry leaves", "Asafoetida", "Oil for frying"],
    steps: [
      "Soak and grind urad dal coarsely",
      "Add spices and mix well",
      "Shape into donuts",
      "Deep fry until golden brown"
    ]
  },
  {
    id: "7",
    name: "Payasam",
    nameEnglish: "Sweet Milk Pudding",
    category: "sweets",
    dietType: "veg",
    spiceLevel: "mild",
    region: "general",
    image: payasamImg,
    cookTime: "45 mins",
    servings: 6,
    calories: 320,
    description: "Creamy, sweet milk pudding with nuts - festival favorite!",
    ingredients: ["Vermicelli", "Milk", "Sugar", "Cardamom", "Cashews", "Raisins", "Ghee"],
    steps: [
      "Roast vermicelli in ghee",
      "Boil milk and add vermicelli",
      "Add sugar and cardamom",
      "Garnish with fried nuts and raisins"
    ]
  },
  {
    id: "8",
    name: "Rasam",
    nameEnglish: "Tangy Tamarind Soup",
    category: "lunch",
    dietType: "veg",
    spiceLevel: "medium",
    region: "general",
    image: rasamImg,
    cookTime: "25 mins",
    servings: 4,
    calories: 90,
    description: "Tangy, peppery soup - perfect comfort food!",
    ingredients: ["Tamarind", "Tomatoes", "Rasam powder", "Black pepper", "Cumin", "Curry leaves"],
    steps: [
      "Extract tamarind juice",
      "Boil with tomatoes and spices",
      "Add rasam powder",
      "Temper with mustard, cumin, and curry leaves"
    ]
  }
];

export const regions = [
  { id: "all", name: "All Tamil Nadu" },
  { id: "chettinad", name: "Chettinad - Spice Heaven" },
  { id: "madurai", name: "Madurai - Temple City" },
  { id: "kongu", name: "Kongu - Western Flavors" },
  { id: "tanjore", name: "Tanjore - Royal Cuisine" },
  { id: "general", name: "Traditional Tamil" }
];
