import { useState } from "react";
import axios from "axios";
import './index.css'

function ListItem({ titulo, id, imagem, autor, genero }) {

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/mangas/${id}`);
    const response = await axios.get('http://localhost:3001/mangas');
    setMangaList(response.data)
  }

  return (
    <>
      <li key={id}>
        <span>{titulo} - {genero} - {autor}</span>
        <br />
        <img className="imgManga" src= {imagem}/>
        <br />
        {/* <button type="button" onClick={handleDelete}>Deletar</button> */}
     
      </li>
    </>
  )
}

export default ListItem;
