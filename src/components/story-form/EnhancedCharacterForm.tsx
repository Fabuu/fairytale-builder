import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface EnhancedCharacter {
  id: string;
  name: string;
  type: string;
  age: string;
  gender: string;
  role?: string;
  appearance?: string;
}

interface EnhancedCharacterFormProps {
  characters: EnhancedCharacter[];
  onCharactersChange: (characters: EnhancedCharacter[]) => void;
}

const characterTypes = [
  "Mensch", "Hund", "Katze", "Pferd", "Bär", "Vogel", "Drache", 
  "Fee", "Zauberer", "Roboter", "Baum", "Stein", "Auto", "Haus"
];

const genderOptions = [
  { value: "male", label: "Männlich" },
  { value: "female", label: "Weiblich" },
  { value: "neutral", label: "Neutral" },
];

const roleOptions = [
  "Protagonist", "Bester Freund", "Mentor", "Helfer", "Begleiter", 
  "Herausforderer", "Weiser", "Komische Figur"
];

const appearanceSuggestions = [
  "Große blaue Augen", "Lockige Haare", "Sommersprossen", "Brille", 
  "Rote Mütze", "Gestreifte Socken", "Narbe am Kinn", "Goldene Ohrringe",
  "Flauschiges Fell", "Bunte Federn", "Funkelnde Schuppen", "Glitzernde Flügel"
];

export const EnhancedCharacterForm = ({ characters, onCharactersChange }: EnhancedCharacterFormProps) => {
  const addCharacter = () => {
    if (characters.length < 5) {
      const newCharacter: EnhancedCharacter = {
        id: Date.now().toString(),
        name: "",
        type: "Mensch",
        age: "",
        gender: "neutral",
      };
      onCharactersChange([...characters, newCharacter]);
    }
  };

  const updateCharacter = (id: string, updates: Partial<EnhancedCharacter>) => {
    onCharactersChange(
      characters.map((char) => (char.id === id ? { ...char, ...updates } : char))
    );
  };

  const removeCharacter = (id: string) => {
    onCharactersChange(characters.filter((char) => char.id !== id));
  };

  const addAppearanceDetail = (characterId: string, detail: string) => {
    const character = characters.find(c => c.id === characterId);
    if (character) {
      const currentAppearance = character.appearance || "";
      const newAppearance = currentAppearance 
        ? `${currentAppearance}, ${detail}` 
        : detail;
      updateCharacter(characterId, { appearance: newAppearance });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold text-foreground">Charaktere erschaffen</h3>
        <p className="text-muted-foreground">
          Erstelle bis zu 5 einzigartige Charaktere für deine Geschichte
        </p>
      </div>

      <div className="space-y-6">
        {characters.map((character, index) => (
          <Card key={character.id} className="glass-card">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  {index === 0 ? "Hauptcharakter" : `Charakter ${index + 1}`}
                </span>
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCharacter(character.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Grundlegende Informationen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`name-${character.id}`} className="text-base font-medium">Name *</Label>
                  <Input
                    id={`name-${character.id}`}
                    value={character.name}
                    onChange={(e) => updateCharacter(character.id, { name: e.target.value })}
                    placeholder="Name des Charakters"
                    className="mt-2 h-12 rounded-xl bg-muted/50 border-border/30 focus:border-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor={`type-${character.id}`} className="text-base font-medium">Art *</Label>
                  <Select
                    value={character.type}
                    onValueChange={(value) => updateCharacter(character.id, { type: value })}
                  >
                    <SelectTrigger className="mt-2 h-12 rounded-xl bg-muted/50 border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {characterTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`age-${character.id}`} className="text-base font-medium">Alter</Label>
                  <Input
                    id={`age-${character.id}`}
                    value={character.age}
                    onChange={(e) => updateCharacter(character.id, { age: e.target.value })}
                    placeholder="z.B. 8 Jahre, jung, alt"
                    className="mt-2 h-12 rounded-xl bg-muted/50 border-border/30 focus:border-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor={`gender-${character.id}`} className="text-base font-medium">Geschlecht</Label>
                  <Select
                    value={character.gender}
                    onValueChange={(value) => updateCharacter(character.id, { gender: value })}
                  >
                    <SelectTrigger className="mt-2 h-12 rounded-xl bg-muted/50 border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Rolle in der Geschichte (optional) */}
              {index > 0 && (
                <div>
                  <Label htmlFor={`role-${character.id}`} className="text-base font-medium">Rolle in der Geschichte (optional)</Label>
                  <Select
                    value={character.role || ""}
                    onValueChange={(value) => updateCharacter(character.id, { role: value })}
                  >
                    <SelectTrigger className="mt-2 h-12 rounded-xl bg-muted/50 border-border/30">
                      <SelectValue placeholder="Rolle auswählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Aussehen */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Aussehen (optional)</Label>
                <Textarea
                  value={character.appearance || ""}
                  onChange={(e) => updateCharacter(character.id, { appearance: e.target.value })}
                  placeholder="Beschreibe das Aussehen, besondere Kennzeichen, Kleidung, Accessoires..."
                  className="min-h-[80px] rounded-xl bg-muted/50 border-border/30 focus:border-primary/50 resize-none"
                  rows={3}
                />
                
                {/* Aussehen-Vorschläge */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Schnell hinzufügen:</p>
                  <div className="flex flex-wrap gap-2">
                    {appearanceSuggestions.map((suggestion) => (
                      <Badge
                        key={suggestion}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors"
                        onClick={() => addAppearanceDetail(character.id, suggestion)}
                      >
                        + {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Neuen Charakter hinzufügen */}
        {characters.length < 5 && (
          <Card className="glass-card border-dashed border-2 border-primary/20">
            <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-medium text-foreground">Weiteren Charakter hinzufügen</h4>
                <p className="text-sm text-muted-foreground">
                  Du kannst bis zu {5 - characters.length} weitere Charaktere erstellen
                </p>
              </div>
              <Button onClick={addCharacter} variant="outline" className="rounded-xl">
                Charakter hinzufügen
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};