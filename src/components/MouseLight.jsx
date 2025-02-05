import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const MouseLight = () => {
  const lightRef = useRef();

  useFrame(({ mouse, viewport }) => {
    if (lightRef.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      lightRef.current.position.set(x, y, 5); // Adjusted Z-position for better coverage
    }
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={10} // Reduced to avoid overexposure, but you can tweak this
      distance={20} // Extended to cover more area
      decay={2} // Smooth decay
      color="white"
      castShadow
      shadow-mapSize-width={2048} // High-quality shadows
      shadow-mapSize-height={2048}
      shadow-bias={-0.005} // Prevent shadow artifacts
    />
  );
};

export default MouseLight;
