import { SessionProvider } from 'next-auth/react'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <div>{children}</div>
        </SessionProvider>
    )
}

export default Providers 