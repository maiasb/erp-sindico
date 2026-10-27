"use client";

import { useEffect, useState } from "react";
import type { Morador } from "@/lib/dados";
import styles from "./page.module.css";

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const data = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR");

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
          {m.contas.length === 0 ? (
            <p>Sem contas.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Conta</th>
                  <th>Valor</th>
                  <th>Início</th>
                  <th>Fim</th>
                </tr>
              </thead>
              <tbody>
                {m.contas.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{moeda.format(c.valor)}</td>
                    <td>{data(c.data_inicio)}</td>
                    <td>{data(c.data_fim)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ))}
    </main>
  );
}
