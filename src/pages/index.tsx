import type { NextPage } from 'next'
import { useAuth } from '../api/auth'
import Navigation from '../components/Layouts/Navigation'

const Home: NextPage = () => {
  const { user } = useAuth({ middleware: 'guest'})
  return (
    <div className="relative overflow-hidden bg-white">
      <Navigation />
      <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="text-center">
          <h1 className="leading-4 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-indigo-600 xl:inline">DUTY Timer</span>
          </h1>
        </div>
      </main>
    </div>
  )
}

export default Home
