import { About } from './components/About'
import Contact from './components/Contact'
import { Education } from './components/Education'
import Experience from './components/Experience'
import { Expertise } from './components/Expertise'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import { NoiseOverlay } from './components/NoiseOverlay'
import { Publications } from './components/Publications'
import { SelectedWork } from './components/SelectedWork'

export default function App(): JSX.Element {
  return (
    <>
      {/* First focusable element on the page: lets keyboard users jump the nav. */}
      <a
        href="#main"
        className="focus-ring sr-only z-[100] focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:rounded-full focus:bg-card focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-cream"
      >
        Skip to content
      </a>

      {/* Global film grain. Fixed, non-interactive, sits above the page. */}
      <NoiseOverlay className="fixed inset-0 z-50" opacity={0.03} />

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <SelectedWork />
        <Expertise />
        <Experience />
        <Education />
        <Publications />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
