import React, { useEffect, useState } from 'react';
import './index.scss';
import { Collection } from './Collection';

const cats = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function App() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : ''; 
    
    fetch(
      `https://6431bc2ad4518cfb0e682d83.mockapi.io/photo_collections?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);
  console.log(categoryId);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идёт загрузка...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
            )
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
