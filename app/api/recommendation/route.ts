import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { menu } from '@/app/data/menu';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { preferences, allergens, restrictions } = await request.json();

    // Séparer les plats et les boissons
    const foodMenu = menu.filter(item => item.type === 'food');
    const drinksMenu = menu.filter(item => item.type === 'drink');

    // Filtrer les plats en fonction des allergènes et restrictions
    let filteredFoodMenu = [...foodMenu];
    let filteredDrinksMenu = [...drinksMenu];

    // Filtrage par allergènes
    if (allergens && allergens.length > 0) {
      filteredFoodMenu = filteredFoodMenu.filter(dish => 
        !allergens.some((allergen: string) => dish.allergens.includes(allergen))
      );
      filteredDrinksMenu = filteredDrinksMenu.filter(drink => 
        !allergens.some((allergen: string) => drink.allergens.includes(allergen))
      );
    }

    // Filtrage par restrictions alimentaires
    if (restrictions && restrictions.length > 0) {
      filteredFoodMenu = filteredFoodMenu.filter(dish => {
        if (restrictions.includes('végétarien')) {
          return dish.dietaryRestrictions.includes('végétarien');
        }
        if (restrictions.includes('sans porc')) {
          return !dish.ingredients.some(ingredient => 
            ['porc', 'jambon', 'saucisson', 'charcuterie'].includes(ingredient.toLowerCase())
          );
        }
        return true;
      });
    }

    // Si aucun plat ne correspond aux critères
    if (filteredFoodMenu.length === 0) {
      return NextResponse.json({ 
        recommendation: "Désolé, aucun plat ne correspond à vos critères. Veuillez ajuster vos préférences.",
        dishes: [],
        drinks: []
      });
    }

    // Préparer le contexte pour l'IA
    const menuContext = {
      food: filteredFoodMenu.map(dish => ({
        name: dish.name,
        category: dish.category,
        description: dish.description,
        ingredients: dish.ingredients,
        allergens: dish.allergens,
        dietaryRestrictions: dish.dietaryRestrictions,
        price: dish.price
      })),
      drinks: filteredDrinksMenu.map(drink => ({
        name: drink.name,
        category: drink.category,
        description: drink.description,
        ingredients: drink.ingredients,
        allergens: drink.allergens,
        price: drink.price
      }))
    };

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Tu es un sommelier et chef cuisinier expert de la cuisine corse. Tu dois aider les clients à comprendre les plats et répondre à leurs questions sur la cuisine corse.
          
          Voici notre carte actuelle :
          Plats : ${JSON.stringify(menuContext.food)}
          Boissons : ${JSON.stringify(menuContext.drinks)}
          
          IMPORTANT : Pour que les recommandations fonctionnent correctement, tu dois :
          1. Toujours mentionner les noms EXACTS des plats et des boissons tels qu'ils apparaissent dans notre carte
          2. Utiliser les guillemets pour les noms des produits (exemple : "Citronnade Bio Maison")
          3. Ne pas modifier les noms des produits
          4. Ne pas inventer de nouveaux noms
          
          Si le client pose une question sur un plat ou un ingrédient :
          1. Explique-lui en détail ce que c'est
          2. Indique si ce plat/ingrédient est présent dans notre carte
          3. Si oui, mentionne son nom exact entre guillemets
          
          Si le client demande des recommandations :
          1. Suggère des plats de notre carte qui pourraient lui plaire
          2. Explique pourquoi ces plats pourraient lui convenir
          3. Mentionne les noms exacts des plats recommandés entre guillemets
          
          Si le client a sélectionné des plats ou demande des recommandations de boissons :
          1. Recommande des boissons qui s'accordent bien avec ces plats
          2. Mentionne les noms EXACTS des boissons recommandées entre guillemets
          3. Explique pourquoi ces boissons s'accordent bien avec les plats choisis
          
          Réponds de manière professionnelle et chaleureuse, comme un vrai chef corse.`
        },
        {
          role: "user",
          content: preferences
        }
      ],
      model: "gpt-3.5-turbo",
    });

    const recommendation = completion.choices[0].message.content || "";

    // Fonction pour normaliser les noms
    const normalizeName = (name: string) => {
      return name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
        .replace(/[^a-z0-9]/g, ' '); // Remplace les caractères spéciaux par des espaces
    };

    // Fonction pour vérifier si un nom est mentionné dans le texte
    const isNameMentioned = (name: string, text: string) => {
      const normalizedName = normalizeName(name);
      const normalizedText = normalizeName(text);
      return normalizedText.includes(normalizedName);
    };

    // Trouver les plats et boissons mentionnés dans la réponse
    const mentionedDishes = filteredFoodMenu.filter(dish => 
      isNameMentioned(dish.name, recommendation)
    );

    const mentionedDrinks = filteredDrinksMenu.filter(drink => {
      // Pour les vins, on vérifie aussi le nom sans l'année
      if (drink.category === 'vins') {
        const wineNameWithoutYear = drink.name.replace(/\s*\d{4}\s*/, '').trim();
        return isNameMentioned(drink.name, recommendation) || 
               isNameMentioned(wineNameWithoutYear, recommendation);
      }
      return isNameMentioned(drink.name, recommendation);
    });

    // Log pour le débogage
    console.log('Recommandation:', recommendation);
    console.log('Plats trouvés:', mentionedDishes.map(d => d.name));
    console.log('Boissons trouvées:', mentionedDrinks.map(d => d.name));

    return NextResponse.json({ 
      recommendation,
      dishes: mentionedDishes,
      drinks: mentionedDrinks
    });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la génération des recommandations." },
      { status: 500 }
    );
  }
} 