import { Configuration, OpenAIApi } from "openai"
import bodyParser from 'body-parser'

const apiKey = process.env.API_KEY_OPENAI

const configuration = new Configuration({
    apiKey: apiKey,
})
const openai = new OpenAIApi(configuration)

const getDalleImages = async (request, response) => {
    try {
        const title = request.body.title

        const responseFromAPI = await openai.createImage({
            prompt: title,
            n: 1,
            size: "256x256",
        });
        console.log(responseFromAPI.data)

        response.send(responseFromAPI.data)
    } catch (error) {
        console.error(error)
        response.status(500).send('Internal Server Error')
    }
}

export default getDalleImages

