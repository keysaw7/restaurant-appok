'use client';

import { useState } from 'react';
import { UserPreferences } from '../types/userPreferences';

type SpiceLevel = 'doux' | 'moyen' | 'épicé';
type AlcoholPreference = 'oui' | 'non' | 'occasionnellement';

export default function PreferencesForm() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryRestrictions: [],
    favoriteIngredients: [],
    dislikedIngredients: [],
    preferredCategories: [],
    priceRange: { min: 0, max: 100 },
    spiceLevel: 'moyen',
    alcoholPreference: 'occasionnellement',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l&apos;envoi des préférences à l&apos;API
    console.log('Préférences soumises:', preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Vos Préférences Culinaires</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Niveau d&apos;épices</label>
        <select
          value={preferences.spiceLevel}
          onChange={(e) => setPreferences({ ...preferences, spiceLevel: e.target.value as SpiceLevel })}
          className="w-full p-2 border rounded"
        >
          <option value="doux">Doux</option>
          <option value="moyen">Moyen</option>
          <option value="épicé">Épicé</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Préférence pour l&apos;alcool</label>
        <select
          value={preferences.alcoholPreference}
          onChange={(e) => setPreferences({ ...preferences, alcoholPreference: e.target.value as AlcoholPreference })}
          className="w-full p-2 border rounded"
        >
          <option value="oui">Oui</option>
          <option value="non">Non</option>
          <option value="occasionnellement">Occasionnellement</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fourchette de prix (€)</label>
        <div className="flex gap-4">
          <input
            type="number"
            value={preferences.priceRange.min}
            onChange={(e) => setPreferences({
              ...preferences,
              priceRange: { ...preferences.priceRange, min: Number(e.target.value) }
            })}
            className="w-1/2 p-2 border rounded"
            placeholder="Min"
          />
          <input
            type="number"
            value={preferences.priceRange.max}
            onChange={(e) => setPreferences({
              ...preferences,
              priceRange: { ...preferences.priceRange, max: Number(e.target.value) }
            })}
            className="w-1/2 p-2 border rounded"
            placeholder="Max"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Obtenir des recommandations
      </button>
    </form>
  );
} 