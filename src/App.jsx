import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";
import { Container, Section, ArticleList, SearchForm } from "./components";

import { fetchArticlesWithTopic } from "./services/api";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (topic) => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      console.log(data);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <Container>
        <div>
          <SearchForm onSearch={handleSearch} />
          {loading && <p>Loading</p>}
          {error && <Error />}
          {articles.length > 0 && <ArticleList items={articles} />}
        </div>
      </Container>
    </Section>
  );
};

export default App;
