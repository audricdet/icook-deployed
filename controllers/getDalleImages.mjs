const apiKey = process.env.API_KEY_OPENAI
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: apiKey,
})
const openai = new OpenAIApi(configuration)

const getDalleImages = async (request) => {
    const { title } = request.body

    const response = await openai.createImage({
        prompt: title,
        n: 1,
        size: "256x256",
    });
console.log(response.data)

return response.data

}

getDalleImages()

export default getDalleImages
