import { Button } from "@/components/ui/button";

export default function AboutCTA() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-primary mb-8">
            Vous souhaitez collaborer avec NOBASUD ?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold">
              Nous contacter
            </Button>
            <Button variant="outline" size="lg" className="font-semibold">
              Découvrir nos réalisations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}