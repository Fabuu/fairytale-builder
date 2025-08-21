import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Sparkles, BookOpen, Users, Palette, Type, Globe, MessageSquare } from "lucide-react";

interface StoryData {
  theme: string;
  age: string;
  description: string;
  world: string;
  customWorld: string;
  style: string;
  font: string;
  characters: any[];
  email: string;
}

interface StorySummaryProps {
  storyData: StoryData;
  onEmailChange: (email: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  generationStep: string;
}

const getThemeLabel = (theme: string) => {
  const themes: Record<string, string> = {
    friendship: "Freundschaft",
    courage: "Mut",
    nature: "Sorge für die Natur",
    love: "Liebe",
    perseverance: "Durchhaltevermögen",
    sharing: "Teilen",
    honesty: "Ehrlichkeit",
    respect: "Respekt",
  };
  return themes[theme] || theme;
};

const getAgeLabel = (age: string) => {
  const ages: Record<string, string> = {
    "0-2": "0–2 Jahre",
    "3-5": "3–5 Jahre", 
    "6-9": "6–9 Jahre",
    "10+": "10+ Jahre",
  };
  return ages[age] || age;
};

const getStyleLabel = (style: string) => {
  const styles: Record<string, string> = {
    watercolor: "Aquarell",
    "3d-animation": "3D-Animation",
    minecraft: "Blockwelt",
    anime: "Sanfter Anime",
    collage: "Collage",
    "paper-cutout": "Papierausschnitt",
    claymation: "Knetanimation",
    kawaii: "Kawaii",
    geometric: "Geometrisch",
    storybook: "Bilderbuch",
  };
  return styles[style] || style;
};

const getWorldLabel = (world: string) => {
  const worlds: Record<string, string> = {
    forest: "Magischer Wald",
    castle: "Märchenschloss",
    ocean: "Unterwasserwelt",
    space: "Weltraum",
    city: "Große Stadt",
    village: "Kleines Dorf",
    mountain: "Bergwelt",
    jungle: "Dschungel",
    desert: "Wüste",
    clouds: "Wolkenreich",
    island: "Geheimnisvolle Insel",
    school: "Schule",
  };
  return worlds[world] || world;
};

export const StorySummary = ({ 
  storyData, 
  onEmailChange, 
  onGenerate, 
  isGenerating, 
  generationStep 
}: StorySummaryProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold text-foreground">Deine Geschichte im Überblick</h3>
        <p className="text-muted-foreground">
          Prüfe alle Einstellungen und erstelle dein magisches Kinderbuch
        </p>
      </div>

      {!isGenerating ? (
        <div className="space-y-6">
          {/* Story Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Grundeinstellungen */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Grundeinstellungen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Thema:</span>
                  <Badge variant="secondary">{getThemeLabel(storyData.theme)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Alter:</span>
                  <Badge variant="secondary">{getAgeLabel(storyData.age)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Stil:</span>
                  <Badge variant="secondary">{getStyleLabel(storyData.style)}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Inhalt */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Inhalt & Welt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-muted-foreground">Handlung:</span>
                  <p className="text-sm mt-1 leading-relaxed">{storyData.description || "Keine Beschreibung"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Schauplatz:</span>
                  <Badge variant="secondary">
                    {storyData.world === "custom" 
                      ? storyData.customWorld || "Eigene Welt" 
                      : getWorldLabel(storyData.world)
                    }
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charaktere */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Charaktere ({storyData.characters.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {storyData.characters.map((character, index) => (
                  <div key={character.id} className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? "default" : "outline"}>
                        {index === 0 ? "Hauptcharakter" : `Charakter ${index + 1}`}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{character.name || "Unbenannt"}</p>
                      <p className="text-sm text-muted-foreground">
                        {character.type} • {character.age || "Kein Alter"} • {character.gender === "male" ? "Männlich" : character.gender === "female" ? "Weiblich" : "Neutral"}
                      </p>
                      {character.role && (
                        <p className="text-xs text-muted-foreground">Rolle: {character.role}</p>
                      )}
                      {character.appearance && (
                        <p className="text-xs text-muted-foreground">Aussehen: {character.appearance}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* E-Mail für Zustellung */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                E-Mail für Zustellung (optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-base font-medium">
                  E-Mail-Adresse
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={storyData.email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="deine@email.de"
                  className="mt-2 h-12 rounded-xl bg-muted/50 border-border/30 focus:border-primary/50"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Wenn du deine E-Mail-Adresse angibst, senden wir dir das fertige Buch zu.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Generieren Button */}
          <div className="text-center pt-6">
            <Button
              onClick={onGenerate}
              disabled={!storyData.characters[0]?.name || isGenerating}
              className="h-16 px-12 rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold text-lg transition-all duration-300 pulse-glow disabled:opacity-50"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Magisches Kinderbuch erstellen
            </Button>
          </div>
        </div>
      ) : (
        /* Generation Animation */
        <Card className="glass-card">
          <CardContent className="flex flex-col items-center justify-center p-12 space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <h4 className="text-xl font-semibold text-foreground">
                Dein Kinderbuch entsteht...
              </h4>
              <p className="text-lg text-muted-foreground animate-pulse">
                {generationStep}
              </p>
            </div>

            <div className="w-full max-w-md">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center max-w-lg">
              Die Erstellung kann einige Minuten dauern. Wir erstellen gerade deine einzigartige Geschichte 
              mit personalisierten Charakteren und wunderschönen Illustrationen.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};