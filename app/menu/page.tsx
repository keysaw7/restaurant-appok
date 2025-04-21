'use client';

import { useState, useEffect } from 'react';
import { Dish } from '../types/dish';
import Image from 'next/image';

export default function MenuPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('tous');
  const [loading, setLoading] = useState(true);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  useEffect(() => {
    const mockDishes: Dish[] = [
      // À Partager
      {
        id: 'share1',
        name: 'Assiette de Charcuterie',
        description: "Une sélection raffinée des meilleures charcuteries corses traditionnelles. Notre plateau met à l&apos;honneur le savoir-faire des producteurs locaux avec une délicate association de Coppa affinée, Lonzu aux herbes de maquis, Prisuttu séché en montagne et saucisson artisanal.",
        price: 18,
        category: 'entrée',
        ingredients: ['Coppa', 'Lonzu', 'Prisuttu', 'Saucisson'],
        allergens: [],
        dietaryRestrictions: [],
        recommendedPairings: ['Vin rouge Patrimonio', 'Vin rouge Figari'],
        imageUrl: '/images/dishes/entrees/assiette-charcuterie.webp'
      },
      {
        id: 'share2',
        name: 'Planche de Fromages corses affinés',
        description: "Un voyage gustatif à travers les meilleurs fromages de l'île. Affinés avec soin, nos fromages corses sont accompagnés d'une délicate confiture de figue maison qui sublime leurs saveurs uniques.",
        price: 14,
        category: 'entrée',
        ingredients: ['Fromages corses affinés', 'Confiture de figue'],
        allergens: ['lait'],
        dietaryRestrictions: [],
        recommendedPairings: ['Vin blanc Vermentinu', 'Muscat du Cap Corse'],
        imageUrl: '/images/dishes/entrees/planche-fromage.webp'
      },
      // Entrées
      {
        id: 'starter1',
        name: 'Beignets de la Minnà',
        description: "Nos beignets de courgettes, légers et croustillants, sont sublimés par une sauce yaourt maison parfumée au miel de Corse et à la menthe fraîche. Une entrée végétarienne qui marie délicatement les saveurs du jardin aux notes sucrées-salées.",
        price: 9,
        category: 'entrée',
        ingredients: ['Courgettes', 'Yaourt', 'Miel', 'Menthe'],
        allergens: ['lait'],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: ['Vin blanc Clos Venturi', 'Vin rosé de Provence'],
        imageUrl: '/images/dishes/entrees/beignets-courgettes.webp'
      },
      {
        id: 'starter2',
        name: 'Capuccino champignons & Figatellu',
        description: "Une création originale qui réinvente la tradition : un velouté onctueux de champignons, couronné d'une émulsion aérienne au figatellu et parsemé de champignons frits. Une touche de cacao en poudre vient parfaire cette entrée aux saveurs intenses.",
        price: 11,
        category: 'entrée',
        ingredients: ['Champignons', 'Figatellu', 'Cacao', 'Crème'],
        allergens: ['lait'],
        dietaryRestrictions: [],
        recommendedPairings: ['Vin rouge Niellucciu', 'Vin rouge Sciaccarellu'],
        imageUrl: '/images/dishes/entrees/cappuccino.webp'
      },
      {
        id: 'starter3',
        name: 'Bruschetta',
        description: "Sur une base de focaccia croustillante, nous disposons un délicat caviar de courgettes à la menthe, recouvert d'une fine chiffonnade de prisuttu et de copeaux de tomme corse. Un mariage parfait entre les saveurs méditerranéennes et montagnardes.",
        price: 10,
        category: 'entrée',
        ingredients: ['Focaccia', 'Courgettes', 'Menthe', 'Prisuttu', 'Tomme corse'],
        allergens: ['gluten', 'lait'],
        dietaryRestrictions: [],
        recommendedPairings: ['Vin blanc Vermentinu', 'Vin rosé Corse'],
        imageUrl: '/images/dishes/entrees/bruschetta.webp'
      },
      {
        id: 'starter4',
        name: 'Arancini',
        description: "Notre interprétation corse des arancini siciliens : des boulettes de risotto aux tomates séchées et à la tomme corse, panées et frites jusqu'à obtenir une croûte dorée. Servies avec une mayonnaise maison au pesto rosso qui apporte une touche de fraîcheur.",
        price: 9.5,
        category: 'entrée',
        ingredients: ['Tomates séchées', 'Tomme corse', 'Mayonnaise', 'Pesto rosso'],
        allergens: ['gluten', 'lait', 'œuf'],
        dietaryRestrictions: [],
        recommendedPairings: ['Vin blanc Calvi', 'Vin rosé Sartène'],
        imageUrl: '/images/dishes/entrees/arancini.webp'
      },
      {
        id: 'starter5',
        name: 'Raviole',
        description: "Une raviole généreuse garnie de brousse corse et de prisuttu, nappée d'une délicate crème à la tomme. La piperade de poivrons apporte couleur et fraîcheur à ce plat qui revisite la tradition insulaire.",
        price: 11,
        category: 'entrée',
        ingredients: ['Brousse', 'Prisuttu', 'Crème', 'Tome', 'Poivrons'],
        allergens: ['gluten', 'lait'],
        dietaryRestrictions: [],
        recommendedPairings: ['Vin blanc Patrimonio', 'Vin rouge léger Ajaccio'],
        imageUrl: '/images/dishes/entrees/raviole.webp'
      },
      {
        id: 'starter6',
        name: 'Burratina',
        description: "Une burratina crémeuse accompagnée de tomates cerises confites qui apportent une touche de douceur. Le tout est relevé par un crumble parfumé à la nepita, cette menthe sauvage corse qui apporte une fraîcheur unique au plat.",
        price: 13,
        category: 'entrée',
        ingredients: ['Burrata', 'Tomates cerises', 'Nepita'],
        allergens: ['lait', 'gluten'],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: ['Vin blanc Vermentinu', 'Vin rosé Figari'],
        imageUrl: '/images/dishes/entrees/burratina.webp'
      },
      // Plats
      {
        id: 'main1',
        name: 'Risotto au vermentinu',
        description: "Un risotto crémeux cuisiné au vermentinu, le célèbre vin blanc corse, enrichi de fromage frais et de tomates cerises. Couronné de tomme de brebis corse et d'un crumble à la marjolaine, le tout est accompagné d'un aïoli maison qui apporte une touche provençale.",
        price: 18,
        category: 'plat',
        ingredients: ['Riz', 'Vermentinu', 'Fromage frais', 'Tomates cerises', 'Tomme de brebis', 'Marjolaine', 'Aïoli'],
        allergens: ['lait', 'œuf'],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: ['Vin blanc Vermentinu', 'Vin blanc Patrimonio'],
        imageUrl: '/images/dishes/plats/risotto.webp'
      },
      {
        id: 'main2',
        name: 'Cannelloni',
        description: "Nos cannelloni faits maison sont garnis d'un mélange délicat de fromage frais corse et d'épinards, le tout nappé d'une sauce tomate parfumée aux herbes du maquis et généreusement gratinés à la tomme corse.",
        price: 18.5,
        category: 'plat',
        ingredients: ['Pâtes', 'Fromage frais corse', 'Épinards', 'Sauce tomate', 'Tomme corse'],
        allergens: ['gluten', 'lait'],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: ['Vin rouge Patrimonio', 'Vin rouge Ajaccio'],
        imageUrl: '/images/dishes/plats/cannelloni.webp'
      },
      {
        id: 'main3',
        name: 'Filet de bar rôti',
        description: "Un filet de bar de ligne rôti à la perfection, accompagné d'une mousse légère au fromage frais et d'une sauce vierge aux herbes fraîches. Servi sur un lit de polenta crémeuse qui apporte réconfort et gourmandise.",
        price: 19.5,
        category: 'plat',
        ingredients: ['Bar', 'Fromage frais', 'Sauce vierge', 'Polenta'],
        allergens: ['poisson', 'lait'],
        dietaryRestrictions: [],
        recommendedPairings: ['Vin blanc Vermentinu', 'Vin blanc Clos Culombu'],
        imageUrl: '/images/dishes/plats/filet-de-bar.webp'
      },
      {
        id: 'main4',
        name: 'Côte de cochon label rouge 500g',
        description: "Une côte de cochon label rouge généreuse, grillée à souhait, servie avec une mousseline de pomme de terre infusée à la panzetta. La crème parfumée à la charcuterie corse traditionnelle apporte une touche d'authenticité à ce plat réconfortant.",
        price: 27,
        category: 'plat',
        ingredients: ['Côte de cochon', 'Pomme de terre', 'Crème', 'Panzetta'],
        allergens: ['lait'],
        dietaryRestrictions: [],
        recommendedPairings: ['Vin rouge Patrimonio', 'Vin rouge Ajaccio'],
        imageUrl: '/images/dishes/plats/cochon.webp'
      },
      {
        id: 'main5',
        name: 'Cœur de rumsteck snacké',
        description: "Un cœur de rumsteck tendre et juteux, snacké à la demande, accompagné de pommes paysannes dorées au four et d'une salade de sucrine fraîche. Le tout est sublimé par une sauce béarnaise maison parfumée à la marjolaine et des copeaux de tomme corse.",
        price: 27,
        category: 'plat',
        ingredients: ['Rumsteck', 'Pommes de terre', 'Sucrine', 'Tomme corse', 'Béarnaise', 'Marjolaine'],
        allergens: ['lait', 'œuf'],
        dietaryRestrictions: [],
        recommendedPairings: ['Vin rouge Figari', 'Vin rouge Patrimonio'],
        imageUrl: '/images/dishes/plats/rumsteak.webp'
      },
      {
        id: 'main6',
        name: 'Noix de Veau',
        description: "Une noix de veau fondante marinée aux agrumes corses et aux olives, accompagnée d'une réduction onctueuse de tomates cerises confites. L'aubergine rôtie apporte une touche méditerranéenne à ce plat qui célèbre les saveurs de l'île.",
        price: 25,
        category: 'plat',
        ingredients: ['Veau', 'Agrumes', 'Olives', 'Tomates cerises', 'Aubergine'],
        allergens: [],
        dietaryRestrictions: [],
        recommendedPairings: ['Vin rouge Niellucciu', 'Vin rouge Sciaccarellu'],
        imageUrl: '/images/dishes/plats/noix-de-veau.webp'
      },
      // Desserts
      {
        id: 'dessert1',
        name: 'Mousse au chocolat & nuciola',
        description: "Une mousse au chocolat aérienne enrichie de nuciola, la pâte de noisette corse, parsemée d'éclats de fondant aux noisettes et de morceaux de canistrelli. Un dessert qui marie la richesse du chocolat aux saveurs des noisettes torréfiées.",
        price: 9,
        category: 'dessert',
        ingredients: ['Chocolat', 'Nuciola', 'Noisettes', 'Canistrelli'],
        allergens: ['lait', 'fruits à coque', 'gluten'],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: ['Muscat du Cap Corse', 'Café Corsu'],
        imageUrl: '/images/dishes/desserts/mousse-chocolat.webp'
      },
      {
        id: 'dessert2',
        name: 'Tiramisu à la pistache',
        description: "Notre version du tiramisu revisite le classique italien avec une crème à la pistache et des canistrelli émiettés en remplacement des biscuits traditionnels. Une création unique qui rend hommage aux saveurs méditerranéennes.",
        price: 10,
        category: 'dessert',
        ingredients: ['Mascarpone', 'Pistache', 'Canistrelli'],
        allergens: ['lait', 'œuf', 'fruits à coque', 'gluten'],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: ['Muscat du Cap Corse', 'Limoncello maison'],
        imageUrl: '/images/dishes/desserts/tiramisu-pistache.webp'
      },
      {
        id: 'dessert3',
        name: 'Fiadone',
        description: "Ce gâteau traditionnel corse au brocciu est revisité dans notre cuisine : une crème montée au fromage frais, accompagnée de noisettes caramélisées et d'éclats de nougatine. Un dessert qui allie tradition et modernité.",
        price: 9,
        category: 'dessert',
        ingredients: ['Fromage frais', 'Noisettes', 'Nougatine'],
        allergens: ['lait', 'œuf', 'fruits à coque'],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: ['Muscat du Cap Corse', 'Vin de paille'],
        imageUrl: '/images/dishes/desserts/fiadone.webp'
      },
      {
        id: 'dessert4',
        name: 'Moelleux chocolat',
        description: "Un moelleux au chocolat noir intense au cœur coulant de nuciola. La chaleur du gâteau libère le cœur fondant de noisettes corses, créant un moment de pure gourmandise.",
        price: 9,
        category: 'dessert',
        ingredients: ['Chocolat', 'Nuciola'],
        allergens: ['lait', 'œuf', 'gluten', 'fruits à coque'],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: ['Café Corsu', 'Muscat du Cap Corse'],
        imageUrl: '/images/dishes/desserts/moelleux-choco-caramel.webp'
      },
      {
        id: 'dessert5',
        name: 'Café gustosu',
        description: "Une expérience café gourmand qui met à l'honneur les douceurs corses : mini canistrelli, petit fiadone, truffe au chocolat et nuciola, et autres surprises du chef, accompagnés d'un café corsé de votre choix.",
        price: 9,
        category: 'dessert',
        ingredients: ['Café', 'Mignardises variées'],
        allergens: ['lait', 'œuf', 'gluten', 'fruits à coque'],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: ['Café Corsu', 'Grappa'],
        imageUrl: '/images/dishes/desserts/café-gustosu.webp'
      }
    ];
    setDishes(mockDishes);
    setLoading(false);
  }, []);

  const handleMoreInfo = (dish: Dish) => {
    setSelectedDish(dish);
  };

  const categories = ['tous', 'entrée', 'plat', 'dessert', 'boisson'];

  const filteredDishes = selectedCategory === 'tous' 
    ? dishes 
    : dishes.filter(dish => dish.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* En-tête décoratif */}
      <div className="relative h-[300px] bg-[#2F4F4F] overflow-hidden">
        {/* Contenu de l'en-tête */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative">
          <h1 className="text-6xl font-playfair text-center mb-6 text-white drop-shadow-lg italic">
            Notre Carte
          </h1>
          <p className="text-center text-gray-100 text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Découvrez notre sélection de plats traditionnels corses revisités,
            inspirés par la richesse gastronomique de l&apos;île de beauté
          </p>
        </div>
      </div>

      {/* Section des catégories avec image de fond fixe */}
      <div className="relative">
        <div 
          className="fixed inset-0 z-0"
          style={{ 
            backgroundImage: "url('/images/bonifacio-day.jpeg')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15
          }}
        ></div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Navigation des catégories */}
          <div className="flex justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 font-medium text-sm tracking-wide
                  ${selectedCategory === category
                    ? 'bg-[#2F4F4F] text-white shadow-lg transform scale-105'
                    : 'bg-white text-[#2F4F4F] border border-[#2F4F4F] hover:bg-gray-50 hover:shadow'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F4F4F]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleMoreInfo(dish)}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={dish.imageUrl || '/images/placeholder-dish.jpg'}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-playfair text-[#2F4F4F] mb-2">{dish.name}</h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{dish.description}</p>
                    <p className="text-[#2F4F4F] font-semibold">{dish.price}€</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal avec plus d'informations */}
          {selectedDish && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative h-64 w-full">
                  <Image
                    src={selectedDish.imageUrl || '/images/placeholder-dish.jpg'}
                    alt={selectedDish.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-playfair text-[#2F4F4F] mb-4">{selectedDish.name}</h2>
                  <p className="text-gray-700 mb-4">{selectedDish.description}</p>
                  <div className="mb-4">
                    <h3 className="font-playfair text-[#2F4F4F] mb-2">Ingrédients :</h3>
                    <p className="text-gray-600">{selectedDish.ingredients.join(', ')}</p>
                  </div>
                  {selectedDish.allergens.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-playfair text-[#2F4F4F] mb-2">Allergènes :</h3>
                      <p className="text-gray-600">{selectedDish.allergens.join(', ')}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="font-playfair text-[#2F4F4F] mb-2">Accords mets et vins :</h3>
                    <p className="text-gray-600">{(selectedDish.recommendedPairings || []).join(', ')}</p>
                  </div>
                  <p className="text-xl font-semibold text-[#2F4F4F]">{selectedDish.price}€</p>
                  <button
                    onClick={() => setSelectedDish(null)}
                    className="mt-4 bg-[#2F4F4F] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 