"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Casa } from "@/types/casa";
import type { MoradorEntrada } from "@/types/morador";
import styles from "../moradores/page.module.css";

const vazio: MoradorEntrada = { nome: "", telefone: "", email: "" };

type Props = {
  titulo: string;
  url: string;
  metodo: "POST" | "PUT";
  inicial?: Casa;
};

export default function CasaForm({ titulo, url, metodo, inicial }: Props) {
  const router = useRouter();
  const [numero, setNumero] = useState(inicial?.numero ?? "");
  const [moradores, setMoradores] = useState<MoradorEntrada[]>(
    inicial?.moradores.map(({ id, nome, telefone, email }) => ({ id, nome, telefone, email })) ?? [],
  );
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    const res = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numero, moradores }),
    }).catch(() => null);

    if (res?.ok) {
      router.push("/casas");
      return;
    }
    const corpo = await res?.json().catch(() => null);
    setErro(corpo?.erro ?? "Não foi possível salvar a casa.");
    setEnviando(false);
  }

  function alterar(i: number, campo: keyof MoradorEntrada, valor: string) {
    setMoradores((atual) => atual.map((m, j) => (j === i ? { ...m, [campo]: valor } : m)));
  }

  return (
    <main className={styles.main}>
      <h1>{titulo}</h1>
      <form onSubmit={enviar} className={styles.card}>
        <label>
          Número da casa{" "}
          <input value={numero} onChange={(e) => setNumero(e.target.value)} required />
        </label>
        <h2>Moradores</h2>
        {moradores.map((m, i) => (
          <p key={m.id ?? `novo-${i}`}>
            <input
              placeholder="Nome"
              value={m.nome}
              onChange={(e) => alterar(i, "nome", e.target.value)}
              required
            />{" "}
            <input
              placeholder="Telefone"
              value={m.telefone}
              onChange={(e) => alterar(i, "telefone", e.target.value)}
            />{" "}
            <input
              type="email"
              placeholder="E-mail"
              value={m.email}
              onChange={(e) => alterar(i, "email", e.target.value)}
            />{" "}
            <button type="button" onClick={() => setMoradores((a) => a.filter((_, j) => j !== i))}>
              Remover
            </button>
          </p>
        ))}
        <p>
          <button type="button" onClick={() => setMoradores((a) => [...a, vazio])}>
            Adicionar morador
          </button>
        </p>
        <button type="submit" disabled={enviando}>
          {enviando ? "Salvando..." : "Salvar"}
        </button>
        {erro && <p role="alert">{erro}</p>}
      </form>
    </main>
  );
}
