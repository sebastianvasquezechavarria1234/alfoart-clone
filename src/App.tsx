import { useState, useRef, useEffect, type MouseEvent } from 'react'
import bg1 from './assets/background-1.jpg'
import bg2 from './assets/background-2.webp'
import frontScene from './assets/front-scene.webp'
import cloud4 from './assets/cloud-4.webp'
import cloud3 from './assets/cloud-3.webp'
import cloud1 from './assets/cloud-1.webp'
import cloud2 from './assets/cloud-2.webp'
import petal from './assets/petal.webp'
import buildingInterior from './assets/building-interior.jpg'
import dancingPeople from './assets/dancing-people.webp'
import audioSrc from './assets/audio.mp3'
import fogContent2 from './assets/fog-content2.webp'
import fog5 from './assets/fog-5.webp'
import moon from './assets/moon.png'

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
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 800)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth <= 800)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const fadeDuration = 2000
    const steps = 20
    const interval = fadeDuration / steps

    const fadeOut = (cb?: () => void) => {
      let vol = audio.volume
      const step = vol / steps
      const id = setInterval(() => {
        vol = Math.max(0, vol - step)
        audio.volume = vol
        if (vol <= 0) {
          clearInterval(id)
          cb?.()
        }
      }, interval)
    }

    const fadeIn = (target = 1) => {
      audio.volume = 0
      audio.play()
      let vol = 0
      const step = target / steps
      const id = setInterval(() => {
        vol = Math.min(target, vol + step)
        audio.volume = vol
        if (vol >= target) clearInterval(id)
      }, interval)
    }

    audio.addEventListener('ended', () => {
      fadeOut(() => {
        audio.currentTime = 0
        fadeIn()
      })
    })

    fadeIn()
  }, [])

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
      <audio ref={audioRef} src={audioSrc} />
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={bg1}
          alt="background-1"
          className="w-full h-full object-cover blur-[2px] transition-transform duration-300 ease-out translate-y-[-20%]"
          style={{ transform: isSmall ? 'scale(1.1)' : `scale(1.1) translate(${-mouse.x * 18}px, ${mouse.y * 15}px)` }}
        />
      </div>

      <div className="absolute w-full bottom-0 left-1/2 -translate-x-1/2 w-[190%] max-[800px]:w-[250%]">
        <img
          src={bg2}
          alt="background-2"
          className="w-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(1.2) translate(${-mouse.x * 30}px, ${mouse.y * 24}px)` }}
        />
      </div>

      <div
        className="transition-transform duration-300 ease-out absolute inset-0 max-[800px]:w-[250%]"
        style={{ transform: `translate(${-mouse.x * 13}px, ${mouse.y * 12}px)` }}
      >
        <img src={moon} alt="moon" className="absolute top-[7%] max-[800px]:top-[2%] left-[17%] max-[800px]:left-[1%] w-[120px] " />
      </div>

      <img src={cloud4} alt="cloud-4" className="absolute top-[-6%] max-[800px]:top-[10%] left-[50%] z-60 w-[23%] max-[800px]:w-[68%] cloud-float" style={{ animationDelay: '-3s' }} />
      <img src={cloud3} alt="cloud-3" className="absolute top-[-15%] right-[-2%] z-60 w-[19%] cloud-float" />
      <img src={cloud1} alt="cloud-1" className="absolute top-[6%] max-[800px]:top-[30%] left-[25%] max-[800px]:left-[-20%] z-60 w-[20%] max-[800px]:w-[65%] cloud-float" style={{ animationDelay: '-3s' }} />
      <img src={cloud2} alt="cloud-2" className="absolute top-[-10%] left-[-100px] z-60 w-[18%] cloud-float" />

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


      <div className="absolute w-full bottom-0 left-1/2 -translate-x-1/2 w-[190%] max-[800px]:w-[200%] ">
        <div
          className="transition-transform duration-300 ease-out "
          style={{ transform: `translate(${-mouse.x * 80}px, ${mouse.y * 45}px)` }}
        >
          <img
            src={frontScene}
            alt="front-scene"
            className="w-full scale-[1.3] max-[800px]:scale-[1.8] z-50"
          />
          <img
            src={buildingInterior}
            alt="front-scene"
            className="w-[45%] absolute -z-20 top-[48%] left-1/2 -translate-x-1/2"
          />
          <img
            src={dancingPeople}
            alt="dancing-people"
            className="w-[30%] absolute -z-10 top-[56%] left-1/2 dancing"
          />
        </div>
      </div>

      <div className="relative w-full max-[800px]:w-[250%] h-screen overflow-hidden">
        <div
          className="w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `translate(${-mouse.x * 60}px, ${mouse.y * 60}px)` }}
        >
          <img src={fogContent2} alt="fog-content2" className="absolute bottom-[-10%] w-full fog-slide-reverse opacity-50" />
          <img src={fog5} alt="fog-5" className="absolute bottom-0 w-full fog-slide opacity-50" />
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-50 font-['Petit_Formal_Script']">
        <a href="#" className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors">
          Creado por Sebastian Vasquez
        </a>
        <a href="#" className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors">
          Codigo fuente
        </a>
      </div>
    </div>
  )
}

export default App
