"use client";

import { useEffect, useState } from "react";
import type { Morador } from "@/types/morador";
import styles from "./page.module.css";

export default function MoradoresPage() {
  const [moradores, setMoradores] = useState<Morador[] | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch("/api/moradores")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setMoradores)
      .catch(() => setErro(true));
  }, []);

  return (
    <main className={styles.main}>
      <h1>Moradores</h1>
      {erro && <p role="alert">Não foi possível carregar os moradores.</p>}
      {!erro && !moradores && <p>Carregando...</p>}
      {moradores?.map((m) => (
        <section key={m.id} className={styles.card}>
          <h2>{m.nome}</h2>
          <p>
            {m.telefone} · {m.email}
          </p>
        </section>
      ))}
    </main>
  );
}
