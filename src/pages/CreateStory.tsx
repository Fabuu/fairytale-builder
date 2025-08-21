import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StoryAgeSelector } from "@/components/story-form/StoryAgeSelector";
import { StoryMessageSelector } from "@/components/story-form/StoryMessageSelector";
import { StoryDescriptionForm } from "@/components/story-form/StoryDescriptionForm";
import { StoryWorldSelector } from "@/components/story-form/StoryWorldSelector";
import { StoryStyleSelector } from "@/components/story-form/StoryStyleSelector";
import { StoryFontSelector } from "@/components/story-form/StoryFontSelector";
import { EnhancedCharacterForm } from "@/components/story-form/EnhancedCharacterForm";
import { StorySummary } from "@/components/story-form/StorySummary";
import { useToast } from "@/hooks/use-toast";

interface StoryData {
  age: string;
  theme: string;
  description: string;
  world: string;
  customWorld: string;
  style: string;
  font: string;
  characters: any[];
  email: string;
}

const CreateStory = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [storyData, setStoryData] = useState<StoryData>({
    age: "",
    theme: "",
    description: "",
    world: "",
    customWorld: "",
    style: "",
    font: "",
    characters: [{ id: "1", name: "", type: "Mensch", age: "", gender: "neutral" }],
    email: "",
  });


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

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    const steps = [
      "Erstelle Charaktere...",
      "Entwickle die Handlung...", 
      "Schreibe Kapitel...",
      "Gestalte Illustrationen...",
      "Füge alles zusammen...",
      "Finalisiere dein Buch..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    toast({
      title: "Kinderbuch erfolgreich erstellt!",
      description: storyData.email 
        ? "Dein personalisiertes Kinderbuch wurde erstellt und an deine E-Mail gesendet."
        : "Dein personalisiertes Kinderbuch wurde erfolgreich erstellt!",
    });

    setIsGenerating(false);
    console.log("Story data:", storyData);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return storyData.age && storyData.theme;
      case 2:
        return storyData.description.trim().length > 0 && (storyData.world || storyData.customWorld);
      case 3:
        return storyData.style && storyData.font;
      case 4:
        return storyData.characters[0]?.name?.trim().length > 0;
      case 5:
        return storyData.characters[0]?.name?.trim().length > 0;
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
                Schritt {currentStep} von 5
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
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4, 5].map((step, index) => (
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
                    {index < 4 && (
                      <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-500 ${
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
                  {currentStep === 1 && "Thema & Alter"}
                  {currentStep === 2 && "Geschichte & Welt"}
                  {currentStep === 3 && "Stil & Schrift"}
                  {currentStep === 4 && "Charaktere"}
                  {currentStep === 5 && "Übersicht & Erstellen"}
                </h2>
                <p className="text-muted-foreground">
                  {currentStep === 1 && "Wähle das zentrale Thema und die Altersgruppe für deine Geschichte"}
                  {currentStep === 2 && "Beschreibe deine Geschichte und wähle den Schauplatz"}
                  {currentStep === 3 && "Bestimme den visuellen Stil und die Schriftart"}
                  {currentStep === 4 && "Erstelle einzigartige Charaktere für dein Abenteuer"}
                  {currentStep === 5 && "Prüfe alles und erstelle dein magisches Kinderbuch"}
                </p>
              </div>
              
              <div className="space-y-12">
                {/* Step 1: Theme and Age */}
                {currentStep === 1 && (
                  <div className="space-y-16">
                    <StoryMessageSelector
                      selectedMessage={storyData.theme}
                      onMessageSelect={(theme) => setStoryData({ ...storyData, theme })}
                    />
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                    <StoryAgeSelector
                      selectedAge={storyData.age}
                      onAgeSelect={(age) => setStoryData({ ...storyData, age })}
                    />
                  </div>
                )}

                {/* Step 2: Description and World */}
                {currentStep === 2 && (
                  <div className="space-y-16">
                    <StoryDescriptionForm
                      description={storyData.description}
                      onDescriptionChange={(description) => setStoryData({ ...storyData, description })}
                    />
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                    <StoryWorldSelector
                      selectedWorld={storyData.world}
                      customWorld={storyData.customWorld}
                      onWorldSelect={(world) => setStoryData({ ...storyData, world })}
                      onCustomWorldChange={(customWorld) => setStoryData({ ...storyData, customWorld })}
                    />
                  </div>
                )}

                {/* Step 3: Style and Font */}
                {currentStep === 3 && (
                  <div className="space-y-16">
                    <StoryStyleSelector
                      selectedStyle={storyData.style}
                      onStyleSelect={(style) => setStoryData({ ...storyData, style })}
                    />
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                    <StoryFontSelector
                      selectedFont={storyData.font}
                      onFontSelect={(font) => setStoryData({ ...storyData, font })}
                    />
                  </div>
                )}

                {/* Step 4: Characters */}
                {currentStep === 4 && (
                  <EnhancedCharacterForm
                    characters={storyData.characters}
                    onCharactersChange={(characters) => setStoryData({ ...storyData, characters })}
                  />
                )}

                {/* Step 5: Summary and Generate */}
                {currentStep === 5 && (
                  <StorySummary
                    storyData={storyData}
                    onEmailChange={(email) => setStoryData({ ...storyData, email })}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    generationStep={generationStep}
                  />
                )}

              </div>

              {/* Navigation Buttons */}
              {currentStep < 5 && (
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
                  
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="h-14 px-8 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium transition-all duration-300 pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Nächster Schritt
                    <span className="ml-2">→</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateStory;