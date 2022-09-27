import ApplicationLogo from './components/ApplicationLogo'
import AuthCard from './components/AuthCard'
import Button from './components/Button'
import GuestLayout from './components/Layouts/GuestLayout'
import Input from './components/Input'
import InputError from './components/InputError'
import Label from './components/Label'
import Link from 'next/link'
import { useState } from 'react'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        // register({ name, email, password, password_confirmation: passwordConfirmation, setErrors })
    }

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </a>
                    </Link>
                }>

                <form onSubmit={}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="name" className={''}>Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                const element = event.currentTarget as HTMLInputElement
                                const value = element.value
                                setName(value)
                            }}
                            required
                            autoFocus
                        />
                    </div>

                    {/* Email Address */}
                    <div className="mt-4">
                        <Label htmlFor="email" className={''}>Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                const element = event.currentTarget as HTMLInputElement
                                const value = element.value
                                setEmail(value)
                            }}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password" className={''}>Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                const element = event.currentTarget as HTMLInputElement
                                const value = element.value
                                setPassword(value)
                            }}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Label htmlFor="passwordConfirmation" className={''}>
                            Confirm Password
                        </Label>

                        <Input
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            className="block mt-1 w-full"
                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                const element = event.currentTarget as HTMLInputElement
                                const value = element.value
                                setPasswordConfirmation(value)
                            }}
                            required
                        />
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Register