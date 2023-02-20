const getRecipesById = async (request, response) => {
    const id  = request.params.id

    try {
        const res = await fetch (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY_SPOONACULAR}`)
        const result = await res.json()
    
        const filteredResult = {
            title: result.title,
            image: result.image,
            extendedIngredients: result.extendedIngredients,
            readyInMinutes: result.readyInMinutes,
            analyzedInstructions: result.analyzedInstructions
        }        
        console.log(filteredResult)
        response.json({result: filteredResult})
    } catch (error) {
        console.error(error)
        response.status(500).send({ error: "Could not fetch recipes" })
    }
}

export default getRecipesById