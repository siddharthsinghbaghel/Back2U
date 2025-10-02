import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          Lost No More
        </Link>
        <nav className="flex gap-4 sm:gap-6 text-sm font-medium">
          <Link href="/login" className="hover:underline underline-offset-4">
            Login
          </Link>
          <Link href="/register" className="hover:underline underline-offset-4">
            Register
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 text-center px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl space-y-6 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Lost Something? <br className="hidden md:inline" /> Found Something?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
            A secure, community-driven platform for Chitkara University students to report lost items and help others reclaim theirs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/register">
              <Button className="bg-gray-900 shadow-md hover:scale-105 transition-transform text-gray-300">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="hover:scale-105 transition-transform">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full bg-gray-100 dark:bg-gray-900 py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Secure Platform",
                desc: "Only Chitkara University students can register and access the platform.",
                icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />,
              },
              {
                title: "Easy Reporting",
                desc: "Quickly report lost or found items with all the necessary details.",
                icon: (
                  <>
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect height="12" rx="2" width="14" x="2" y="6" />
                  </>
                ),
              },
              {
                title: "Community-Driven",
                desc: "Connect with other students to help find and return lost items.",
                icon: (
                  <>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </>
                ),
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Lost No More. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
          <Link href="#" className="hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}