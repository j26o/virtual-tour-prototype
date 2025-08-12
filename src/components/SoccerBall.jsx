import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export function SoccerBall() {
  const { scene } = useGLTF('/models/soccer.glb')
  
  return (
    <RigidBody colliders="ball" mass={0.5} restitution={0.7} scale={1.1} friction={1.5}>
      <primitive object={scene} position={[-2, 0.8, 0]} scale={0.4} />
    </RigidBody>
  )
}

useGLTF.preload('/models/soccer.glb')