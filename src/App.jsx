import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Manga from './Pages/mangas'
import AddManga from './Pages/AddManga'
import AddCapitulos from './Pages/AddCapitulos'
import Header from './components/Header'
// import Livros from './Pages/Livros'
import './App.css'


export function App() {
  return (
      <>
      <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/mangas" element={<Manga/>}/>
      <Route path="/mangas/add" element={<AddManga/>}/>
      <Route path="/capitulos/add" element={<AddCapitulos/>}/>     
      <Route path= '/*'element = {<Home/>}/>
    </Routes>
    </>
  )
}

export default App