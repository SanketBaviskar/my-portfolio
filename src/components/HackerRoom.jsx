import { useGLTF, useTexture } from '@react-three/drei';

export default function HackerRoom(props) {
  // Load the GLTF model and extract nodes and materials
  const { nodes, materials } = useGLTF('/models/hacker-room.glb');

  // Load textures
  const monitortxt = useTexture('textures/desk/monitor.png');
  const screenTxt = useTexture('textures/desk/screen-2.png');

  return (
    <group {...props} dispose={null}>
      {/* Ensure each mesh has the correct geometry and material */}
      <mesh geometry={nodes.screen_screens_0.geometry} material={materials.screens} castShadow receiveShadow>
        <meshMatcapMaterial map={screenTxt} />
      </mesh>
      <mesh geometry={nodes.screen_glass_glass_0.geometry} material={materials.glass} receiveShadow castShadow/>
      <mesh geometry={nodes.table_table_mat_0_1.geometry} material={materials.table_mat}  castShadow/>
      <mesh geometry={nodes.table_table_mat_0_2.geometry} material={materials.computer_mat} receiveShadow castShadow>
        <meshStandardMaterial  map={monitortxt} />
      </mesh>
      <mesh geometry={nodes.table_table_mat_0_3.geometry} material={materials.server_mat}  castShadow/>
      <mesh geometry={nodes.table_table_mat_0_4.geometry} material={materials.vhsPlayer_mat}  castShadow/>
      <mesh geometry={nodes.table_table_mat_0_5.geometry} material={materials.stand_mat} castShadow/>
      <mesh geometry={nodes.table_table_mat_0_6.geometry} material={materials.mat_mat} receiveShadow castShadow/>
      <mesh geometry={nodes.table_table_mat_0_7.geometry} material={materials.arm_mat}  castShadow/>
      <mesh geometry={nodes.table_table_mat_0_8.geometry} material={materials.tv_mat} castShadow>
        <meshStandardMaterial  map={monitortxt} />
      </mesh>
      <mesh geometry={nodes.table_table_mat_0_9.geometry} material={materials.cables_mat} castShadow/>
      <mesh geometry={nodes.table_table_mat_0_10.geometry} material={materials.props_mat}  castShadow/>
      <mesh geometry={nodes.table_table_mat_0_11.geometry} material={materials.ground_mat} receiveShadow/>
      <mesh geometry={nodes.table_table_mat_0_12.geometry} material={materials.key_mat} castShadow/>
    </group>
  );
}

// Preload the GLTF model
useGLTF.preload('/models/hacker-room.glb');