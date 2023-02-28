import { Configuration, OpenAIApi } from "openai"
import bodyParser from 'body-parser'

const apiKey = process.env.API_KEY_OPENAI

const configuration = new Configuration({
    apiKey: apiKey,
})
const openai = new OpenAIApi(configuration)

const getDalleImages = async (request) => {
    const title = request.body.title

    const response = await openai.createImage({
        prompt: title,
        n: 1,
        size: "256x256",
    });
    console.log(response.data)

    response.json({url: response.data[0].url})
}

export default getDalleImages

