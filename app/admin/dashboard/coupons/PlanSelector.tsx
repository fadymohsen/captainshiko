"use client";

import { useState } from "react";

interface PlanSelectorProps {
  plans: { id: string; nameEn: string }[];
  initialSelected: string[];
  initialAppliesToAll: boolean;
}

export function PlanSelector({ plans, initialSelected, initialAppliesToAll }: PlanSelectorProps) {
  const [appliesToAll, setAppliesToAll] = useState(initialAppliesToAll);
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>(initialSelected);

  const togglePlan = (id: string) => {
    if (selectedPlanIds.includes(id)) {
      setSelectedPlanIds(selectedPlanIds.filter(planId => planId !== id));
    } else {
      setSelectedPlanIds([...selectedPlanIds, id]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <input type="hidden" name="appliesToAll" value={appliesToAll.toString()} />
      <input type="hidden" name="planIds" value={JSON.stringify(selectedPlanIds)} />

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setAppliesToAll(true)}
          className={`px-6 py-3 rounded-xl text-sm font-bold border transition-all ${appliesToAll ? 'bg-accent border-accent text-white' : 'bg-background/50 border-white/10 text-muted'}`}
        >
          All Services
        </button>
        <button
          type="button"
          onClick={() => setAppliesToAll(false)}
          className={`px-6 py-3 rounded-xl text-sm font-bold border transition-all ${!appliesToAll ? 'bg-accent border-accent text-white' : 'bg-background/50 border-white/10 text-muted'}`}
        >
          Specific Services
        </button>
      </div>

      {!appliesToAll && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plans.map(plan => (
            <button
              key={plan.id}
              type="button"
              onClick={() => togglePlan(plan.id)}
              className={`flex items-center justify-between p-4 rounded-xl border text-sm font-medium transition-all ${selectedPlanIds.includes(plan.id) ? 'bg-accent/10 border-accent text-accent' : 'bg-background/50 border-white/10 text-muted hover:border-white/20'}`}
            >
              <span>{plan.nameEn}</span>
              {selectedPlanIds.includes(plan.id) && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
