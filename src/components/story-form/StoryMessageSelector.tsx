import { Card, CardContent } from "@/components/ui/card";

interface StoryMessageSelectorProps {
  selectedMessage: string;
  onMessageSelect: (message: string) => void;
}

const messageOptions = [
  { id: "friendship", label: "Freundschaft", emoji: "🤝" },
  { id: "courage", label: "Mut", emoji: "🦁" },
  { id: "nature", label: "Sorge für die Natur", emoji: "🌿" },
  { id: "love", label: "Liebe", emoji: "❤️" },
  { id: "perseverance", label: "Durchhaltevermögen", emoji: "💪" },
  { id: "sharing", label: "Teilen", emoji: "🤲" },
  { id: "honesty", label: "Ehrlichkeit", emoji: "✨" },
  { id: "respect", label: "Respekt", emoji: "🙏" },
];

export const StoryMessageSelector = ({ selectedMessage, onMessageSelect }: StoryMessageSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Wähle eine zentrale Botschaft</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {messageOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedMessage === option.id
                ? "ring-2 ring-primary bg-secondary"
                : "hover:bg-accent"
            }`}
            onClick={() => onMessageSelect(option.id)}
          >
            <CardContent className="flex flex-col items-center p-6 space-y-3">
              <span className="text-3xl">{option.emoji}</span>
              <span className="text-sm font-medium text-center">{option.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};