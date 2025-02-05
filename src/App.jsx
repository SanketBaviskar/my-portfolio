import Hero from "./section/Hero"
import NavBar from "./components/NavBar"
import About from "./Section/About"
import Projects from "./Section/Projects"
import WorkExperience from "./Section/Experience"
import Contact from "./Section/Contact"
import Footer from "./Section/Footer"
function App() {

  return (
    <main className="max-w-7xl mx-auto ">
      <NavBar/>
      <Hero/>
      <About/>
      <Projects/>
      <WorkExperience />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
