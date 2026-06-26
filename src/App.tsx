import bg1 from './assets/background-1.jpg'
import bg2 from './assets/background-2.webp'
import frontScene from './assets/front-scene.webp'
import cloud4 from './assets/cloud-4.webp'
import petal from './assets/petal.webp'

const petals = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 6) + 2,
  top: Math.floor(Math.random() * 20) + 50,
  duration: Math.floor(Math.random() * 5) + 6,
  delay: Math.random() * 8,
  xDrift: Math.floor(Math.random() * 40) + 160,
}))

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img src={bg1} alt="background-1" className="absolute inset-0 w-full h-full object-cover" />
      <img src={bg2} alt="background-2" className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[190%] " />
      {/* <img src={cloud1} alt="cloud-1" className="absolute top-0 left-0 w-full" />
      <img src={cloud2} alt="cloud-2" className="absolute top-0 left-0 w-full" />
      <img src={cloud3} alt="cloud-3" className="absolute top-0 left-0 w-full" /> */}
      <img src={cloud4} alt="cloud-4" className="absolute top-0 left-0 w-full w-[30]" />
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
      <img src={frontScene} alt="front-scene" className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[190%] " />
    </div>
  )
}

export default App
