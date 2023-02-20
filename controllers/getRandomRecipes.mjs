const getRandomRecipes = async (req, res) => {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.API_KEY_SPOONACULAR}`);
        const result = await response.json();
        console.log(result);

        const filteredResult = {
            title: result.recipes[0].title,
            image: result.recipes[0].image,
            extendedIngredients: result.recipes[0].extendedIngredients,
            readyInMinutes: result.recipes[0].readyInMinutes,
            analyzedInstructions: result.recipes[0].analyzedInstructions
        }        

        res.json({result: filteredResult})
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Could not fetch recipes" });
    }
};

export default getRandomRecipes;


