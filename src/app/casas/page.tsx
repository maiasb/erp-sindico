"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Casa } from "@/lib/dados";
import styles from "../moradores/page.module.css";

export default function CasasPage() {
  const [casas, setCasas] = useState<Casa[] | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch("/api/casas")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setCasas)
      .catch(() => setErro(true));
  }, []);

  return (
    <main className={styles.main}>
      <h1>Casas</h1>
      <Link href="/casas/nova">Nova casa</Link>
      {erro && <p role="alert">Não foi possível carregar as casas.</p>}
      {!erro && !casas && <p>Carregando...</p>}
      {casas?.map((c) => (
        <section key={c.id} className={styles.card}>
          <h2>Casa {c.numero}</h2>
          <Link href={`/casas/${c.id}/editar`}>Editar</Link>
          {c.moradores.length === 0 ? (
            <p>Sem moradores.</p>
          ) : (
            <ul>
              {c.moradores.map((m) => (
                <li key={m.id}>
                  {m.nome} · {m.telefone} · {m.email}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  );
}
