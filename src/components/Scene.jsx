import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { Sky, Stats, Environment, Grid, useHelper, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'

import * as THREE from 'three'

import { Fox } from './Fox'
import { SoccerBall } from './SoccerBall'

function Floor() {
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
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <boxGeometry args={[768, 768, 0.1]} subdivisions={32} /> {/* Increased depth and added subdivisions */}
      <meshStandardMaterial 
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        // displacementScale={2} // Increased from 0.2 to 2
        normalScale={new THREE.Vector2(1, 1)} // Added normal map intensity
        roughness={0.8} // Added roughness value
        metalness={0.2} // Added slight metalness for better material definition
      />
    </mesh>
  )
}

export default function Scene() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
        {/* Lighting */}
				<ambientLight intensity={0.5} />
				<directionalLight 
					position={[50, 50, 25]} 
					intensity={1} 
					castShadow
					shadow-mapSize={[2048, 2048]}
					shadow-camera-far={100}
					shadow-camera-left={-20}
					shadow-camera-right={20}
					shadow-camera-top={20}
					shadow-camera-bottom={-20}
				/>
				
				{/* Fog for depth */}
				<fog attach="fog" args={['#87CEEB', 30, 200]} />

        <Environment 
					files="/textures/limpopo_golf_course.hdr" 
					background 
					blur={0}
					resolution={2048} // Increased from 1024 to 2048
					preset={null}
					encoding={THREE.LinearEncoding} // Add proper encoding
					ground={{
						height: 14, // Height of the environment ground
						radius: 120, // Radius of the environment ground
						scale: 88 // Scale of the environment ground textures
					}}
				/>

				<Suspense fallback={null}>
					<Floor />
					<Fox />
					<SoccerBall />
					<OrbitControls />
				</Suspense>

				{/* Post-processing effects */}
				<EffectComposer>
					<Bloom 
						intensity={0.5}
						luminanceThreshold={0.9}
						luminanceSmoothing={0.025}
						mipmapBlur
					/>
					<DepthOfField 
						focusDistance={0.01}
						focalLength={0.05}
						bokehScale={2}
					/>
				</EffectComposer>
      </Canvas>
    </div>
  )
}