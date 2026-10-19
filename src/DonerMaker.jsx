import React, { useState } from "react";

export default function DonerMaker({ makerData, id, onAddToCart }) {
  if (!makerData) return null;

  const { lavaColors, boosters, additional, basePrice } = makerData;

  const [selectedLava, setSelectedLava] = useState("default");
  const [selectedBoosters, setSelectedBoosters] = useState([]);
  const [selectedAdditionals, setSelectedAdditionals] = useState([]);

  // НОВОЕ СОСТОЯНИЕ: для управления нашей кастомной плашкой
  const [showToast, setShowToast] = useState(false);

  const donerImages = {
    default: "/img/default-doner.png",
    neon: "/img/doner-neon.png",
    uranium: "/img/doner-uranium.png",
    dark: "/img/doner-dark.png",
  };

  const handleBoosterChange = (id) => {
    if (selectedBoosters.includes(id)) {
      setSelectedBoosters(selectedBoosters.filter((item) => item !== id));
    } else {
      setSelectedBoosters([...selectedBoosters, id]);
    }
  };

  const handleAdditionalChange = (id) => {
    if (selectedAdditionals.includes(id)) {
      setSelectedAdditionals(selectedAdditionals.filter((item) => item !== id));
    } else {
      setSelectedAdditionals([...selectedAdditionals, id]);
    }
  };

  const totalPrice = boosters.reduce((sum, booster) => {
    if (selectedBoosters.includes(booster.id)) {
      return sum + booster.price;
    }
    return sum;
  }, basePrice);

  // НОВАЯ ФУНКЦИЯ: вместо alert() запускает красивую плашку и гасит её через 3 секунды
  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <section className="maker-section" id={id}>
      <hr className="neon-line-blue" />

      <h2 className="why-section-title" style={{ color: "var(--neon-green)" }}>
        <span>
          СОЗДАЙ СВОЙ NEO-DONER <span className="pink-slashes">///</span>
        </span>
      </h2>

      <div className="maker-container">
        <div className="maker-preview-box">
          <img
            src="/vector-elements/border-doner.svg"
            alt=""
            className="frame-svg"
          />
          <img
            src={donerImages[selectedLava] || donerImages.default}
            alt="Твой кастомный донер"
            className="dynamic-doner-img"
          />
        </div>

        <div className="maker-form-box">
          <img
            src="/vector-elements/maker-border.svg"
            alt=""
            className="form-frame-svg"
          />

          <div className="form-content">
            <div className="form-header-row">
              <div className="options-group-title">
                .цвет лаваша <span className="yellow-skobka">&#123;</span>
              </div>
              <span className="maker-price">{totalPrice} ₽</span>
            </div>
            <div className="color-options">
              {lavaColors.map((lava) => (
                <label
                  key={lava.id}
                  className={`color-btn ${selectedLava === lava.id ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="lava-color"
                    checked={selectedLava === lava.id}
                    onChange={() => setSelectedLava(lava.id)}
                  />
                  <span
                    className="dot"
                    style={{ backgroundColor: lava.colorCode }}
                  ></span>
                  <span className="lava-text">
                    {lava.name} <small>{lava.sub}</small>
                  </span>
                </label>
              ))}
            </div>
            <div className="options-group-title">
              добавь Neo-booster <span className="yellow-skobka">&#123;</span>
            </div>
            <div className="boosters-options">
              {boosters.map((booster) => (
                <label
                  key={booster.id}
                  className={`check-btn ${selectedBoosters.includes(booster.id) ? "checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedBoosters.includes(booster.id)}
                    onChange={() => handleBoosterChange(booster.id)}
                  />
                  <span className="check-box-custom"></span>
                  <span className="booster-name">{booster.name}</span>
                  <span className="booster-price">+{booster.price}₽</span>
                </label>
              ))}
            </div>
            <div className="options-group-title">
              дополнительно <span className="yellow-skobka">&#123;</span>
            </div>
            <div className="additional-options">
              {additional.map((add) => (
                <label
                  key={add.id}
                  className={`check-btn ${selectedAdditionals.includes(add.id) ? "checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAdditionals.includes(add.id)}
                    onChange={() => handleAdditionalChange(add.id)}
                  />
                  <span className="check-box-custom"></span>
                  <span className="additional-name">{add.name}</span>
                </label>
              ))}
            </div>
            <div className="form-footer-action">
              <button
                type="button"
                className="btn-maker-cart"
                onClick={() => onAddToCart(totalPrice)} // Вызовет глобальный тост с ценой кастомной шаурмы!
              >
                <img src="/vector-elements/cart.svg" alt="В корзину" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* КИБЕР-ПЛАШКА УВЕДОМЛЕНИЯ */}
      <div className={`cyber-toast ${showToast ? "visible" : ""}`}>
        <div className="toast-glow-line"></div>
        <div className="toast-text-row">
          <span className="toast-status">[ SUCCESS ]</span>
          <p>
            NEO-DONER добавлен в корзину! цена: <span>{totalPrice} ₽</span>
          </p>
        </div>
      </div>
    </section>
  );
}
