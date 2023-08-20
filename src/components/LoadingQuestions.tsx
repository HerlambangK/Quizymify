"use client"
import Image from 'next/image'
import React from 'react'
import { Progress } from './ui/progress'

type Props = {
    finished: boolean
}

const loadingTexts = [
    "Loading...",
    "Generating questions...",
    "Unleashing the power of curiosity...",
    "Diving deep into the ocean of questions..",
    "Harnessing the collective knowledge of the cosmos...",
    "Igniting the flame of wonder and exploration...",
]

const LoadingQuestions = ({ finished }: Props) => {
    const [progress, setProgress] = React.useState(0);
    const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * loadingTexts.length);
            setLoadingText(loadingTexts[randomIndex]);

        }, 2000)
        return () => clearInterval(interval);
    }, [])

    React.useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (finished) return 100
                if (prevProgress === 100) {
                    return 0
                }
                if (Math.random() < 0.1) {
                    return prevProgress + 2
                }
                return prevProgress + 0.5
            });
        }, 100)
        return () => clearInterval(interval);
    }, [])
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
            <Image
                width={400}
                height={400}
                alt='loading animation'
                src={'/loading.gif'}
            />
            <Progress value={progress} className='w-full mt-4' />
            <h1 className='mt-2 text-xl'>{loadingText}</h1>
        </div>
    )
}

export default LoadingQuestions