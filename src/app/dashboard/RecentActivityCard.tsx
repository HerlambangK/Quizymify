import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {}

const RecentActivityCard = (props: Props) => {
    return (
        <Card className='col-span-2 lg:col-span-3'>
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                    Recent Activities
                </CardTitle>
                <CardDescription>
                    You have played a total of 7 games
                </CardDescription>
            </CardHeader>
            <CardContent className='max-h-[580px] overflow-scroll'>
                History
            </CardContent>
        </Card>
    )
}

export default RecentActivityCard