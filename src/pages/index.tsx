import { type NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'

const Home: NextPage = () => {
    const [input, setInput] = useState('')
    const [apiOutput, setApiOutput] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value)
    }

    const callGenerateEndpoint = async () => {
        console.log('Calling OpenAI...')
        setIsGenerating(true)
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input }),
        })

        const data = await response.json()
        const { output } = data
        console.log('OpenAI replied...', output.text)

        setApiOutput(output.text)
        setIsGenerating(false)
    }

    return (
        <>
            <Head>
                <title>PT-1B</title>
                <meta
                    name={'PT-1B'}
                    content={'Auto generate your fitness program based on your metrics'}
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        Your <span className="text-[hsl(150,100%,70%)]">Fitness</span> Program
                        Begins Here
                    </h1>
                    <textarea
                        className={
                            'h-60 w-full resize-none rounded-lg bg-gray-100/10 p-4 text-white focus:outline-none'
                        }
                        placeholder={'Enter your prompts here'}
                        value={input}
                        onChange={handleChange}
                    />
                    <div className={'flex w-full justify-end'}>
                        <button
                            className={
                                'rounded-full bg-white/10 px-10 py-3 font-bold text-white transition hover:bg-white/30 disabled:cursor-not-allowed'
                            }
                            disabled={isGenerating}
                            onClick={callGenerateEndpoint}
                        >
                            {isGenerating ? 'Generating...' : 'Generate'}
                        </button>
                    </div>
                    {apiOutput && (
                        <div className={'flex-col text-white '}>
                            <h2 className={'mb-6 text-center align-middle text-2xl'}>
                                Here is your new Fitness program
                            </h2>
                            {isGenerating ? (
                                <p>Loading...</p>
                            ) : (
                                <pre
                                    className={'max-w-2xl whitespace-pre-wrap'}
                                >{`${apiOutput}`}</pre>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

export default Home
