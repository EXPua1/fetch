import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";
import { Container, GalleryList, Section, SearchForm } from "./components";
import { fetchImages } from "./services/pix-abay-api";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setQuery(searchQuery);
    setPage(1);

    try {
      const result = await fetchImages(searchQuery, 1); // Запрос для первой страницы
      setData(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const result = await fetchImages(query, nextPage);

      // Проверка на уникальность изображений по их `id`
      const uniqueResults = result.filter(
        (newItem) =>
          !data.some((existingItem) => existingItem.id === newItem.id)
      );

      setData((prevData) => [...prevData, ...uniqueResults]); // Добавляем только уникальные данные
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <Container>
        <SearchForm onSearch={handleSearch} />

        {loading && <h2>Loading...</h2>}

        <GalleryList data={data} />

        {/* Кнопка "Load More" */}
        {data.length > 0 && !loading && (
          <button onClick={handleLoadMore}>Load More</button>
        )}
      </Container>
    </Section>
  );
};

export default App;
