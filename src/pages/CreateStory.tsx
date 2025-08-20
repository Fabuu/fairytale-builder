import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StoryAgeSelector } from "@/components/story-form/StoryAgeSelector";
import { StoryThemeSelector } from "@/components/story-form/StoryThemeSelector";
import { StoryMessageSelector } from "@/components/story-form/StoryMessageSelector";
import { StoryStyleSelector } from "@/components/story-form/StoryStyleSelector";
import { StoryCharacterForm } from "@/components/story-form/StoryCharacterForm";
import { useToast } from "@/hooks/use-toast";

interface StoryData {
  age: string;
  theme: string;
  message: string;
  style: string;
  font: string;
  language: string;
  characters: any[];
  author: string;
  preface: string;
  userDetails: {
    name: string;
    email: string;
    country: string;
  };
}

const CreateStory = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [storyData, setStoryData] = useState<StoryData>({
    age: "",
    theme: "",
    message: "",
    style: "",
    font: "",
    language: "Deutsch",
    characters: [{ id: "main", name: "", type: "person" }],
    author: "",
    preface: "",
    userDetails: {
      name: "",
      email: "",
      country: "Deutschland",
    },
  });

  const fontOptions = [
    "Märchenbuch",
    "Weicher Sand", 
    "Blasenspaß",
    "Süße Träume",
    "Neon-Abenteuer",
    "Fröhliche Locken"
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!storyData.age || !storyData.theme || !storyData.characters[0]?.name) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle erforderlichen Felder aus.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Kinderbuch wird erstellt!",
      description: "Dein personalisiertes Kinderbuch wird jetzt generiert. Du erhältst eine E-Mail, sobald es fertig ist.",
    });

    console.log("Story data:", storyData);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return storyData.age && storyData.theme;
      case 2:
        return storyData.message && storyData.style;
      case 3:
        return storyData.font && storyData.language;
      case 4:
        return storyData.characters[0]?.name;
      case 5:
        return storyData.userDetails.name && storyData.userDetails.email;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Magisches Kinderbuch</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Erstelle ein personalisiertes Kinderbuch
            </h1>
            <p className="text-muted-foreground text-lg">
              Wähle ein Geschichtsthema, füge Name und persönliche Details hinzu und erstelle ein einzigartiges eBook.
              Anschließend kannst du die Geschichte auch als Hardcover-Buch bestellen – eine bleibende Erinnerung.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep
                      ? "bg-primary text-primary-foreground"
                      : step < currentStep
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">
                Stelle dein einzigartiges Kinderbuch zusammen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Step 1: Age and Theme */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <StoryAgeSelector
                    selectedAge={storyData.age}
                    onAgeSelect={(age) => setStoryData({ ...storyData, age })}
                  />
                  <StoryThemeSelector
                    selectedTheme={storyData.theme}
                    onThemeSelect={(theme) => setStoryData({ ...storyData, theme })}
                  />
                </div>
              )}

              {/* Step 2: Message and Style */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <StoryMessageSelector
                    selectedMessage={storyData.message}
                    onMessageSelect={(message) => setStoryData({ ...storyData, message })}
                  />
                  <StoryStyleSelector
                    selectedStyle={storyData.style}
                    onStyleSelect={(style) => setStoryData({ ...storyData, style })}
                  />
                </div>
              )}

              {/* Step 3: Font and Language */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Wähle eine Schriftart</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {fontOptions.map((font) => (
                        <Card
                          key={font}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                            storyData.font === font
                              ? "ring-2 ring-primary bg-secondary"
                              : "hover:bg-accent"
                          }`}
                          onClick={() => setStoryData({ ...storyData, font })}
                        >
                          <CardContent className="p-4 text-center">
                            <span className="font-medium">{font}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Informationen zum Buch</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="language">In welcher Sprache soll das Buch geschrieben werden?</Label>
                        <Select
                          value={storyData.language}
                          onValueChange={(value) => setStoryData({ ...storyData, language: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Deutsch">Deutsch</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Français">Français</SelectItem>
                            <SelectItem value="Español">Español</SelectItem>
                            <SelectItem value="Nederlands">Nederlands</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Characters */}
              {currentStep === 4 && (
                <StoryCharacterForm
                  characters={storyData.characters}
                  onCharactersChange={(characters) => setStoryData({ ...storyData, characters })}
                />
              )}

              {/* Step 5: Author and User Details */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Deine persönlichen Details</h3>
                    <p className="text-muted-foreground mb-4">
                      Verleihe dem Buch eine einzigartige, persönliche Note, indem du den Macher des Buchs angibst.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="author">Autor des Buchs</Label>
                        <Input
                          id="author"
                          value={storyData.author}
                          onChange={(e) => setStoryData({ ...storyData, author: e.target.value })}
                          placeholder="z.B. Mama und Papa"
                        />
                      </div>
                      <div>
                        <Label htmlFor="preface">Vorwort im Buch</Label>
                        <Textarea
                          id="preface"
                          value={storyData.preface}
                          onChange={(e) => setStoryData({ ...storyData, preface: e.target.value })}
                          placeholder="Eine persönliche Widmung..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Deine Zugangsdaten</h3>
                    <p className="text-muted-foreground mb-4">
                      Verwende diese Daten zum Einloggen und bleibe auf dem Laufenden, wann dein personalisiertes Buch fertig ist.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="user-name">Name *</Label>
                        <Input
                          id="user-name"
                          value={storyData.userDetails.name}
                          onChange={(e) => setStoryData({
                            ...storyData,
                            userDetails: { ...storyData.userDetails, name: e.target.value }
                          })}
                          placeholder="Dein Name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Land</Label>
                        <Select
                          value={storyData.userDetails.country}
                          onValueChange={(value) => setStoryData({
                            ...storyData,
                            userDetails: { ...storyData.userDetails, country: value }
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Deutschland">Deutschland</SelectItem>
                            <SelectItem value="Österreich">Österreich</SelectItem>
                            <SelectItem value="Schweiz">Schweiz</SelectItem>
                            <SelectItem value="Niederlande">Niederlande</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">E-Mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={storyData.userDetails.email}
                          onChange={(e) => setStoryData({
                            ...storyData,
                            userDetails: { ...storyData.userDetails, email: e.target.value }
                          })}
                          placeholder="deine@email.de"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Zurück
                </Button>
                
                {currentStep < 5 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Nächster Schritt
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Kinderbuch erstellen
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateStory;