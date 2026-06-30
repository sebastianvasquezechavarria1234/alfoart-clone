import { useState, type MouseEvent } from 'react'
import bg1 from './assets/background-1.jpg'
import bg2 from './assets/background-2.webp'
import frontScene from './assets/front-scene.webp'
import cloud4 from './assets/cloud-4.webp'
import petal from './assets/petal.webp'
import buildingInterior from './assets/building-interior.jpg'
import dancingPeople from './assets/dancing-people.webp'

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
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={bg1}
          alt="background-1"
          className="w-full h-full object-cover blur-[2px] transition-transform duration-300 ease-out translate-y-[-20%]"
          style={{ transform: `scale(1.1) translate(${-mouse.x * 20}px, ${mouse.y * 20}px)` }}
        />
      </div>

      <div className="absolute w-full bottom-0 left-1/2 -translate-x-1/2 w-[190%]">
        <img
          src={bg2}
          alt="background-2"
          className="w-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(1.2) translate(${-mouse.x * 50}px, ${mouse.y * 30}px)` }}
        />
      </div>

      <img src={cloud4} alt="cloud-4" className="absolute top-0 left-0 z-60 w-[400px]" />

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


      <div className="absolute w-full bottom-0 left-1/2 -translate-x-1/2 w-[190%]">
        <div
          className="transition-transform duration-300 ease-out bg-red-600"
          style={{ transform: `translate(${-mouse.x * 80}px, ${mouse.y * 40}px)` }}
        >
          <img
            src={frontScene}
            alt="front-scene"
            className="w-full scale-[1.3] z-50"
          />
          <img
            src={buildingInterior}
            alt="front-scene"
            className="w-[45%] absolute -z-20 top-[48%] left-1/2 -translate-x-1/2"
          />
          <img
            src={dancingPeople}
            alt="dancing-people"
            className="w-[35%] absolute -z-10 top-[48%] left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </div>
  )
}

export default App
