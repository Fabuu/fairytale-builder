import { Card, CardContent } from "@/components/ui/card";

interface StoryFontSelectorProps {
  selectedFont: string;
  onFontSelect: (font: string) => void;
}

const fontOptions = [
  { id: "playful", label: "Verspielt", sample: "Abc 123", className: "font-bold text-lg" },
  { id: "classic", label: "Klassisch", sample: "Abc 123", className: "font-serif text-lg" },
  { id: "modern", label: "Modern", sample: "Abc 123", className: "font-sans text-lg tracking-wide" },
  { id: "handwritten", label: "Handschrift", sample: "Abc 123", className: "font-mono text-lg italic" },
  { id: "fairy", label: "Märchenhaft", sample: "Abc 123", className: "font-serif text-lg" },
  { id: "bold", label: "Mutig & Dick", sample: "Abc 123", className: "font-black text-lg" },
];

export const StoryFontSelector = ({ selectedFont, onFontSelect }: StoryFontSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Wähle eine Schriftart</h3>
        <p className="text-muted-foreground">
          Die Schriftart bestimmt den Charakter deines Buches
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {fontOptions.map((font) => (
          <Card
            key={font.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedFont === font.id
                ? "ring-2 ring-primary bg-secondary"
                : "hover:bg-accent"
            }`}
            onClick={() => onFontSelect(font.id)}
          >
            <CardContent className="flex flex-col items-center p-6 space-y-3">
              <div className={`${font.className} text-foreground`}>
                {font.sample}
              </div>
              <span className="text-sm font-medium text-center">{font.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};