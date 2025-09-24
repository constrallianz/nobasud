"use client";

import { useState } from "react";
import { ApprochMethodologyProps, IconName } from "@/types/approche";
import {
  ClipboardDocumentListIcon, CogIcon, WrenchScrewdriverIcon,
  CheckCircleIcon, ShieldCheckIcon, LightBulbIcon, UsersIcon
} from "@heroicons/react/24/outline";

const ICONS = {
  ClipboardDocumentListIcon,
  CogIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  UsersIcon,
} as const;

export default function ApprochMethodology({ methodology }: ApprochMethodologyProps) {
  const [activePhase, setActivePhase] = useState(0);

  // helper to resolve the icon from its string key
  const getIcon = (name: IconName) => ICONS[name as keyof typeof ICONS];

  return (
    <section id="methodologie" className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Notre <span className="text-brand-orange">méthodologie</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un processus structuré en 4 phases pour garantir la réussite de votre projet 
            du concept à la livraison.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Phase navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {methodology.map((phase, i) => (
              <button
                key={i}
                onClick={() => setActivePhase(i)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activePhase === i
                    ? "bg-brand-blue text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Phase {i + 1}: {phase.title}
              </button>
            ))}
          </div>

          {/* Active phase content */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mr-4">
                    {(() => {
                      const Icon = getIcon(methodology[activePhase].icon);
                      return Icon ? <Icon className="w-8 h-8 text-white" /> : null;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {methodology[activePhase].title}
                    </h3>
                    <p className="text-brand-orange font-medium">
                      Durée: {methodology[activePhase].duration}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {methodology[activePhase].description}
                </p>

                <div className="space-y-4">
                  {methodology[activePhase].steps.map((step, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircleIcon className="w-6 h-6 text-brand-blue mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-brand-blue/10 to-brand-orange/10 rounded-2xl flex items-center justify-center">
                  {(() => {
                    const Icon = getIcon(methodology[activePhase].icon);
                    return Icon ? <Icon className="w-32 h-32 text-brand-blue" /> : null;
                  })()}
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">
                  {activePhase + 1}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
