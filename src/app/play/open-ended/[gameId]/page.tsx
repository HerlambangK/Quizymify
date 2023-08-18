import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        gameId: string
    }
}

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect('/')
    }
    const game = await prisma.game.findUnique({
        where: {
            id: gameId
        },
        include: {
            questions: {
                select: {
                    id: true,
                    question: true,
                    options: true
                }
            }
        }
    });
    if (!game || game.gameType !== 'open-ended') {
        return redirect('/quiz')
    }
    return <MCQ game={game} />
    // <div>{gameId}</div>
    // <pre>{JSON.stringify(game, null, 2)}</pre>


}

export default OpenEndedPage