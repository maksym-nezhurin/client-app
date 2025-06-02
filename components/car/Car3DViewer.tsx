import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, Html } from '@react-three/drei'

interface Car3DViewerProps {
  modelPath: string
  rotationSpeed?: number
}

function Model({ modelPath, rotationSpeed = 0.01 }: Car3DViewerProps) {
  const gltf = useLoader(GLTFLoader, modelPath)
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed
    }
  })

  return <primitive ref={ref} object={gltf.scene} dispose={null} />
}

export function Car3DViewer({ modelPath, rotationSpeed }: Car3DViewerProps) {
  return (
    <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-900">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 7]} intensity={1} castShadow />
        <Suspense fallback={<Html center>Завантаження 3D моделі...</Html>}>
          <Model modelPath={modelPath} rotationSpeed={rotationSpeed} />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  )
}
