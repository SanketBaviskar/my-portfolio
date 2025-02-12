import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import Developer from '../components/Developer.jsx';
import CanvasLoader from '../components/CanvasLoader.jsx';
import { workExperiences } from '../constants/index.js';

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState('idle');
  const workContentRefs = useRef([]);

  useEffect(() => {
    // GSAP animations for work experience items
    workContentRefs.current.forEach((el, index) => {
      if (el) {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          delay: index * 0.2,
          ease: 'power2.out',
        });

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.2,
          ease: 'power2.out',
        });
      }
    });
  }, []);

  const handleHover = (index) => {
    const el = workContentRefs.current[index];
    if (el) {
      gsap.to(el, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleHoverOut = (index) => {
    const el = workContentRefs.current[index];
    if (el) {
      gsap.to(el, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section className="c-space my-20" id="work">
      <div className="w-full text-white-600">
        <p className="head-text">My Work Experience</p>

        <div className="work-container">
          <div className="work-canvas">
            <Canvas>
              <ambientLight intensity={7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />

              <Suspense fallback={<CanvasLoader />}>
                <Developer position-y={-3} scale={3} animationName={animationName} />
              </Suspense>
            </Canvas>
          </div>

          <div className="work-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (workContentRefs.current[index] = el)}
                  onClick={() => setAnimationName(item.animation.toLowerCase())}
                  onPointerOver={() => {
                    setAnimationName(item.animation.toLowerCase());
                    handleHover(index);
                  }}
                  onPointerOut={() => {
                    setAnimationName('idle');
                    handleHoverOut(index);
                  }}
                  className="work-content_container group"
                >
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="work-content_bar" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <p className="font-bold text-white-800 text-gray-50">{item.name}</p>
                    <p className="text-sm mb-5 text-gray-100">
                      {item.pos} -- <span>{item.duration}</span>
                    </p>
                    <p className="group-hover:text-white transition-all ease-in-out duration-500 text-gray-200">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;