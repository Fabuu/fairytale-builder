import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface StoryWorldSelectorProps {
  selectedWorld: string;
  customWorld: string;
  onWorldSelect: (world: string) => void;
  onCustomWorldChange: (world: string) => void;
}

const worldSuggestions = [
  { id: "forest", label: "Magischer Wald", emoji: "🌲" },
  { id: "castle", label: "Märchenschloss", emoji: "🏰" },
  { id: "ocean", label: "Unterwasserwelt", emoji: "🌊" },
  { id: "space", label: "Weltraum", emoji: "🚀" },
  { id: "city", label: "Große Stadt", emoji: "🏙️" },
  { id: "village", label: "Kleines Dorf", emoji: "🏘️" },
  { id: "mountain", label: "Bergwelt", emoji: "⛰️" },
  { id: "jungle", label: "Dschungel", emoji: "🌴" },
  { id: "desert", label: "Wüste", emoji: "🏜️" },
  { id: "clouds", label: "Wolkenreich", emoji: "☁️" },
  { id: "island", label: "Geheimnisvolle Insel", emoji: "🏝️" },
  { id: "school", label: "Schule", emoji: "🏫" },
];

export const StoryWorldSelector = ({ 
  selectedWorld, 
  customWorld, 
  onWorldSelect, 
  onCustomWorldChange 
}: StoryWorldSelectorProps) => {
  const handleWorldSelect = (worldId: string) => {
    onWorldSelect(worldId);
    if (worldId !== "custom") {
      onCustomWorldChange("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Wo soll die Geschichte spielen?</h3>
        <p className="text-muted-foreground">
          Wähle einen Schauplatz aus oder beschreibe deine eigene Welt
        </p>
      </div>

      <div className="space-y-6">
        {/* Vorgefertigte Welten */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {worldSuggestions.map((world) => (
            <Card
              key={world.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedWorld === world.id
                  ? "ring-2 ring-primary bg-secondary"
                  : "hover:bg-accent"
              }`}
              onClick={() => handleWorldSelect(world.id)}
            >
              <CardContent className="flex flex-col items-center p-4 space-y-2">
                <span className="text-2xl">{world.emoji}</span>
                <span className="text-sm font-medium text-center leading-tight">{world.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Eigene Welt */}
        <Card className="glass-card">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="custom-world"
                name="world-selection"
                checked={selectedWorld === "custom"}
                onChange={() => handleWorldSelect("custom")}
                className="w-4 h-4 text-primary"
              />
              <Label htmlFor="custom-world" className="text-base font-medium cursor-pointer">
                Eigene Welt beschreiben
              </Label>
            </div>
            
            {selectedWorld === "custom" && (
              <div className="space-y-2">
                <Input
                  value={customWorld}
                  onChange={(e) => onCustomWorldChange(e.target.value)}
                  placeholder="Beschreibe deine eigene Welt, z.B. 'Ein Baumhaus im Regenwald' oder 'Eine Zeitreise ins Mittelalter'"
                  className="h-12 bg-muted/50 border-border/30 focus:border-primary/50 rounded-xl transition-all"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};