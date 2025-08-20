import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Character {
  id: string;
  name: string;
  type: "person" | "animal";
  gender?: "boy" | "girl" | "neutral";
  age?: string;
  animalType?: string;
  relationship?: string;
  hobbies?: string;
  favoriteFood?: string;
}

interface StoryCharacterFormProps {
  characters: Character[];
  onCharactersChange: (characters: Character[]) => void;
}

export const StoryCharacterForm = ({ characters, onCharactersChange }: StoryCharacterFormProps) => {
  const [newCharacter, setNewCharacter] = useState<Character>({
    id: "",
    name: "",
    type: "person",
  });

  const addCharacter = () => {
    if (newCharacter.name.trim()) {
      const character = { ...newCharacter, id: Date.now().toString() };
      onCharactersChange([...characters, character]);
      setNewCharacter({ id: "", name: "", type: "person" });
    }
  };

  const updateCharacter = (id: string, updates: Partial<Character>) => {
    onCharactersChange(
      characters.map((char) => (char.id === id ? { ...char, ...updates } : char))
    );
  };

  const removeCharacter = (id: string) => {
    onCharactersChange(characters.filter((char) => char.id !== id));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Informationen zu den Figuren</h3>
      <p className="text-muted-foreground">
        Wer ist die Hauptfigur und welche anderen Personen oder Tiere spielen in diesem Buch eine Rolle?
      </p>

      {characters.map((character, index) => (
        <Card key={character.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {index === 0 ? "Hauptfigur" : `Figur ${index + 1}`}
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCharacter(character.id)}
                >
                  Entfernen
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs
              value={character.type}
              onValueChange={(value) => updateCharacter(character.id, { type: value as "person" | "animal" })}
            >
              <TabsList>
                <TabsTrigger value="person">Person</TabsTrigger>
                <TabsTrigger value="animal">Tier</TabsTrigger>
              </TabsList>

              <TabsContent value="person" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`name-${character.id}`}>Name</Label>
                    <Input
                      id={`name-${character.id}`}
                      value={character.name}
                      onChange={(e) => updateCharacter(character.id, { name: e.target.value })}
                      placeholder="Name der Figur"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`gender-${character.id}`}>Geschlecht</Label>
                    <Select
                      value={character.gender}
                      onValueChange={(value) => updateCharacter(character.id, { gender: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Geschlecht auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="girl">Mädchen</SelectItem>
                        <SelectItem value="boy">Junge</SelectItem>
                        <SelectItem value="neutral">Geschlechtsneutral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`age-${character.id}`}>Alter</Label>
                    <Input
                      id={`age-${character.id}`}
                      value={character.age || ""}
                      onChange={(e) => updateCharacter(character.id, { age: e.target.value })}
                      placeholder="z.B. 8 Jahre"
                    />
                  </div>
                  {index > 0 && (
                    <div>
                      <Label htmlFor={`relationship-${character.id}`}>Beziehung zur Hauptfigur</Label>
                      <Input
                        id={`relationship-${character.id}`}
                        value={character.relationship || ""}
                        onChange={(e) => updateCharacter(character.id, { relationship: e.target.value })}
                        placeholder="z.B. Freund, Schwester"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="animal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`animal-name-${character.id}`}>Name</Label>
                    <Input
                      id={`animal-name-${character.id}`}
                      value={character.name}
                      onChange={(e) => updateCharacter(character.id, { name: e.target.value })}
                      placeholder="Name des Tieres"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`animal-type-${character.id}`}>Tierart</Label>
                    <Input
                      id={`animal-type-${character.id}`}
                      value={character.animalType || ""}
                      onChange={(e) => updateCharacter(character.id, { animalType: e.target.value })}
                      placeholder="z.B. Hund, Katze, Pferd"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {index === 0 && (
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Zusätzliche Informationen (optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`hobbies-${character.id}`}>Hobbys / Interessen</Label>
                    <Textarea
                      id={`hobbies-${character.id}`}
                      value={character.hobbies || ""}
                      onChange={(e) => updateCharacter(character.id, { hobbies: e.target.value })}
                      placeholder="z.B. Fußball spielen, Malen"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`food-${character.id}`}>Lieblingsessen</Label>
                    <Textarea
                      id={`food-${character.id}`}
                      value={character.favoriteFood || ""}
                      onChange={(e) => updateCharacter(character.id, { favoriteFood: e.target.value })}
                      placeholder="z.B. Pizza, Schokolade"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Neue Figur hinzufügen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-character-name">Name</Label>
              <Input
                id="new-character-name"
                value={newCharacter.name}
                onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                placeholder="Name der neuen Figur"
              />
            </div>
            <div>
              <Label htmlFor="new-character-type">Typ</Label>
              <Select
                value={newCharacter.type}
                onValueChange={(value) => setNewCharacter({ ...newCharacter, type: value as "person" | "animal" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="person">Person</SelectItem>
                  <SelectItem value="animal">Tier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addCharacter} disabled={!newCharacter.name.trim()}>
            Figur hinzufügen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};