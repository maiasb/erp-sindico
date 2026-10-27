"use client";

import { useEffect, useState } from "react";
import type { ContaDetalhada } from "@/types/conta";
import { data, moeda } from "@/lib/formato";
import styles from "../moradores/page.module.css";

export default function ContasPage() {
  const [contas, setContas] = useState<ContaDetalhada[] | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch("/api/contas")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setContas)
      .catch(() => setErro(true));
  }, []);

  return (
    <main className={styles.main}>
      <h1>Contas</h1>
      {erro && <p role="alert">Não foi possível carregar as contas.</p>}
      {!erro && !contas && <p>Carregando...</p>}
      {contas?.length === 0 && <p>Nenhuma conta cadastrada.</p>}
      {contas && contas.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Conta</th>
              <th>Casa</th>
              <th>Valor</th>
              <th>Início</th>
              <th>Fim</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.casa.numero}</td>
                <td>{moeda(c.valor)}</td>
                <td>{data(c.data_inicio)}</td>
                <td>{data(c.data_fim)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
