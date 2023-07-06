import React, { useState, useEffect } from 'react';
import axios from 'axios';
//ok
const Capitulos = () => {
  const [capitulos, setCapitulos] = useState([]);
  const [capitulo, setCapitulo] = useState({
    capitulo: '',
    titulo_anime: '',
    paginas: '',
    manga_id: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  const fetchCapitulos = async () => {
    const response = await axios.get('http://localhost:3001/capitulo');
    setCapitulos(response.data);
  };

  useEffect(() => {
    fetchCapitulos();
  }, []);

  const handleChange = (e) => {
    setCapitulo({ ...capitulo, [e.target.capitulo]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/capitulo/${editId}`, capitulo);
        setEditMode(false);
        setEditId('');
      } else {
        await axios.post('http://localhost:3001/capitulo', capitulo);
      }
      fetchCapitulos();
      setCapitulo({ capitulo: '', titulo_anime: '', paginas: '', manga_id: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, capitulo, titulo_anime, paginas, manga_id) => {
    setEditMode(true);
    setEditId(id);
    setCapitulo({ capitulo, titulo_anime, paginas, manga_id });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/capitulo/${id}`);
      fetchCapitulos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Capítulos</h1>
      <form onSubmit={handleSubmit}>
        <label>Título do Capítulo</label>
        <input
          type="text"
          name="tituloCapitulo"
          value={capitulo.capitulo}
          onChange={handleChange}
        />
        <label>Titulo do anime</label>
        <input
          type="text"
          name="animeTitle"
          value={capitulo.titulo_anime}
          onChange={handleChange}
        />
        <label>paginas</label>
        <input
          className='inputPaginas'
          type="text"
          name="inputPagina"
          value={capitulo.paginas}
          onChange={handleChange}
          />
          <label>manga_id</label>
        <input
          className='inputId'
          type="integer"
          name="Id_manga"
          value={capitulo.manga_id}
          onChange={handleChange}
          />
        <button type="submit">
          {editMode ? 'Atualizar Capítulo' : 'Adicionar Capítulo'}
        </button>
      </form>
      <ul>
        {capitulos.map((capitulo) => (
          <li key={capitulo.id}>
            <h3>{capitulo.capitulo}</h3>
            <p>Titulo do anime: {capitulo.titulo_anime}</p>
            <img className="Capitulo" src={capitulo.paginas} alt={capitulo.paginas} />
            <p>id_manga: {capitulo.manga_id}</p>
            
            <button onClick={() => handleEdit(capitulo.id, capitulo.capitulo, capitulo.titulo_anime, capitulo.paginas, capitulo.manga_id)}>
              Editar
            </button>
            <button onClick={() => handleDelete(capitulo.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Capitulos;
