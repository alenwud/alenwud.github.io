import React, { useState } from "react";

export default function RequestForm() {
  // Исправлено имя компонента (Form вместо From)
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="request" aria-labelledby="request-title">
      {" "}
      {/* Исправлено: className вместо classNmae */}
      <h2 id="request-title">Анонсы киновечеров</h2>
      <p>Обязательно сохраним ваш адрес и будем присылать спам.</p>
      {submitted ? (
        <div role="status">
          <p>Формочка. Подписку не оформим. Введенный адрес: {email}</p>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => {
              setSubmitted(false);
              setEmail("");
            }}
          >
            Заполнить еще раз
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Электронная почта</label>
          <input
            id="email"
            className="form-control"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button className="btn btn-success" type="submit">
            Проверить форму
          </button>
        </form>
      )}
    </section>
  );
}
