import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, KeyboardControls } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'

import { Physics } from '@react-three/rapier'
import * as THREE from 'three'

import { Fox } from './Fox'
import { Floor } from './Floor'
import { SoccerBall } from './SoccerBall'


export default function Scene() {
  return (
		<KeyboardControls
			map={ [
					{ name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
					{ name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
					{ name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
					{ name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
					{ name: 'jump', keys: [ 'Space' ] },
			] }
    >
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
						resolution={2048}
						preset={null}
						encoding={THREE.LinearEncoding}
						ground={{
							height: 14,
							radius: 120,
							scale: 88
						}}
					/>

					<OrbitControls />

					<Physics debug>

						<Suspense fallback={null}>
							<Fox />
							<SoccerBall />
							<Floor />
						</Suspense>

					</Physics>

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
		</KeyboardControls>
  )
}