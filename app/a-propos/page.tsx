import {
  AboutHero,
  CompanyIdentity,
  AboutValues,
  AboutManifesto,
  AboutNumbers,
  AboutCTA
} from "@/components/about";

export const metadata = {
  title: 'À propos | NOBASUD - Excellence en Construction et Aménagement',
  description: 'Acteur engagé du secteur BTP au Maroc, NOBASUD porte une vision ambitieuse : bâtir des infrastructures pérennes qui améliorent la vie des citoyens et accompagnent le développement des territoires.'
}

export default function About() {
  return (
    <div className="font-montserrat">
      <AboutHero />
      <CompanyIdentity />
      <AboutValues />
      <AboutManifesto />
      <AboutNumbers />
      <AboutCTA />
    </div>
  );
}
