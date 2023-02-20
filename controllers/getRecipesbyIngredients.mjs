const getRecipesByIngredients = async (request, response) => {
    const { ingredient_1, ingredient_2, ingredient_3, number_of_recipe } = request.body
    
    try {
        const res = await fetch (`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient_1},+${ingredient_2},+${ingredient_3}&number=${number_of_recipe}&apiKey=${process.env.API_KEY_SPOONACULAR}`)
        const result = await res.json()
        
        const filteredResult = result.map(({ id, title, image, missedIngredients, usedIngredients  }) => ({ id, title, image, missedIngredients, usedIngredients }))
        console.log(filteredResult)
        response.send({result: filteredResult})
    } catch (error) {
        console.error(error)
        response.status(500).send({ error: "Could not fetch recipes" })
    }
}

export default getRecipesByIngredients

