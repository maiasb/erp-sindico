"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Casa } from "@/types/casa";
import styles from "../../../../moradores/page.module.css";

export default function DetalheMorador({
  casaId,
  moradorId,
}: {
  casaId: string;
  moradorId: string;
}) {
  const [casa, setCasa] = useState<Casa | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch(`/api/casas/${casaId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setCasa)
      .catch(() => setErro(true));
  }, [casaId]);

  const morador = casa?.moradores.find((m) => m.id === Number(moradorId));

  if (erro || (casa && !morador)) return <p role="alert">Morador não encontrado nesta casa.</p>;
  if (!casa || !morador) return <p>Carregando...</p>;

  return (
    <main className={styles.main}>
      <p>
        <Link href="/casas">Casas</Link> / Casa {casa.numero}
      </p>
      <h1>{morador.nome}</h1>
      <p>
        {morador.telefone} · {morador.email}
      </p>
    </main>
  );
}
