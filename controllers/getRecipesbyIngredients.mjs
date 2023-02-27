
// const getRecipesByIngredients = async (request, response) => {
//     // Récupérer le tableau d'ingrédients et le nombre de recettes souhaité depuis le corps de la requête
//     const {
//         ingredients,
//         number_of_recipe
//     } = request.body;

//     try {
//         // Appeler l'API avec les ingrédients et le nombre de recettes souhaité
//         const res = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&number=${number_of_recipe}&apiKey=${process.env.API_KEY_SPOONACULAR}`);
//         const result = await res.json();

//         // Ajouter une note à chaque recette en fonction du nombre d'ingrédients correspondants
//         const filteredResult = result.map(({
//             id,
//             title,
//             image,
//             missedIngredients,
//             usedIngredients
//         }) => {
//             const score = usedIngredients.length;
//             return {
//                 id,
//                 title,
//                 image,
//                 missedIngredients,
//                 usedIngredients,
//                 score
//             };
//         });

//         // Trier les résultats par note décroissante
//         filteredResult.sort((a, b) => b.score - a.score);

//         // Renvoyer les résultats triés
//         response.send({
//             result: filteredResult
//         });
//     } catch (error) {
//         console.error(error);
//         response.status(500).send({
//             error: "Could not fetch recipes"
//         });
//     }
// };

// export default getRecipesByIngredients;

const getRecipesByIngredients = async (request, response) => {
    // Récupérer le tableau d'ingrédients et le nombre de recettes souhaité depuis le corps de la requête
    const {
        ingredients,
        number_of_recipe
    } = request.body;

    try {
        // Appeler l'API avec les ingrédients et le nombre de recettes souhaité
        const res = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&number=${number_of_recipe}&apiKey=${process.env.API_KEY_SPOONACULAR}`);
        const result = await res.json();

        // Ajouter une note à chaque recette en fonction du nombre d'ingrédients correspondants
        const filteredResult = result.map(({
            id,
            title,
            image,
            missedIngredients,
            usedIngredients
        }) => {
            const score = usedIngredients.length;
            return {
                id,
                title,
                image,
                missedIngredients,
                usedIngredients,
                score
            };
        });

        // Trier les résultats par note décroissante
        filteredResult.sort((a, b) => b.score - a.score);

        // Récupérer le titre de la première recette
        const title = filteredResult[0].title;

        // Appeler l'API OpenAI avec le titre de la recette
        const configuration = new Configuration({
            apiKey: process.env.API_KEY_OPENAI,
        });

        const openai = new OpenAIApi(configuration);

        const response = await openai.createImage({
            prompt: title,
            n: 1,
            size: "256x256",
        });

        // Renvoyer les résultats triés et l'image générée par OpenAI
        response.send({
            result: filteredResult,
            image: response.data
        });
    } catch (error) {
        console.error(error);
        response.status(500).send({
            error: "Could not fetch recipes and DALLE images"
        });
    }
};

export default getRecipesByIngredients;
