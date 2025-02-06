import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HackerRoom from "../components/HackerRoom";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants";
import MouseLight from "../components/MouseLight";
import { useState, useEffect } from "react";
import { ACESFilmicToneMapping, PCFSoftShadowMap } from "three";
import Target from "../components/Target";
import ReactLogo from "../components/ReactLogo";
import Cube from "../components/Cube";
import Rings from "../components/RIngs";
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";
// import Atom from "./Atom";

const Hero = () => {
  const [turnOn, isTurnOn] = useState(false);
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  const bulbToggle = () => {
    isTurnOn((prev) => !prev); // Correct way to update state based on previous value
  };
  useEffect(() => {
    console.log("Lights are:", turnOn ? "ON" : "OFF");
  }, [turnOn]);

  return (
    <section className="min-h-screen flex w-full flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-family-generalsans">
          <button
            onClick={bulbToggle}
            style={{ cursor: "pointer", zIndex: 10, position: "relative" }}
          >
            💡
          </button>
          Hi, I am Sanket
          <span className="waving-hand" style={{ cursor: "pointer" }}>
            👋
          </span>
        </p>
        <p className="hero_tag text-gray_gradient">
          I am a Full Stack <span className="whitespace-nowrap">Developer</span>
        </p>
        {/* {turnOn && (
          <p className="text-gray-50 text-center">
            Please turn off the lights before you go. The power bill is going
            crazy !!!!
          </p>
        )} */}
      </div>
      <div className="w-full h-full absolute inset-0">
        <Canvas
          shadows
          className="w-full h-full"
          gl={{
            shadowMap: { enabled: true, type: PCFSoftShadowMap },
            toneMapping: ACESFilmicToneMapping,
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            {/* <Lamp/> */}
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            {/* <Atom/> */}
            {!turnOn && <MouseLight />}
            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={sizes.deskScale}
                position={sizes.deskPosition}
                rotation={[0, -Math.PI, 0]}
              />
            </HeroCamera>
            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Cube position={sizes.cubePosition} />
              <Rings position={sizes.ringPosition} />
            </group>

            {turnOn && (
              <>
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[10, 10, 20]}
                  intensity={2}
                  castShadow
                />
              </>
            )}
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#about" className="w-fit">
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
