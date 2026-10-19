import React, { useState, useEffect } from "react";
import useMenu from "./useMenu";
import MenuCard from "./MenuCard";
import DonerMaker from "./DonerMaker";
import UnicProp from "./UnicProp";

export default function App() {
  const { menuItems, loading, error } = useMenu();
  const [advantages, setAdvantages] = useState([]);
  const [makerData, setMakerData] = useState(null);

  // ГЛОБАЛЬНЫЕ СТАТУСЫ ДЛЯ ВЫЛЕТАЮЩЕЙ ПЛАШКИ
  const [showToast, setShowToast] = useState(false);
  const [toastPrice, setToastPrice] = useState(0);

  useEffect(() => {
    // 1. Загрузка данных для преимуществ (UnicProp)
    fetch(`${import.meta.env.BASE_URL}advantages.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки преимуществ");
        return res.json();
      })
      .then((data) => setAdvantages(data))
      .catch((err) => console.error(err));

    // 2. Загрузка данных для constructor.json
    fetch(`${import.meta.env.BASE_URL}constructor.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки данных конструктора");
        return res.json();
      })
      .then((data) => setMakerData(data))
      .catch((err) => console.error(err));
  }, []);

  // ФУНКЦИЯ: Запускает плашку с нужной ценой на 3 секунды
  const triggerToast = (price) => {
    setToastPrice(price);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="app-container">
      {/* ШАПКА САЙТА */}
      <header className="header">
        <img
          src="/vector-elements/header-bg.svg"
          alt=""
          className="header-svg-bg"
        />
        <div className="logo-container d-flex align-items-center gap-3">
          <img
            src="/img/bob-01.png"
            alt="NEO-BITE"
            style={{
              width: "146px",
              height: "auto",
              marginRight: "-30px",
              marginTop: "-50px",
            }}
          />
          <img
            src="/vector-elements/descriptor.svg"
            alt="NEO-BITE Логотип"
            style={{ width: "280px", height: "auto" }}
          />
        </div>
        <div className="header-nav">
          <p onClick={() => scrollToSection("menu")}>Меню</p>
          <p onClick={() => scrollToSection("about")}>О нас</p>
          <p onClick={() => scrollToSection("maker")}>Создай!</p>
        </div>
        <div className="header-icons">
          <img
            src="/vector-elements/cart.svg"
            alt="Корзина"
            className="icon-svg-btn icon-cart"
          />
          <img
            src="/vector-elements/separator.svg"
            alt="разделитель"
            className="icon-svg-separator"
          />
          <img
            src="/vector-elements/profile.svg"
            alt="Профиль"
            className="icon-svg-btn icon-profile"
          />
        </div>
      </header>

      {/* ГЛАВНЫЙ БАННЕР */}
      <section className="hero-section">
        <div className="hero-info">
          <h1 className="hero-title">
            <span style={{ color: "#00ddfb", textShadow: "0 0 8px #00ddfb" }}>
              Еда будущего
            </span>
            <br />
            уже в твоем
            <br />
            городе.
          </h1>
          <p className="hero-subtitle">
            Заряди свой движок
            <br />
            чистым топливом.
          </p>
          <button
            type="button"
            className="btn-order"
            onClick={() => scrollToSection("menu")}
          >
            [<span>заказать</span>]
          </button>
        </div>
        <div className="background-image">
          <img src="/img/main-image.jpeg" alt="Neo City" className="bg-city" />
          <img
            src="/img/main-doner.png"
            alt="Flying Doner"
            className="main-doner"
          />
        </div>
      </section>

      {/* БЛОК МЕНЮ */}
      <section className="menu-section" id="menu">
        <hr className="neon-line-blue" />
        <h2 className="menu-section-title">
          <span>
            Наше меню <span className="pink-slashes">///</span>
          </span>
          <span className="UP-title">вкус / технологии / будущее</span>
        </h2>
        <hr className="neon-line-blue" />

        {loading && <p className="text-center">Загружаем еду будущего…</p>}
        {error && <p className="text-danger text-center">Ошибка: {error}</p>}

        {!loading && !error && (
          <div className="menu-grid">
            {menuItems.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={triggerToast} />
            ))}
          </div>
        )}
      </section>

      {/* БЛОК ПРЕИМУЩЕСТВ */}
      <UnicProp advantages={advantages} id="about" />

      {/* БЛОК КОНСТРУКТОР */}
      {makerData && (
        <DonerMaker
          makerData={makerData}
          id="maker"
          onAddToCart={triggerToast}
        />
      )}

      {/* ИСПРАВЛЕНО: Футер теперь лежит внутри блока return, строго на своем законном месте */}
      <footer className="cyber-footer">
        {/* Левая часть: ИСПРАВЛЕНО — вместо текста выводим твой дескриптор из Figma */}
        <div className="footer-logo-block">
          <img
            src="/vector-elements/descriptor-footer.svg"
            alt="NEO-BITE"
            style={{
              width: "180px",
              height: "auto",
            }} /* Компактный размер для подвала */
          />
        </div>

        {/* Центральная часть: слоган */}
        <div className="footer-slogan">.еда будущего — сегодня</div>

        {/* Правая часть: иконки социальных сетей */}
        <div className="footer-socials">
          <a href="#tg">
            <img src="/vector-elements/telega.svg" alt="TG" />
          </a>
          <a href="#vk">
            <img src="/vector-elements/vk.svg" alt="VK" />
          </a>
          <a href="#yt">
            <img src="/vector-elements/youtube.svg" alt="YT" />
          </a>
          <a href="#inst">
            <img src="/vector-elements/insta.svg" alt="Inst" />
          </a>
        </div>
      </footer>

      {/* ГЛУБОКОЕ КАСТОМНОЕ КИБЕР-УВЕДОМЛЕНИЕ */}
      <div className={`cyber-toast ${showToast ? "visible" : ""}`}>
        <div className="toast-glow-line"></div>
        <div className="toast-text-row">
          <span className="toast-status">[ SUCCESS ]</span>
          <p>
            Продукт добавлен в корзину! цена: <span>{toastPrice} ₽</span>
          </p>
        </div>
      </div>
    </div>
  );
}
