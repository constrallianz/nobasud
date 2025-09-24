import { ApprochValuesProps } from "@/types/approche";
import { 
  ClipboardDocumentListIcon,
  CogIcon, 
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

export default function ApprochValues({ values }: ApprochValuesProps) {
  const iconMap = {
  ClipboardDocumentListIcon,
  CogIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  UsersIcon,
};
  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="text-brand-orange">valeurs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les principes fondamentaux qui guident notre action et garantissent
            l&apos;excellence de nos réalisations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {values.map((value, i) => {
            const IconComponent = iconMap[value.icon];
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {value.description}
                </p>

                <div className="space-y-3">
                  {value.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-brand-orange rounded-full mr-3"></div>
                      <p className="text-sm text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
