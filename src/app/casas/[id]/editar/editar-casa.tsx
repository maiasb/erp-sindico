"use client";

import { useEffect, useState } from "react";
import type { Casa } from "@/types/casa";
import CasaForm from "../../casa-form";

export default function EditarCasa({ id }: { id: string }) {
  const [casa, setCasa] = useState<Casa | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch(`/api/casas/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setCasa)
      .catch(() => setErro(true));
  }, [id]);

  if (erro) return <p role="alert">Casa não encontrada.</p>;
  if (!casa) return <p>Carregando...</p>;
  return <CasaForm titulo={`Editar casa ${casa.numero}`} url={`/api/casas/${id}`} metodo="PUT" inicial={casa} />;
}
