import HistoryCard from '@/components/dashboard/HistoryCard';
import QuizMeCard from '@/components/dashboard/QuizMeCard';
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation';
import React from 'react'
import HotTopicCard from './HotTopicCard';
import RecentActivityCard from './RecentActivityCard';
import HistoryComponent from '@/components/HistoryComponent';

type Props = {}

export const metadata = {
    title: "Dashboard | Quizmify"
}

const Dashboard = async (props: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect('/')
    }
    return (
        <main className='p-8 mx-auto max-1-7xl'>
            <div className="flex item-center">
                <h2 className='mr-2 text-3xl font-bold tracking-tight'>Dashboard</h2>
            </div>
            <div className="grid gap-4 mt-4 md:grid-cols-2">
                <QuizMeCard />
                <HistoryCard />
            </div>
            <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
                <HotTopicCard />
                <RecentActivityCard />
                {/* <HistoryComponent /> */}
            </div>
        </main>
    )
}

export default Dashboard