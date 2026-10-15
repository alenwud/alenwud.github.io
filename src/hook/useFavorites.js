import { useEffect, useState } from "react";

const STORAGE_KEY = "movie-watchlist-v1";

function readFavorites() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
      return [];
    }
    const saved = JSON.parse(savedData);
    if (Array.isArray(saved)) {
      return saved.filter((id) => Number.isInteger(id));
    }
    return [];
  } catch {
    return [];
  }
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      setStorageError("");
    } catch {
      setStorageError(
        "Браузер запретил сохранение. Список работает до закрытия страницы.",
      );
    }
  }, [favorites]);

  function toggle(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return { favorites, toggle, storageError };
}
