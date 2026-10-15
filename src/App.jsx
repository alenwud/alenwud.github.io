import React, { useState } from "react";
import MovieCard from "./MovieCard";
import useMovies from "./hook/useMovies";
import useFavorites from "./hook/useFavorites";
import { MotionConfig } from "motion/react";
import RequestFrom from "./RequestForm";

export default function App() {
  const { movies, loading, error, retry } = useMovies();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const { favorites, toggle, storageError } = useFavorites();

  // Логика фильтрации строго по тексту практической работы
  const visible = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(query.trim().toLowerCase()) &&
      (tab === "all" || favorites.includes(movie.id))
    );
  });

  return (
    <main className="app">
      <header className="hero">
        <span className="eyebrow">ВЕЧЕР НАЧИНАЕТСЯ ЗДЕСЬ</span>
        <h1>{import.meta.env.VITE_APP_TITLE || "КиноПолка"}</h1>
        <p>Выберите фильм для уютного вечера и соберите свой список.</p>
      </header>

      {/* Разделы каталога */}
      <nav className="toolbar" aria-label="Разделы каталога">
        <button
          className={
            tab === "all" ? "btn btn-success" : "btn btn-outline-success"
          }
          type="button"
          aria-pressed={tab === "all"}
          onClick={() => setTab("all")}
        >
          Все фильмы
        </button>
        <button
          className={
            tab === "favorites" ? "btn btn-success" : "btn btn-outline-success"
          }
          type="button"
          aria-pressed={tab === "favorites"}
          onClick={() => setTab("favorites")}
        >
          Мой список (
          {movies.filter((item) => favorites.includes(item.id)).length})
        </button>
      </nav>

      <form
        className="toolbar"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="visually-hidden" htmlFor="search">
          Поиск по названию
        </label>
        <input
          id="search"
          className="form-control"
          placeholder="Какой фильм ищем?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={() => setQuery("")}
        >
          Очистить
        </button>
      </form>

      {/* Вывод ошибки строго после формы поиска по ТЗ */}
      {storageError && (
        <p className="alert alert-warning" role="status">
          {storageError}
        </p>
      )}

      {loading && <p role="status">Загружаем фильмы…</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button
            className="btn btn-sm btn-outline-danger ms-2"
            type="button"
            onClick={retry}
          >
            Повторить
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="cards">
          {visible.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              liked={favorites.includes(movie.id)}
              onToggle={toggle}
            />
          ))}
        </div>
      )}

      {!loading && !error && visible.length === 0 && (
        <p className="empty">
          Фильмов не найдено. Измените поиск или добавьте фильм в свой список.
        </p>
      )}
      <RequestFrom />
      <footer>
        Учебный каталог. Фильмы вымышлены, просмотр и отправка данных не
        подключены.
      </footer>
    </main>
  );
  return (
    <MotionConfig reducedMotion="user">
      <main className="app">...</main>
    </MotionConfig>
  );
}
