import { Configuration, OpenAIApi } from 'openai'
import { NextApiRequest, NextApiResponse } from 'next'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const basePromptPrefix = ''
const generateAction = async (req: NextApiRequest, res: NextApiResponse) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.input}`,
        temperature: 0.7,
        max_tokens: 250,
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    res.status(200).json({ output: basePromptOutput })
}

export default generateAction
