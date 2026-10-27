import type { MoradorEntrada } from "@/types/morador";

const texto = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// Valida o corpo de POST/PUT de casas.
export function lerCasa(
  body: unknown,
): { erro: string } | { numero: string; moradores: MoradorEntrada[] } {
  const b = body as { numero?: unknown; moradores?: unknown } | null;
  const numero = texto(b?.numero);
  if (!numero) return { erro: "Informe o número da casa." };

  const lista: unknown[] = Array.isArray(b?.moradores) ? b.moradores : [];
  const moradores: MoradorEntrada[] = [];
  for (const item of lista) {
    const m = item as Partial<Record<keyof MoradorEntrada, unknown>> | null;
    const nome = texto(m?.nome);
    if (!nome) return { erro: "Todo morador precisa de nome." };
    moradores.push({
      id: typeof m?.id === "number" ? m.id : undefined,
      nome,
      telefone: texto(m?.telefone),
      email: texto(m?.email),
    });
  }
  return { numero, moradores };
}
