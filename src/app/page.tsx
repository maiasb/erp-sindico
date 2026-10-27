"use client";

import { useEffect, useState } from "react";
import type { Casa } from "@/lib/dados";
import styles from "./page.module.css";

export default function Dashboard() {
  const [casas, setCasas] = useState<Casa[] | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch("/api/casas")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setCasas)
      .catch(() => setErro(true));
  }, []);

  if (erro) return <p role="alert">Não foi possível carregar o dashboard.</p>;
  if (!casas) return <p>Carregando...</p>;

  const totalMoradores = casas.reduce((soma, c) => soma + c.moradores.length, 0);

  return (
    <main className={styles.main}>
      <h1>Dashboard</h1>
      <div className={styles.cards}>
        <section className={styles.card}>
          <p>Total de casas</p>
          <strong>{casas.length}</strong>
        </section>
        <section className={styles.card}>
          <p>Total de moradores</p>
          <strong>{totalMoradores}</strong>
        </section>
        {casas.map((c) => (
          <section key={c.id} className={styles.card}>
            <p>Moradores na casa {c.numero}</p>
            <strong>{c.moradores.length}</strong>
          </section>
        ))}
      </div>
    </main>
  );
}
