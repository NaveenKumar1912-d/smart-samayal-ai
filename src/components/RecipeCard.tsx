import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

interface RecipeCardProps {
  title: string;
  image: string;
  time: string;
  servings: string;
  category: string;
  description: string;
}

const RecipeCard = ({ title, image, time, servings, category, description }: RecipeCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
            {category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{servings}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
