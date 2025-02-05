import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Float, useGLTF, useTexture } from "@react-three/drei";

const Cube = ({ ...props }) => {
  const { nodes } = useGLTF("models/cube.glb");
  const texture = useTexture("textures/cube.png"); // Load the texture

  const cubeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.5,
      })
      .to(cubeRef.current.rotation, {
        y: hovered ? "+=2" : `+=${Math.PI * 2}`,
        x: hovered ? "+=2" : `-=${Math.PI * 2}`,
        duration: 2.5,
        stagger: {
          each: 0.15,
        },
      });
  });

  return (
    <Float floatIntensity={2}>
      <group
        position={[9, -4, 0]}
        rotation={[2.6, 0.8, -1.8]}
        scale={0.74}
        dispose={null}
        {...props}
      >
        <mesh
          ref={cubeRef}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          onPointerEnter={() => setHovered(true)} // Hover starts
          onPointerLeave={() => setHovered(false)} // Reset hover state on leave
        >
          <meshStandardMaterial
            map={texture} // Apply texture correctly
            metalness={0.2} // Moderate metalness
            roughness={0.5} // Some roughness for realism
            color={"#ffffff"} // Base color to enhance the texture
          />
        </mesh>
      </group>
    </Float>
  );
};

useGLTF.preload("models/cube.glb");

export default Cube;
