import React from "react";
import { motion } from "motion/react";

export default function MovieCard({ movie, liked, onToggle }) {
  return (
    <motion.article className="movie" whileHover={{ y: -4 }}>
      <div className="picture" aria-hidden="true">
        {movie.icon}
      </div>
      <p className="small mt-3 mb-0">
        {movie.category} · {movie.duration}
      </p>
      <h2>{movie.title}</h2>
      <p className="description">{movie.description}</p>
      <p>
        Год выхода: <strong>{movie.year}</strong>
      </p>

      <button
        className="btn btn-outline-success"
        type="button"
        aria-pressed={liked}
        onClick={() => onToggle(movie.id)}
      >
        {liked ? "В моём списке ♥" : "Смотреть позже ♡"}
      </button>
    </motion.article>
  );
}
