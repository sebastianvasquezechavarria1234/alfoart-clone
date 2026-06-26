import bg1 from './assets/background-1.jpg'
import bg2 from './assets/background-2.webp'
import frontScene from './assets/front-scene.webp'

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img src={bg1} alt="background-1" className="absolute inset-0 w-full h-full object-cover" />
      <img src={bg2} alt="background-2" className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[190%] " />
      <img src={frontScene} alt="background-2" className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[190%] " />
      
    </div>
  )
}

export default App
