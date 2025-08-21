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


  const handleNext = () => {
    if (currentStep < 4) {
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
        return storyData.characters[0]?.name;
      case 4:
        return storyData.userDetails.name && storyData.userDetails.email;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Magisches Kinderbuch
              </h1>
              <div className="text-sm text-muted-foreground">
                Schritt {currentStep} von 4
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                Erstelle dein magisches<br />Kinderbuch
              </h1>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                Erschaffe eine einzigartige Geschichte mit personalisierten Charakteren und wunderschönen Illustrationen.
                Dein Buch wird zu einem unvergesslichen Geschenk.
              </p>
            </div>

            {/* Modern Progress Indicator */}
            <div className="flex justify-center mb-16">
              <div className="flex items-center space-x-8">
                {[1, 2, 3, 4].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`relative flex items-center justify-center w-14 h-14 rounded-2xl text-sm font-bold transition-all duration-500 ${
                      step === currentStep
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-2xl pulse-glow scale-110"
                        : step < currentStep
                        ? "bg-gradient-to-br from-secondary to-muted text-foreground"
                        : "bg-muted/50 text-muted-foreground border border-border/30"
                    }`}>
                      {step < currentStep ? "✓" : step}
                      {step === currentStep && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-20 animate-pulse"></div>
                      )}
                    </div>
                    {index < 3 && (
                      <div className={`w-16 h-1 mx-4 rounded-full transition-all duration-500 ${
                        step < currentStep ? "bg-gradient-to-r from-primary to-accent" : "bg-border/30"
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Glass Card */}
            <div className="glass-card rounded-3xl p-8 md:p-12" style={{boxShadow: 'var(--shadow-card)'}}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  {currentStep === 1 && "Grundlagen deiner Geschichte"}
                  {currentStep === 2 && "Stil & Botschaft"}
                  {currentStep === 3 && "Charaktere erschaffen"}
                  {currentStep === 4 && "Persönliche Details"}
                </h2>
                <p className="text-muted-foreground">
                  {currentStep === 1 && "Wähle das Alter und das Thema für deine magische Geschichte"}
                  {currentStep === 2 && "Bestimme die zentrale Botschaft und den visuellen Stil"}
                  {currentStep === 3 && "Erstelle einzigartige Charaktere für dein Abenteuer"}
                  {currentStep === 4 && "Vervollständige dein Buch mit persönlichen Informationen"}
                </p>
              </div>
              
              <div className="space-y-12">
                {/* Step 1: Age and Theme */}
                {currentStep === 1 && (
                  <div className="space-y-16">
                    <StoryAgeSelector
                      selectedAge={storyData.age}
                      onAgeSelect={(age) => setStoryData({ ...storyData, age })}
                    />
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                    <StoryThemeSelector
                      selectedTheme={storyData.theme}
                      onThemeSelect={(theme) => setStoryData({ ...storyData, theme })}
                    />
                  </div>
                )}

                {/* Step 2: Message and Style */}
                {currentStep === 2 && (
                  <div className="space-y-16">
                    <StoryMessageSelector
                      selectedMessage={storyData.message}
                      onMessageSelect={(message) => setStoryData({ ...storyData, message })}
                    />
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                    <StoryStyleSelector
                      selectedStyle={storyData.style}
                      onStyleSelect={(style) => setStoryData({ ...storyData, style })}
                    />
                  </div>
                )}

                {/* Step 3: Characters */}
                {currentStep === 3 && (
                  <StoryCharacterForm
                    characters={storyData.characters}
                    onCharactersChange={(characters) => setStoryData({ ...storyData, characters })}
                  />
                )}

                {/* Step 4: Author and User Details */}
                {currentStep === 4 && (
                  <div className="space-y-12">
                    <div className="grid md:grid-cols-2 gap-12">
                      {/* Left Column - Author Details */}
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                              <span className="text-sm">✍️</span>
                            </div>
                            Persönliche Note
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            Verleihe deinem Buch eine einzigartige, persönliche Note durch deine eigenen Details.
                          </p>
                          <div className="space-y-6">
                            <div>
                              <Label htmlFor="author" className="text-base font-medium">Autor des Buchs</Label>
                              <Input
                                id="author"
                                value={storyData.author}
                                onChange={(e) => setStoryData({ ...storyData, author: e.target.value })}
                                placeholder="z.B. Mama und Papa"
                                className="mt-2 h-12 rounded-xl bg-muted/50 border-border/30 focus:border-primary/50 transition-all"
                              />
                            </div>
                            <div>
                              <Label htmlFor="preface" className="text-base font-medium">Vorwort im Buch</Label>
                              <Textarea
                                id="preface"
                                value={storyData.preface}
                                onChange={(e) => setStoryData({ ...storyData, preface: e.target.value })}
                                placeholder="Eine persönliche Widmung..."
                                rows={4}
                                className="mt-2 rounded-xl bg-muted/50 border-border/30 focus:border-primary/50 resize-none transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - User Details */}
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                              <span className="text-sm">👤</span>
                            </div>
                            Deine Daten
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            Diese Informationen benötigen wir, um dir dein fertiges Buch zuzusenden.
                          </p>
                          <div className="space-y-6">
                            <div>
                              <Label htmlFor="user-name" className="text-base font-medium">Name *</Label>
                              <Input
                                id="user-name"
                                value={storyData.userDetails.name}
                                onChange={(e) => setStoryData({
                                  ...storyData,
                                  userDetails: { ...storyData.userDetails, name: e.target.value }
                                })}
                                placeholder="Dein Name"
                                required
                                className="mt-2 h-12 rounded-xl bg-muted/50 border-border/30 focus:border-primary/50 transition-all"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email" className="text-base font-medium">E-Mail *</Label>
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
                                className="mt-2 h-12 rounded-xl bg-muted/50 border-border/30 focus:border-primary/50 transition-all"
                              />
                            </div>
                            <div>
                              <Label htmlFor="country" className="text-base font-medium">Land</Label>
                              <Select
                                value={storyData.userDetails.country}
                                onValueChange={(value) => setStoryData({
                                  ...storyData,
                                  userDetails: { ...storyData.userDetails, country: value }
                                })}
                              >
                                <SelectTrigger className="mt-2 h-12 rounded-xl bg-muted/50 border-border/30 focus:border-primary/50">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-12 mt-12 border-t border-border/20">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="h-14 px-8 rounded-xl bg-muted/50 border-border/30 hover:bg-muted hover:border-border transition-all duration-300"
                >
                  <span className="mr-2">←</span>
                  Zurück
                </Button>
                
                {currentStep < 4 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="h-14 px-8 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium transition-all duration-300 pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Nächster Schritt
                    <span className="ml-2">→</span>
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className="h-14 px-8 rounded-xl bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-medium transition-all duration-300 pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="mr-2">✨</span>
                    Kinderbuch erstellen
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateStory;