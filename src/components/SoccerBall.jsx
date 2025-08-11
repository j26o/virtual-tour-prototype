import { useGLTF } from '@react-three/drei'

export function SoccerBall() {
  const { scene } = useGLTF('/models/soccer.glb')
  
  return <primitive object={scene} position={[-2, 0.8, 0]} scale={0.4} />
}

useGLTF.preload('/models/soccer.glb')