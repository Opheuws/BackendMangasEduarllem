import { useState, useEffect } from 'react';
import ListItem from '../../components/ListItem';
import Loading from '../../components/Loading';
import axios from 'axios';
//ok
function Manga() {
  const [MangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/mangas');
        setMangaList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching manga list:', error);
      }
    };
    
    fetchMangaList();
  }, []);

  return (
    <div className="card">
      <h1>Mangas</h1>
      <div className="scrollable-list">
        <ul>
          {loading ? (
            <Loading />
          ) : (
            MangaList.map((manga) => (
              <ListItem
                key={manga.id}
                titulo={manga.titulo}
                imagem={manga.imagem}
                autor={manga.autor}
                genero={manga.genero}
                setMangaList={setMangaList}    
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Manga;
