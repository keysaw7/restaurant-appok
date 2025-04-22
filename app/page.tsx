'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dish } from './types/dish';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [userPreferences, setUserPreferences] = useState('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [recommendedDishes, setRecommendedDishes] = useState<Dish[]>([]);
  const [recommendedDrinks, setRecommendedDrinks] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);

  const handleGetRecommendation = async () => {
    if (!userPreferences) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          preferences: userPreferences,
          allergens: selectedAllergens,
          restrictions: selectedRestrictions
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des recommandations');
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
      setRecommendedDishes(data.dishes);
      setRecommendedDrinks(data.drinks);
    } catch {
      setRecommendedDishes([]);
      setRecommendedDrinks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAllergenChange = (allergen: string, checked: boolean) => {
    if (checked) {
      setSelectedAllergens(prev => [...prev, allergen]);
      setUserPreferences(prev => prev + ` allergique au ${allergen}`);
    } else {
      setSelectedAllergens(prev => prev.filter(a => a !== allergen));
      setUserPreferences(prev => prev.replace(` allergique au ${allergen}`, ''));
    }
  };

  const handleRestrictionChange = (restriction: string, checked: boolean) => {
    if (checked) {
      setSelectedRestrictions(prev => [...prev, restriction]);
      setUserPreferences(prev => prev + ` ${restriction}`);
    } else {
      setSelectedRestrictions(prev => prev.filter(r => r !== restriction));
      setUserPreferences(prev => prev.replace(` ${restriction}`, ''));
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Image de fond avec overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/bastia-sunset-propre.webp')",
          backgroundPosition: "center center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#2F4F4F]/30 to-[#2F4F4F]/80"></div>
      </div>

      {/* Contenu */}
      <div className="relative h-screen flex flex-col justify-center items-center px-4">
        <h1 className="text-7xl font-playfair text-white mb-8 text-center drop-shadow-lg italic">
          Chez Minnà
        </h1>
        <p className="text-2xl text-gray-100 max-w-2xl text-center mb-12 leading-relaxed drop-shadow">
          Une cuisine corse authentique et raffinée,
          <br />entre tradition et modernité
        </p>
        <Link 
          href="/menu" 
          className="bg-[#2F4F4F] text-white px-8 py-4 rounded-lg text-xl font-medium 
            hover:bg-[#1a2f2f] transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Découvrir notre carte
        </Link>
      </div>

      {/* Bouton d'aide IA */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#2F4F4F] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2"
        >
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Aide pour mes choix de plats
          </span>
        </button>
      </div>

      {/* Modal d'aide IA */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-[90vw] max-w-6xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-playfair text-[#2F4F4F]">Assistant de choix de plats</h2>
              {recommendation && (
                <button
                  onClick={() => {
                    setUserPreferences('');
                    setRecommendation('');
                    setRecommendedDishes([]);
                    setRecommendedDrinks([]);
                  }}
                  className="text-yellow-500 hover:text-yellow-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              )}
            </div>

            {!recommendation ? (
              <>
                <p className="text-gray-600 mb-4">
                  Sélectionnez vos restrictions et décrivez vos préférences pour obtenir des recommandations personnalisées.
                </p>
                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                      <h3 className="text-sm font-semibold text-[#2F4F4F] mb-3">Allergènes et restrictions</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedAllergens.includes('lait')}
                              onChange={(e) => handleAllergenChange('lait', e.target.checked)}
                              className="rounded border-gray-300 text-[#2F4F4F] focus:ring-[#2F4F4F]"
                            />
                            <span className="text-sm text-gray-800">Lait <span className="text-gray-600">(présent dans les fromages, crèmes, beurre)</span></span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedAllergens.includes('gluten')}
                              onChange={(e) => handleAllergenChange('gluten', e.target.checked)}
                              className="rounded border-gray-300 text-[#2F4F4F] focus:ring-[#2F4F4F]"
                            />
                            <span className="text-sm text-gray-800">Gluten <span className="text-gray-600">(présent dans le pain, pâtes, farine)</span></span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedAllergens.includes('œuf')}
                              onChange={(e) => handleAllergenChange('œuf', e.target.checked)}
                              className="rounded border-gray-300 text-[#2F4F4F] focus:ring-[#2F4F4F]"
                            />
                            <span className="text-sm text-gray-800">Œufs <span className="text-gray-600">(présents dans les pâtisseries, sauces)</span></span>
                          </label>
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedRestrictions.includes('végétarien')}
                              onChange={(e) => handleRestrictionChange('végétarien', e.target.checked)}
                              className="rounded border-gray-300 text-[#2F4F4F] focus:ring-[#2F4F4F]"
                            />
                            <span className="text-sm text-gray-800">Végétarien <span className="text-gray-600">(pas de viande ni de poisson)</span></span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedRestrictions.includes('sans alcool')}
                              onChange={(e) => handleRestrictionChange('sans alcool', e.target.checked)}
                              className="rounded border-gray-300 text-[#2F4F4F] focus:ring-[#2F4F4F]"
                            />
                            <span className="text-sm text-gray-800">Sans alcool <span className="text-gray-600">(pas de vin, bière, spiritueux)</span></span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedRestrictions.includes('sans porc')}
                              onChange={(e) => handleRestrictionChange('sans porc', e.target.checked)}
                              className="rounded border-gray-300 text-[#2F4F4F] focus:ring-[#2F4F4F]"
                            />
                            <span className="text-sm text-gray-800">Sans porc <span className="text-gray-600">(pas de charcuterie, jambon, saucisson)</span></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <textarea
                      value={userPreferences}
                      onChange={(e) => setUserPreferences(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] text-gray-800"
                      rows={3}
                      placeholder="Décrivez vos préférences (ex: j'aime les plats épicés, je préfère les entrées légères...)"
                    />
                    <button
                      onClick={handleGetRecommendation}
                      disabled={isLoading || !userPreferences.trim()}
                      className="bg-[#2F4F4F] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Génération en cours...' : 'Obtenir des recommandations'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-lg max-h-[70vh] overflow-y-auto">
                <h3 className="text-lg font-semibold text-[#2F4F4F] mb-3">Nos recommandations</h3>
                <p className="text-sm text-gray-700 mb-4">{recommendation}</p>
                
                {recommendedDishes.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#2F4F4F] mb-2">Plats recommandés</h4>
                    {recommendedDishes.map((dish) => (
                      <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                        <div className="relative w-32 flex-shrink-0">
                          <Image
                            src={dish.imageUrl || '/images/placeholder-dish.jpg'}
                            alt={dish.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-base font-semibold text-[#2F4F4F]">{dish.name}</h4>
                              <p className="text-xs text-gray-600">{dish.category}</p>
                            </div>
                            <p className="text-sm text-[#2F4F4F] font-semibold">{dish.price}€</p>
                          </div>
                          <p className="text-sm text-gray-700 my-2 line-clamp-2">{dish.description}</p>
                          <div className="flex flex-wrap gap-1 mb-1">
                            {dish.ingredients.map((ingredient: string) => (
                              <span key={ingredient} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {ingredient}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 text-xs">
                            {dish.allergens.length > 0 && (
                              <p className="text-red-600">
                                Allergènes : {dish.allergens.join(', ')}
                              </p>
                            )}
                            {dish.dietaryRestrictions.length > 0 && (
                              <p className="text-green-600">
                                Restrictions : {dish.dietaryRestrictions.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {recommendedDrinks.length > 0 && (
                  <div className="space-y-4 mt-6">
                    <h4 className="text-lg font-semibold text-[#2F4F4F] mb-2">Boissons recommandées</h4>
                    {recommendedDrinks.map((drink) => (
                      <div key={drink.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                        <div className="relative w-32 flex-shrink-0">
                          <Image
                            src={drink.imageUrl || '/images/placeholder-dish.jpg'}
                            alt={drink.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-base font-semibold text-[#2F4F4F]">{drink.name}</h4>
                              <p className="text-xs text-gray-600">{drink.category}</p>
                            </div>
                            <p className="text-sm text-[#2F4F4F] font-semibold">{drink.price}€</p>
                          </div>
                          <p className="text-sm text-gray-700 my-2 line-clamp-2">{drink.description}</p>
                          <div className="flex flex-wrap gap-1 mb-1">
                            {drink.ingredients.map((ingredient: string) => (
                              <span key={ingredient} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {ingredient}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 text-xs">
                            {drink.allergens.length > 0 && (
                              <p className="text-red-600">
                                Allergènes : {drink.allergens.join(', ')}
                              </p>
                            )}
                            {drink.dietaryRestrictions.length > 0 && (
                              <p className="text-green-600">
                                Restrictions : {drink.dietaryRestrictions.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => {
                setShowModal(false);
                setUserPreferences('');
                setRecommendation('');
                setRecommendedDishes([]);
                setRecommendedDrinks([]);
              }}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
