// const getRecipesByIngredients = async (request, response) => {
//     const { ingredient_1, ingredient_2, ingredient_3, number_of_recipe } = request.body

//     try {
//         const res = await fetch (`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient_1},+${ingredient_2},+${ingredient_3}&number=${number_of_recipe}&apiKey=${process.env.API_KEY_SPOONACULAR}`)
//         const result = await res.json()

//         const filteredResult = result.map(({ id, title, image, missedIngredients, usedIngredients }) => {
//             const score = usedIngredients.length;
//             return { id, title, image, missedIngredients, usedIngredients, score };
//         });

//           // Trier les résultats par score décroissant
//         filteredResult.sort((a, b) => b.score - a.score);

//         console.log(filteredResult);
//         response.send({ result: filteredResult });
//     } catch (error) {
//         console.error(error)
//         response.status(500).send({ error: "Could not fetch recipes" })
//     }
// }

// export default getRecipesByIngredients

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

        // Renvoyer les résultats triés
        response.send({
            result: filteredResult
        });
    } catch (error
