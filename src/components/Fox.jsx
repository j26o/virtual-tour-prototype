import { useGLTF } from '@react-three/drei'

export function Fox() {
  const { scene } = useGLTF('/models/fox.gltf')
  
  return (
    <primitive object={scene} position={[0, -1, -0.2]} scale={0.02} />
  )
}

useGLTF.preload('/models/fox.gltf')