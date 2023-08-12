"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import D3WordCloud from "react-d3-cloud"

type Props = {};

const data = [
    {
        text: "Hey",
        value: 3
    },
    {
        text: "Apa Saja ?",
        value: 5
    },
    {
        text: "Next Js",
        value: 10
    },
    {
        text: "Indonesia",
        value: 13
    },
    {
        text: "Artis",
        value: 5
    },
]

const fontSizeWrapper = (word: { value: number }) => {
    return Math.log2(word.value) * 5 + 16;
}

function CustomWordCloud({ }: Props) {
    const theme = useTheme()
    return (
        <>
            <D3WordCloud
                height={550}
                data={data}
                font="Times"
                fontSize={fontSizeWrapper}
                rotate={0}
                padding={10}
                fill={theme.theme == 'dark' ? 'white' : 'black'}
            />
        </>
    )
}

export default CustomWordCloud