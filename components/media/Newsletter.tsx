import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Newsletter() {
  return (
    <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Restez <span className="text-brand-orange">informé</span>
          </h2>
          <p className="text-xl leading-relaxed mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos derniers articles 
            et actualités directement dans votre boîte email.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex space-x-4">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 text-gray-900 dark:text-gray-100"
              />
              <Button className="bg-white dark:bg-gray-800 text-brand-blue hover:bg-white dark:bg-gray-800/90 px-6">
                S&apos;abonner
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-3">
              Pas de spam, désabonnement facile à tout moment.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
