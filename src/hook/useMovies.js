import { useEffect, useState } from "react";

export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
const response = await fetch('movies.json');


    async function load() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}movies.json`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Не удалось загрузить фильмы.");
        const data = await response.json();
        if (
          !Array.isArray(data) ||
          !data.every(
            (item) =>
              item &&
              Number.isInteger(item.id) &&
              typeof item.title === "string" &&
              typeof item.category === "string" &&
              typeof item.description === "string" &&
              typeof item.duration === "string" &&
              typeof item.icon === "string" &&
              typeof item.year === "number",
          )
        ) {
          throw new Error("Проверьте формат movies.json.");
        }
        if (!controller.signal.aborted) setMovies(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [attempt]);

  return {
    movies,
    loading,
    error,
    retry: () => setAttempt((value) => value + 1),
  };
}
