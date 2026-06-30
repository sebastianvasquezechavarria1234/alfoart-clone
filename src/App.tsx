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
  top: Math.floor(Math.random() * 30) + 40,
  duration: Math.floor(Math.random() * 20) + 8,
  delay: -(Math.random() * 30),
  xDrift: Math.floor(Math.random() * 40) + 200,
}))

function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 800)
  const [loading, setLoading] = useState(true)
  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const images = [bg1, bg2, frontScene, cloud4, cloud3, cloud1, cloud2, petal, buildingInterior, dancingPeople, fogContent2, fog5, moon]
    let count = 0

    images.forEach((src) => {
      const img = new Image()
      img.onload = img.onerror = () => {
        count++
        if (count >= images.length) setLoading(false)
      }
      img.src = src
    })
  }, [])

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth <= 800)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !musicOn) return

    audio.volume = 0
    audio.play().then(() => {
      let vol = 0
      const id = setInterval(() => {
        vol = Math.min(1, vol + 0.02)
        audio.volume = vol
        if (vol >= 1) clearInterval(id)
      }, 60)
    }).catch(() => {})

    const handleEnded = () => {
      audio.currentTime = 0
      audio.volume = 0
      audio.play().then(() => {
        let vol = 0
        const id = setInterval(() => {
          vol = Math.min(1, vol + 0.02)
          audio.volume = vol
          if (vol >= 1) clearInterval(id)
        }, 60)
      }).catch(() => {})
    }

    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [musicOn])

  const toggleMusic = () => setMusicOn(prev => !prev)

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    setMouse({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2,
    })
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-pulse-opacity">
          <span className="font-['Imperial_Script'] text-white text-4xl animate-pulse">Cargando...</span>
        </div>
      )}
    <div
      className={`relative w-full h-screen overflow-hidden ${loading ? 'blur-xl scale-105' : 'animate-unblur'}`}
      onMouseMove={handleMouseMove}
    >
      <audio ref={audioRef} src={audioSrc} preload="auto" />
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
        <span
          key={p.id}
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
        >
          <img
            src={petal}
            alt="petal"
            className="petal-inner"
            style={{
              width: '100%',
              height: '100%',
              animationDuration: `${Math.random() * 2 + 1.5}s`,
            }}
          />
        </span>
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

      <div className="fixed bottom-4 left-0 right-0 flex justify-between items-center px-6 z-50 font-['Imperial_Script'] text-2xl max-[800px]:text-base max-[800px]:whitespace-nowrap">
        <div className="flex gap-4">
          <a href="https://sebas-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-white/70 transition-colors">
            Creado por Sebastian Vasquez
          </a>
          <a href="https://github.com/sebastianvasquezechavarria1234/alfoart-clone" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-white/70 transition-colors">
            Codigo fuente
          </a>
        </div>
        <button onClick={toggleMusic} className="px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/40 hover:bg-white/30 transition-all cursor-pointer animate-pulse-glow">
          {musicOn ? 'Pausar musica' : 'Activar musica'}
        </button>
      </div>
    </div>
    </>
  )
}

export default App
