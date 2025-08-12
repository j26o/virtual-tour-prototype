import { RigidBody } from '@react-three/rapier'
import { useLoader } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { TextureLoader } from 'three'
import * as THREE from 'three'

export function Floor() {
  const [
    colorMap,
    displacementMap,
    normalMap,
    roughnessMap,
    aoMap
  ] = useLoader(TextureLoader, [
    '/textures/grass_with_rocks_01_color.png',
    '/textures/grass_with_rocks_01_height.png',
    '/textures/grass_with_rocks_01_normal_gl.png',
    '/textures/grass_with_rocks_01_roughness.png',
    '/textures/grass_with_rocks_01_ambientocclusion.png'
  ])
  
  // Repeat textures
  const textures = [colorMap, displacementMap, normalMap, roughnessMap, aoMap]
  textures.forEach(t => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(120, 120)
  })
  
  return (
    <RigidBody 
      type="fixed" 
      colliders="cuboid"
      position={[0, 0.8, 0]}
    >
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[200, 200, 0.1]} subdivisions={32} /> {/* Increased depth and added subdivisions */}
        <meshStandardMaterial 
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          displacementScale={0}
          normalScale={new THREE.Vector2(1, 1)}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </RigidBody>
  )
}