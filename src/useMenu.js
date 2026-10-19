import { useEffect, useState } from "react";

export default function useMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    async function load() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}menu.json`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Не удалось загрузить меню.");
        const data = await response.json();
        if (!controller.signal.aborted) setMenuItems(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { menuItems, loading, error };
}
