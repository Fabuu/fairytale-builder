import { Card, CardContent } from "@/components/ui/card";
import age0To2 from "@/assets/age-0-2.png";
import age3To5 from "@/assets/age-3-5.png";
import age6To9 from "@/assets/age-6-9.png";
import age10Plus from "@/assets/age-10-plus.png";

interface StoryAgeSelectorProps {
  selectedAge: string;
  onAgeSelect: (age: string) => void;
}

const ageOptions = [
  { id: "0-2", label: "0–2 Jahre", image: age0To2 },
  { id: "3-5", label: "3–5 Jahre", image: age3To5 },
  { id: "6-9", label: "6–9 Jahre", image: age6To9 },
  { id: "10+", label: "10+ Jahre", image: age10Plus },
];

export const StoryAgeSelector = ({ selectedAge, onAgeSelect }: StoryAgeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Wähle die Alterskategorie</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ageOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedAge === option.id
                ? "ring-2 ring-primary bg-secondary"
                : "hover:bg-accent"
            }`}
            onClick={() => onAgeSelect(option.id)}
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