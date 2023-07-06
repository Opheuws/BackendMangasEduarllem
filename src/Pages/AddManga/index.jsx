import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
//ok
const AddManga = () => {
  const [mangas, setMangas] = useState([]);
  const [manga, setManga] = useState({
    titulo: '',
    imagem: '',
    autor: '',
    genero: '',
  });
  

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  const fetchMangas = async () => {
    const response = await axios.get('http://localhost:3001/mangas');
    setMangas(response.data);
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  const handleChange = (e) => {
    setManga({ ...manga, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/mangas/${editId}`, manga);
        setEditMode(false);
        setEditId('');
      } else {
        await axios.post('http://localhost:3001/mangas', manga);
      }
      fetchMangas();
      setMangas({ titulo: '', imagem: '', autor: '', genero: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, titulo, imagem, autor, genero) => {
    setEditMode(true);
    setEditId(id);
    setMangas({ titulo, imagem, autor, genero });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/mangas/${id}`);
      fetchMangas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Manga</h1>
      <form onSubmit={handleSubmit}>
        <label className='titulo'>Título</label>
        <input
          className='inputTitulo'
          type="text"
          name="titulo"
          value={manga.titulo}
          onChange={handleChange}
        />
        <label className='imagem'>Imagem</label>
        <input
          className='inputImagem'
          type="text"
          name="imagem"
          value={manga.imagem}
          onChange={handleChange}
          />
        <label className='autor'>Autor</label>
        <input
          className='inputAutor'
          type="text"
          name="autor"
          value={manga.autor}
          onChange={handleChange}
        />
        <label className='genero'>Gênero</label>
        <input
          className='inputGenero'
          type="text"
          name="genero"
          value={manga.genero}
          onChange={handleChange}
        />
       
        <button type="submit">
          {editMode ? 'Atualizar Manga' : 'Adicionar Manga'}
        </button>
      </form>
      <ul>
        {mangas.map((manga) => (
          <li key={manga.id}>
            <h3>{manga.titulo}</h3>
            <img className="imgCapa" src={manga.imagem} alt={manga.titulo} />
            <p>Autor: {manga.autor}</p>
            <p>Genero: {manga.genero}</p>
         
            <br></br>
            <button onClick={() => handleEdit(manga.id, manga.titulo, manga.imagem, manga.autor, manga.genero)}>
              Editar
            </button>
            <button onClick={() => handleDelete(manga.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddManga;
