import Navigation from './Navigation'
import { useAuth } from '../../api/auth'
import React, { Component, ReactNode } from 'react';

interface LayoutPropsType {
    header?: ReactNode
    children?: ReactNode
}
const AppLayout = ({ header, children}: LayoutPropsType) => {
    const { user } = useAuth({ middleware: 'guest'})
    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user}/>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
