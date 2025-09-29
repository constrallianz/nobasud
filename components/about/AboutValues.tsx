import { Building, Eye, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutValues() {
  const values = [
    {
      icon: Building,
      title: "Excellence technique",
      description: "Nous mettons notre expertise au service de projets d'envergure, en respectant les plus hauts standards de qualité et de sécurité."
    },
    {
      icon: Eye,
      title: "Vision territoriale",
      description: "Notre ancrage local nous permet de comprendre les enjeux spécifiques de chaque région et d'adapter nos solutions en conséquence."
    },
    {
      icon: Phone,
      title: "Proximité client",
      description: "Nous cultivons une relation de confiance avec nos clients, basée sur l'écoute, la transparence et la réactivité."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
            Nos engagements structurent notre quotidien
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}