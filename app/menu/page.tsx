'use client';

import { useState, useEffect } from 'react';
import { Dish } from '../types/dish';
import Image from 'next/image';
import MenuRecommendationModal from '../components/MenuRecommendationModal';
import Link from 'next/link';

export default function MenuPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('tous');
  const [loading, setLoading] = useState(true);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [showModal, setShowModal] = useState(false);

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
      },
      // Vins
      // ROUGE
      {
        id: 'wine-red-1',
        name: 'Clos Fornelli 2019',
        description: "Un vin rouge corse structuré et élégant, aux arômes de fruits noirs et d'épices. Produit dans le respect des traditions viticoles corses.",
        price: 26,
        category: 'vins',
        ingredients: ['Cépages corses traditionnels'],
        allergens: ['sulfites'],
        dietaryRestrictions: [],
        recommendedPairings: ['Viandes rouges', 'Gibier', 'Fromages affinés'],
        imageUrl: '/images/vins.webp'
      },
      {
        id: 'wine-red-2',
        name: 'Clos Venturi "Cuvée 1769" 2019',
        description: "Une cuvée d'exception au bouquet complexe de fruits rouges, d'épices et de notes boisées. Structure tannique élégante avec une belle longueur en bouche.",
        price: 33,
        category: 'vins',
        ingredients: ['Cépages corses sélectionnés'],
        allergens: ['sulfites'],
        dietaryRestrictions: [],
        recommendedPairings: ['Viandes rouges', 'Gibier', 'Plats en sauce'],
        imageUrl: '/images/vins.webp'
      },
      {
        id: 'wine-red-3',
        name: 'Nicolas Mariotti Bindi - Mursuglia 2019',
        description: "Un grand vin corse, finement travaillé par Nicolas Mariotti Bindi. Notes de fruits noirs, de garrigue et touche minérale. Bouche harmonieuse et finale persistante.",
        price: 45,
        category: 'vins',
        ingredients: ['Cépages corses traditionnels'],
        allergens: ['sulfites'],
        dietaryRestrictions: [],
        recommendedPairings: ['Viandes rouges', 'Gibier', 'Fromages affinés'],
        imageUrl: '/images/vins.webp'
      },
      {
        id: 'wine-red-4',
        name: 'Domaine San Michelli 2021',
        description: "Un vin rouge de caractère issu du terroir corse. Arômes de fruits rouges et noirs, avec des notes de maquis et d'épices. Belle structure tannique et finale persistante.",
        price: 36,
        category: 'vins',
        ingredients: ['Cépages corses sélectionnés'],
        allergens: ['sulfites'],
        dietaryRestrictions: [],
        recommendedPairings: ['Viandes rouges', 'Charcuteries corses', 'Fromages affinés'],
        imageUrl: '/images/vins.webp'
      },
      // BLANC
      {
        id: 'wine-white-1',
        name: 'Mino Sant Armettu 2021',
        description: "Un vin blanc corse d'une grande finesse, aux notes d'agrumes et de fleurs blanches. Bouche fraîche et minérale avec une belle tension.",
        price: 27,
        category: 'vins',
        ingredients: ['Cépages corses blancs'],
        allergens: ['sulfites'],
        dietaryRestrictions: [],
        recommendedPairings: ['Fruits de mer', 'Poissons grillés', 'Fromages frais'],
        imageUrl: '/images/vins.webp'
      },
      {
        id: 'wine-white-2',
        name: 'Domaine de Piana 2022',
        description: "Un vin blanc expressif aux arômes d'agrumes et de fruits exotiques. Belle fraîcheur en bouche avec une finale saline caractéristique du terroir corse.",
        price: 22,
        category: 'vins',
        ingredients: ['Vermentinu et autres cépages corses'],
        allergens: ['sulfites'],
        dietaryRestrictions: [],
        recommendedPairings: ['Fruits de mer', 'Poissons', 'Entrées légères'],
        imageUrl: '/images/vins.webp'
      },
      {
        id: 'wine-white-3',
        name: 'Clos Fornelli 2022',
        description: "Un vin blanc sec et minéral, avec des notes d'agrumes et de fleurs blanches. Belle fraîcheur et finale saline caractéristique du terroir corse.",
        price: 26,
        category: 'vins',
        ingredients: ['Cépages corses blancs traditionnels'],
        allergens: ['sulfites'],
        dietaryRestrictions: [],
        recommendedPairings: ['Fruits de mer', 'Poissons grillés', 'Fromages de chèvre'],
        imageUrl: '/images/vins.webp'
      },
      // ROSÉ
      {
        id: 'wine-rose-1',
        name: 'Domaine de Piana 2022',
        description: "Un rosé délicat aux arômes de fruits rouges et d'agrumes. Frais et équilibré, idéal pour accompagner vos repas d'été.",
        price: 22,
        category: 'vins',
        ingredients: ['Cépages corses rosés'],
        allergens: ['sulfites'],
        dietaryRestrictions: [],
        recommendedPairings: ['Grillades', 'Salades', 'Cuisine méditerranéenne'],
        imageUrl: '/images/vins.webp'
      },
      {
        id: 'wine-rose-2',
        name: 'Sant Armettu Mino 2022',
        description: "Un rosé d'exception à la robe pâle et brillante. Notes délicates de pêche, de fraise et d'agrumes. Structure élégante avec une belle tension.",
        price: 26,
        category: 'vins',
        ingredients: ['Cépages corses sélectionnés'],
        allergens: ['sulfites'],
        dietaryRestrictions: [],
        recommendedPairings: ['Poissons', 'Fruits de mer', 'Entrées méditerranéennes'],
        imageUrl: '/images/vins.webp'
      },
      {
        id: 'wine-rose-3',
        name: 'Domaine Saparale 2021',
        description: "Un rosé de caractère, aux arômes intenses de fruits rouges et d'épices douces. Structure ample et finale persistante sur des notes fruitées.",
        price: 32,
        category: 'vins',
        ingredients: ['Cépages corses traditionnels'],
        allergens: ['sulfites'],
        dietaryRestrictions: [],
        recommendedPairings: ['Charcuteries corses', 'Poissons grillés', 'Plats méditerranéens'],
        imageUrl: '/images/vins.webp'
      },
      // Boissons
      {
        id: 'drink1',
        name: 'Citronnade Bio Maison',
        description: "Une boisson rafraîchissante à base de citrons biologiques, légèrement sucrée et parfumée. Idéale pour accompagner votre repas ou vous désaltérer en journée.",
        price: 4.5,
        category: 'boisson',
        ingredients: ['Citron bio', 'Eau', 'Sucre de canne bio', 'Menthe fraîche'],
        allergens: [],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: [],
        imageUrl: '/images/boissons.webp'
      },
      {
        id: 'drink2',
        name: 'Thé glacé BIO Maison',
        description: "Un thé glacé maison infusé avec des feuilles de thé bio et subtilement aromatisé. Une boisson désaltérante avec juste ce qu'il faut de sucre.",
        price: 4.5,
        category: 'boisson',
        ingredients: ['Thé bio', 'Eau', 'Sucre de canne bio', 'Citron'],
        allergens: [],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: [],
        imageUrl: '/images/boissons.webp'
      },
      {
        id: 'drink3',
        name: 'Gingeer Bio UMA 33cl',
        description: "Une boisson pétillante au gingembre, 100% bio et naturelle. Notes épicées et rafraîchissantes avec une touche d'agrumes.",
        price: 5,
        category: 'boisson',
        ingredients: ['Eau', 'Gingembre bio', 'Sucre de canne bio', "Extraits naturels d'agrumes"],
        allergens: [],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: [],
        imageUrl: '/images/boissons.webp'
      },
      {
        id: 'drink4',
        name: 'Limonade Bio UMA 33cl',
        description: "Limonade artisanale bio aux ingrédients naturels. Délicieusement pétillante avec une saveur authentique de citron.",
        price: 5,
        category: 'boisson',
        ingredients: ['Eau', 'Sucre de canne bio', 'Jus de citron bio', 'Extrait naturel de citron'],
        allergens: [],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: [],
        imageUrl: '/images/boissons.webp'
      },
      {
        id: 'drink5',
        name: 'Eau minérale gazeuse Orezza 50cl',
        description: "Eau minérale gazeuse corse naturellement pétillante, provenant de la source Orezza située au cœur du parc naturel de Corse. Riche en fer et en magnésium.",
        price: 5,
        category: 'boisson',
        ingredients: ['Eau minérale naturelle gazeuse'],
        allergens: [],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: [],
        imageUrl: '/images/boissons.webp'
      },
      {
        id: 'drink6',
        name: 'Eau minérale plate St Georges 50cl',
        description: "Eau minérale plate corse, puisée à la source St Georges dans la vallée de Zilia. Légère et équilibrée, faiblement minéralisée.",
        price: 4.5,
        category: 'boisson',
        ingredients: ['Eau minérale naturelle plate'],
        allergens: [],
        dietaryRestrictions: ['végétarien'],
        recommendedPairings: [],
        imageUrl: '/images/boissons.webp'
      },
      {
        id: 'drink7',
        name: 'Pietra 33cl',
        description: "Bière ambrée traditionnelle corse à la châtaigne, offrant un équilibre parfait entre amertume et douceur. Notes de malt, de fruits secs et finale légèrement épicée.",
        price: 6,
        category: 'boisson',
        ingredients: ['Eau', 'Malt', 'Houblon', 'Farine de châtaigne', 'Levure'],
        allergens: ['gluten'],
        dietaryRestrictions: [],
        recommendedPairings: ['Charcuteries', 'Fromages corsés'],
        imageUrl: '/images/boissons.webp'
      },
      {
        id: 'drink8',
        name: "Paolina Blanche 33cl à l'immortelle",
        description: "Bière blanche artisanale corse infusée à l'immortelle, plante aromatique du maquis. Notes florales et herbacées, légèrement épicée avec une fine amertume en fin de bouche.",
        price: 6,
        category: 'boisson',
        ingredients: ['Eau', 'Malt', 'Blé', 'Houblon', 'Immortelle de Corse', 'Levure'],
        allergens: ['gluten', 'blé'],
        dietaryRestrictions: [],
        recommendedPairings: ['Poissons', 'Salades'],
        imageUrl: '/images/boissons.webp'
      },
      {
        id: 'drink9',
        name: 'Pietra IPA 33cl',
        description: "Version IPA (India Pale Ale) de la célèbre bière corse Pietra. Plus houblonnée et aromatique que sa version classique, avec des notes d'agrumes et une amertume plus prononcée.",
        price: 6.5,
        category: 'boisson',
        ingredients: ['Eau', 'Malt', 'Houblon', 'Farine de châtaigne', 'Levure'],
        allergens: ['gluten'],
        dietaryRestrictions: [],
        recommendedPairings: ['Viandes grillées', 'Fromages forts'],
        imageUrl: '/images/boissons.webp'
      }
    ];
    setDishes(mockDishes);
    setLoading(false);
  }, []);

  const handleMoreInfo = (dish: Dish) => {
    setSelectedDish(dish);
  };

  const categories = ['tous', 'entrées', 'plats', 'desserts', 'boissons', 'vins'];
  const wineSubcategories = ['ROUGE', 'BLANC', 'ROSÉ'];

  const filteredDishes = selectedCategory === 'tous' 
    ? dishes 
    : dishes.filter(dish => {
        // Mapping des catégories au pluriel vers le singulier
        const categoryMapping: Record<string, string> = {
          'entrées': 'entrée',
          'plats': 'plat',
          'desserts': 'dessert',
          'boissons': 'boisson',
          'vins': 'vins'
        };
        return dish.category === categoryMapping[selectedCategory];
      });

  // Fonction pour déterminer si un vin appartient à une sous-catégorie (rouge, blanc, rosé)
  const getWineSubcategory = (dish: Dish): string | null => {
    if (dish.category !== 'vins') return null;
    
    if (dish.id.includes('red')) return 'ROUGE';
    if (dish.id.includes('white')) return 'BLANC';
    if (dish.id.includes('rose')) return 'ROSÉ';
    
    return null;
  };

  // Regrouper les vins par sous-catégorie
  const getWinesBySubcategory = () => {
    const result: Record<string, Dish[]> = {
      'ROUGE': [],
      'BLANC': [],
      'ROSÉ': []
    };
    
    filteredDishes.forEach(dish => {
      const subcategory = getWineSubcategory(dish);
      if (subcategory) {
        result[subcategory].push(dish);
      }
    });
    
    return result;
  };

  const winesBySubcategory = getWinesBySubcategory();

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
          <div className="flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 bg-[#2F4F4F] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Aide pour choisir mes plats
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Section des catégories avec image de fond fixe */}
      <div className="relative">
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
              {selectedCategory === 'vins' ? (
                // Affichage des vins par sous-catégorie
                wineSubcategories.map(subcategory => (
                  winesBySubcategory[subcategory].length > 0 && (
                    <div key={subcategory} className="col-span-1 md:col-span-2 lg:col-span-3">
                      <h2 className="text-2xl font-bold text-[#2F4F4F] mt-8 mb-4 border-b border-[#2F4F4F] pb-2">{subcategory}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {winesBySubcategory[subcategory].map((dish) => (
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
                    </div>
                  )
                ))
              ) : (
                // Affichage normal des autres catégories
                filteredDishes.map((dish) => (
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
                ))
              )}
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

      <MenuRecommendationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
} 