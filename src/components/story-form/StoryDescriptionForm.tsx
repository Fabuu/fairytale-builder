import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles } from "lucide-react";

interface StoryDescriptionFormProps {
  description: string;
  onDescriptionChange: (description: string) => void;
}

export const StoryDescriptionForm = ({ description, onDescriptionChange }: StoryDescriptionFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateIdea = async () => {
    setIsGenerating(true);
    // Simulate AI idea generation
    setTimeout(() => {
      const ideas = [
        "Ein mutiges Kind rettet seinen besten Freund aus einer magischen Welt voller Rätsel.",
        "Zwei Geschwister entdecken einen geheimen Garten, in dem Freundschaft über alles siegt.",
        "Ein schüchternes Mädchen findet ihren Mut, als sie einem verletzten Waldtier hilft.",
        "Ein Junge lernt, dass echte Stärke darin liegt, anderen zu helfen und zu verzeihen.",
        "Beste Freunde gehen auf ein Abenteuer und entdecken, wie wichtig Zusammenhalt ist."
      ];
      const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
      onDescriptionChange(randomIdea);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Worum soll es in der Geschichte gehen?</h3>
        <p className="text-muted-foreground">
          Beschreibe kurz die Haupthandlung oder lass dir eine Idee generieren
        </p>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <Label htmlFor="story-description" className="text-base font-medium">
              Geschichtsbeschreibung
            </Label>
            <Textarea
              id="story-description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Beschreibe in wenigen Sätzen, worum es in deiner Geschichte gehen soll..."
              rows={4}
              className="min-h-[120px] bg-muted/50 border-border/30 focus:border-primary/50 rounded-xl resize-none transition-all"
            />
          </div>

          <div className="text-center">
            <Button
              onClick={generateIdea}
              disabled={isGenerating}
              variant="outline"
              className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:from-primary/20 hover:to-accent/20 transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generiere Idee...
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Idee generieren
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};