import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Magisches Kinderbuch</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Erstelle personalisierte Kinderbücher
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Erschaffe magische Geschichten mit deinem Kind als Hauptfigur. 
            Wähle Themen, Charaktere und Illustrationsstile für ein einzigartiges Buch.
          </p>
          
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            onClick={() => navigate("/erstellen")}
          >
            Kinderbuch erstellen
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">🎨 Personalisiert</CardTitle>
              <CardDescription>
                Dein Kind wird zur Hauptfigur der Geschichte mit persönlichen Details und Eigenschaften.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">📚 Verschiedene Themen</CardTitle>
              <CardDescription>
                Wähle aus Abenteuer, Märchen, Lerngeschichten und mehr für jedes Alter.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">🖼️ Wunderschöne Illustrationen</CardTitle>
              <CardDescription>
                Hochwertige Illustrationen in verschiedenen Stilen von Aquarell bis 3D-Animation.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-2xl">Bereit für dein erstes Kinderbuch?</CardTitle>
              <CardDescription className="text-lg">
                Erstelle in wenigen Minuten eine einzigartige Geschichte für dein Kind.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => navigate("/erstellen")}
              >
                Jetzt starten
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
