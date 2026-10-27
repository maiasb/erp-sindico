import type { NextRequest } from "next/server";
import { casas, moradores, type Morador } from "@/lib/dados";
import { lerCasa } from "@/lib/casas";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/casas/[id]">) {
  const { id } = await ctx.params;
  const casa = casas.find((c) => c.id === Number(id));
  if (!casa) return Response.json({ erro: "Casa não encontrada." }, { status: 404 });
  return Response.json(casa);
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/casas/[id]">) {
  const { id } = await ctx.params;
  const casa = casas.find((c) => c.id === Number(id));
  if (!casa) return Response.json({ erro: "Casa não encontrada." }, { status: 404 });

  const dados = lerCasa(await request.json().catch(() => null));
  if ("erro" in dados) return Response.json({ erro: dados.erro }, { status: 400 });
  if (casas.some((c) => c.id !== casa.id && c.numero === dados.numero)) {
    return Response.json({ erro: "Já existe uma casa com esse número." }, { status: 409 });
  }

  let proximoId = Math.max(0, ...moradores.map((m) => m.id)) + 1;
  const atualizados: Morador[] = dados.moradores.map((m) => {
    // Morador já da casa: atualiza no lugar e preserva as contas.
    const existente = casa.moradores.find((x) => x.id === m.id);
    if (existente) {
      Object.assign(existente, { nome: m.nome, telefone: m.telefone, email: m.email });
      return existente;
    }
    const novo = { id: proximoId++, nome: m.nome, telefone: m.telefone, email: m.email, contas: [] };
    moradores.push(novo);
    return novo;
  });

  // Moradores removidos da casa saem também da lista geral.
  for (const antigo of casa.moradores) {
    if (!atualizados.includes(antigo)) moradores.splice(moradores.indexOf(antigo), 1);
  }

  casa.numero = dados.numero;
  casa.moradores = atualizados;
  return Response.json(casa);
}
