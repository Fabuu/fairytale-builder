import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StoryStyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

const styleOptions = [
  { id: "watercolor", label: "Aquarell" },
  { id: "3d-animation", label: "3D-Animation" },
  { id: "minecraft", label: "Blockwelt" },
  { id: "anime", label: "Sanfter Anime" },
  { id: "collage", label: "Collage" },
  { id: "paper-cutout", label: "Papierausschnitt" },
  { id: "claymation", label: "Knetanimation" },
  { id: "kawaii", label: "Kawaii" },
  { id: "geometric", label: "Geometrisch" },
  { id: "storybook", label: "Bilderbuch" },
];

export const StoryStyleSelector = ({ selectedStyle, onStyleSelect }: StoryStyleSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Wähle einen Illustrationsstil</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {styleOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedStyle === option.id
                ? "ring-2 ring-primary bg-secondary"
                : "hover:bg-accent"
            }`}
            onClick={() => onStyleSelect(option.id)}
          >
            <CardContent className="flex flex-col items-center p-4 space-y-3">
              <div className="w-full h-20 bg-muted rounded-md flex items-center justify-center">
                <span className="text-xs text-muted-foreground text-center">{option.label}</span>
              </div>
              <span className="text-sm font-medium text-center">{option.label}</span>
              <Button variant="outline" size="sm" className="text-xs">
                Beispiel ansehen
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};