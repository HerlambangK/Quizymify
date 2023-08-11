"use client";

import { User } from 'next-auth'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu'
// import { DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { signOut } from "next-auth/react";
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import UserAvatar from './UserAvatar';

type Props = {
    user: Pick<User, "name" | "image" | "email">
}

const UserAccountNav = ({ user }: Props) => {
    // user.
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {/* user avatar */}
                {/* <Button>hi</Button> */}
                <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white ' align='end'>
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className='font-medium'>{user.name}</p>}
                        {user.email && (
                            <p className='w-[200px] truncate text-sm text-zinc-700 '> {user.email}</p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href='/'>Meow</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={(e) => {
                    e.preventDefault()
                    signOut().catch(console.error)
                }}
                    className='text-red-600 cursor-pointer'
                >
                    Sign Out
                    <LogOut className='w-4 h-4 ml-2' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav