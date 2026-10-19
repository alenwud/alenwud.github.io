import React, { useState } from "react";

export default function MenuCard({ item, onAddToCart }) {
  const [inCart, setInCart] = useState(false);

  const handleCartClick = () => {
    // Меняем состояние кнопки (выделение зеленым цветом)
    setInCart(!inCart);

    // Если мы добавляем в корзину (а не убираем), запускаем вылетающую плашку
    if (!inCart && onAddToCart) {
      onAddToCart(item.price);
    }
  };

  return (
    <article className="menu-card">
      {item.badge && (
        <div className={`card-badge ${item.badgeType || ""}`}>{item.badge}</div>
      )}

      <div className="card-image-container">
        {item.image ? (
          <img src={item.image} alt={item.title} className="card-img" />
        ) : (
          <div className="card-placeholder">{item.icon || "🍔"}</div>
        )}
      </div>

      <p className="card-category">{item.category}</p>
      <h3 className="card-title">
        [ <span>{item.title}</span> ]
      </h3>
      <p className="card-description">{item.description}</p>

      <div className="card-footer-row">
        <span className="card-price">{item.price} ₽</span>

        {/* Кнопка корзины в меню */}
        <button
          type="button"
          className={`btn-cart ${inCart ? "added" : ""}`}
          onClick={handleCartClick}
          aria-label={inCart ? "Удалить из корзины" : "Добавить в корзину"}
        >
          {inCart ? (
            <span
              className="pink-slashes"
              style={{
                fontSize: "14px",
                fontWeight: "900",
                color: "var(--bg)",
              }}
            >
              ///
            </span>
          ) : (
            /* Исходный вектор корзинки */
            <img
              src="/vector-elements/cart.svg"
              alt="В корзину"
              style={{ width: "20px", height: "auto" }}
            />
          )}
        </button>
      </div>
    </article>
  );
}
