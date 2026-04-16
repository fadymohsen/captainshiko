"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface FeaturesEditorProps {
  initialFeatures: string[];
  name: string;
}

export function FeaturesEditor({ initialFeatures, name }: FeaturesEditorProps) {
  const [features, setFeatures] = useState<string[]>(initialFeatures);

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Hidden input to store JSON string for form submission */}
      <input type="hidden" name={name} value={JSON.stringify(features)} />
      
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
              placeholder="e.g. Weekly Zoom call"
              className="flex-1 bg-background/50 border border-white/10 p-3 rounded-xl focus:border-accent outline-none text-sm"
              required
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
              title="Remove benefit"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addFeature}
        className="flex items-center justify-center gap-2 p-3 border border-dashed border-white/20 rounded-xl text-xs font-bold uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-all group"
      >
        <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
        Add Benefit
      </button>
    </div>
  );
}
