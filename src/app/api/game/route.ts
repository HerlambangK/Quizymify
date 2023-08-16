// api/game

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios"

export async function POST(req: Request, res: Response) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json(
                {
                    error: "You must e logged in to play"
                },
                {
                    status: 401
                }
            )
        }
        const body = await req.json();
        console.log("game body :", body);
        const { topic, type, amount } = quizCreationSchema.parse(body);
        const game = await prisma.game.create({
            data: {
                gameType: type,
                timeStarted: new Date(),
                userId: session.user.id,
                topic,
            },
        });

        console.log(game)
        const { data } = await axios.post(`${process.env.API_URL}/api/questions`,
            {
                amount,
                topic,
                type,
            }
        );

        console.log("data :", data);

        if (type === "mcq") {
            type mcqQuestion = {
                question: string,
                answer: string,
                option1: string,
                option2: string,
                option3: string
            }
            let manyData = data.questions.map((question: mcqQuestion) => {
                let options = [question.option1, question.option2, question.option3, question.answer];
                options = options.sort(() => Math.random() - 0.5);
                console.log(options);
                return {
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),
                    gameId: game.id,
                    questionType: "mcq",
                };
            });
            await prisma.question.createMany({
                data: manyData
            })
        } else if (type === 'open_ended') {
            type openQuestion = {
                question: string,
                answer: string
            }
            let manyData = data.questions.map((question: openQuestion) => {
                return {
                    question: question.question,
                    answer: question.answer,
                    gameId: game.id,
                    questionType: "open_ended"

                }
            })
            await prisma.question.createMany({
                data: manyData
            })
        }
        return NextResponse.json({
            gameId: game.id
        }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues }, { status: 400 }
            )
        } else {
            return NextResponse.json(
                {
                    // error: "Something went wrong",
                    error: error,
                }, { status: 500 },
                // { error: "An unexpected error occurred" }, { status: 500 },

            )
        }

    }
} 