import { useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/Button.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import TechStack from '../components/TechStack.jsx';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const containerRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText('sanketbaviskar01@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  useGSAP(() => {
    // Select all elements with the class `animate-section`
    const sections = gsap.utils.toArray('.animate-section');

    // Animate each section based on its position in the grid
    sections.forEach((section, index) => {
      let x = 0; // Default for middle sections
      let y = 0;
      let opacity = 0;
      let scale = 1;

      // Left sections (first column)
      if (index % 3 === 0) {
        x = -100; // Slide in from the left
      }
      // Right sections (last column)
      else if (index % 3 === 2) {
        x = 100; // Slide in from the right
      }
      // Middle sections (middle column)
      else {
        scale = 0.8; // Appear from the back (scale up)
      }

      // Set initial state of the section (hidden)
      gsap.set(section, { x, y, opacity, scale });

      // Animate the section on scroll
      gsap.to(section, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section, // Trigger animation when the section enters the viewport
          start: 'top 80%', // Start animation when the top of the section is 80% in view
          end: 'bottom 20%', // End animation when the bottom of the section is 20% in view
          toggleActions: 'play none none reverse', // Play animation on enter, reverse on leave
        },
      });
    });
  }, { scope: containerRef }); // Scope the animation to the container

  return (
    <section className="c-space my-20" id="about" ref={containerRef}>
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/* Left Section */}
        <div className="col-span-1 xl:row-span-3 animate-section">
          <div className="grid-container">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">Hi, I’m Sanket Baviskar</p>
              <p className="grid-subtext">
                Passionate software engineer with 2+ years of experience in full-stack development, AI/ML, and cloud technologies, dedicated to solving complex problems and delivering high-impact solutions in fast-paced environments. Also I like Building LEGO's
              </p>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="col-span-1 animate-section xl:row-span-3">
          <div className="grid-container">
            <div>
              <TechStack/>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable applications.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-1 animate-section xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 39.739235, lng: -104.990250, text: 'Denver, CO', color: 'white', size: 15 }]}
              />
            </div>
            <div>
              <p className="grid-headtext">I’m very flexible with time zone communications & locations</p>
              <p className="grid-subtext">I&apos;m based in Denver Colorado and open to remote work within US.</p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        {/* Bottom Left Section */}
        <div className="xl:col-span-2 animate-section xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Programming isn&apos;t just my profession—it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Right Section */}
        <div className="xl:col-span-1 animate-section xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">sanketbaviskar01@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;