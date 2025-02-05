import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Target = (props) => {
  const targetRef = useRef();
  const { scene } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf'
  );

  useEffect(() => {
    // GSAP animation for bouncing effect
    if (targetRef.current) {
      gsap.to(targetRef.current.position, {
        y: targetRef.current.position.y + 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // Ensure target material has emissive glow and reacts to lights
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        // child.receiveShadow = true;
        child.material.emissive = child.material.color.clone().multiplyScalar(0.3);
        child.material.emissiveIntensity = 0.5;
        child.material.metalness = 0.3; // Slight metal effect for light reflection
        child.material.roughness = 0.4; // Balanced roughness for realism
      }
    });
  }, [scene]);

  return (
    <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 4, 0]} scale={1.5}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Target;
