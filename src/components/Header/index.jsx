import { Link } from 'react-router-dom'
import './index.css';

function Header(){
    return (
        <nav className="header-nav">
            <Link to='/'>Home</Link>
            <Link to='/mangas'>Mangas</Link>
            <Link to= '/mangas/add'>Adicionar Mangas</Link>
            <Link to= '/capitulos/add'>Adicionar Capitulo</Link>
        </nav>
    )
}

export default Header;