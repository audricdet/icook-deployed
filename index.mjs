// IMPORT PACKAGES
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

// IMPORT CONTROLLERS 
import getRecipesByIngredients from './controllers/getRecipesbyIngredients.mjs'
import getRecipesById from './controllers/getRecipesById.mjs'
import getDalleImages from './controllers/getDalleImages.mjs' 
import getRandomRecipes from './controllers/getRandomRecipes.mjs'

//EXPRESS 
const app = express()

//USE 
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())

//CLASSIC ROUTES 
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./test.html'), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('iCook app listening on port 3000!');
});
//REQUEST 
//GET 
app.get("/getRecipesById/:id", getRecipesById)
app.get("/getRandomRecipes", getRandomRecipes)


//POST
app.post("/getRecipesByIngredients", getRecipesByIngredients)
app.post("/getDalleImages", getDalleImages)