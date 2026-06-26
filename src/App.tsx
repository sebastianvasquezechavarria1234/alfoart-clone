import { useState, type MouseEvent } from 'react'
import bg1 from './assets/background-1.jpg'
import bg2 from './assets/background-2.webp'
import frontScene from './assets/front-scene.webp'
import cloud4 from './assets/cloud-4.webp'
import petal from './assets/petal.webp'

const petals = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 6) + 2,
  top: Math.floor(Math.random() * 20) + 50,
  duration: Math.floor(Math.random() * 5) + 20,
  delay: Math.random() * 8,
  xDrift: Math.floor(Math.random() * 40) + 200,
}))

function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    setMouse({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2,
    })
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <img
        src={bg1}
        alt="background-1"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out"
        style={{ transform: `scale(1.1) translate(${mouse.x * 10}px, ${mouse.y * 10}px)` }}
      />
      <img
        src={bg2}
        alt="background-2"
        className="absolute bottom-0 left-0 ml-[-45vw] w-[190%] transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mouse.x * 25}px, ${mouse.y * 15}px)` }}
      />
      <img src={cloud4} alt="cloud-4" className="absolute top-0 left-0 w-full" />
      {petals.map((p) => (
        <img
          key={p.id}
          src={petal}
          alt="petal"
          className="petal"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            right: '-3%',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--x-drift' as string]: `-${p.xDrift}vw`,
          }}
        />
      ))}
      <img
        src={frontScene}
        alt="front-scene"
        className="absolute bottom-0 left-0 ml-[-45vw] w-[190%] transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mouse.x * 40}px, ${mouse.y * 20}px)` }}
      />
    </div>
  )
}

export default App
