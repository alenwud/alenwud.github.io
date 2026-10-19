import React from "react";

export default function UnicProp({ advantages = [], id }) {
  return (
    <section className="why-section" id={id}>
      <hr className="neon-line-blue" />
      <h2 className="why-section-title">
        <span>
          ПОЧЕМУ NEO-BITE ? <span className="pink-slashes">///</span>
        </span>
        <span className="UP-subtitle-text">
          мы сочетаем технологии, вкус и скорость
        </span>
      </h2>
      <hr className="neon-line-blue" />
      {/* Сетка преимуществ */}
      <div className="advantages-grid">
        {advantages.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="advantage-card">
              <div className="adv-icon-wrapper">
                <img src={item.icon} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>

            {/* Вертикальный разделитель между преимуществами */}
            {idx < advantages.length - 1 && (
              <div className="adv-separator"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
