import { Card, CardContent } from "@/components/ui/card";
import themeEducational from "@/assets/theme-educational.png";
import themeFairytale from "@/assets/theme-fairytale.png";
import themeAdventure from "@/assets/theme-adventure.png";
import themeActivities from "@/assets/theme-activities.png";

interface StoryThemeSelectorProps {
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}

const themeOptions = [
  { id: "educational", label: "Lehrreich", image: themeEducational },
  { id: "fairytale", label: "Märchen", image: themeFairytale },
  { id: "adventure", label: "Abenteuer", image: themeAdventure },
  { id: "activities", label: "Aktivitäten", image: themeActivities },
];

export const StoryThemeSelector = ({ selectedTheme, onThemeSelect }: StoryThemeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Wähle ein Thema</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {themeOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTheme === option.id
                ? "ring-2 ring-primary bg-secondary"
                : "hover:bg-accent"
            }`}
            onClick={() => onThemeSelect(option.id)}
          >
            <CardContent className="flex flex-col items-center p-6 space-y-3">
              <img
                src={option.image}
                alt={option.label}
                className="w-16 h-16 object-contain"
              />
              <span className="text-sm font-medium text-center">{option.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};