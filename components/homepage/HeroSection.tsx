import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Building, ChevronDown, Users } from 'lucide-react'
import { COMPANY_INFO } from '@/data/footer'

const HeroSection = () => {
  return (
     <section 
           className="relative h-screen flex items-center justify-center text-white overflow-hidden"
           style={{
             backgroundImage: "url('https://images.unsplash.com/photo-1541976590-713941681591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
             backgroundSize: "cover",
             backgroundPosition: "center"
           }}
         >
           <div className="absolute inset-0 hero-bg"></div>
           
           <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
             <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight" data-testid="hero-title">
               {COMPANY_INFO.slogan}
             </h1>
             <p className="text-xl lg:text-2xl mb-8 font-medium max-w-3xl mx-auto leading-relaxed">
               Acteur engagé du secteur BTP au Maroc, NOBASUD porte une vision ambitieuse : bâtir des infrastructures pérennes qui améliorent la vie des citoyens.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <Button asChild size="lg" className="bg-white text-primary hover:bg-muted font-bold text-lg shadow-lg">
                 <Link href="/a-propos" data-testid="button-discover-company">
                   <Building className="mr-2 h-5 w-5" />
                   Découvrir NOBASUD
                 </Link>
               </Button>
               <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg shadow-lg">
                 <Link href="/carriere" data-testid="button-apply-job">
                   <Users className="mr-2 h-5 w-5" />
                   Postuler
                 </Link>
               </Button>
             </div>
           </div>
           
           {/* Scroll indicator */}
           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
             <ChevronDown className="h-8 w-8" />
           </div>
         </section>
  )
}

export default HeroSection