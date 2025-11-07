import { useState } from "react";
import Hero from "@/components/Hero";
import AIChatbot from "@/components/AIChatbot";
import PopularRecipes from "@/components/PopularRecipes";
import Features from "@/components/Features";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Hero onOpenChat={() => setIsChatOpen(true)} />
      <Features />
      <PopularRecipes />
      
      <footer className="py-8 border-t mt-16">
        <div className="container text-center text-muted-foreground">
          <p className="text-lg">Made with ❤️ in Tamil Nadu</p>
        </div>
      </footer>

      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
