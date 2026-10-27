import { casas, moradores, type Morador } from "@/lib/dados";
import { lerCasa } from "@/lib/casas";

export async function GET() {
  return Response.json(casas);
}

export async function POST(request: Request) {
  const dados = lerCasa(await request.json().catch(() => null));
  if ("erro" in dados) return Response.json({ erro: dados.erro }, { status: 400 });
  if (casas.some((c) => c.numero === dados.numero)) {
    return Response.json({ erro: "Já existe uma casa com esse número." }, { status: 409 });
  }

  let proximoId = Math.max(0, ...moradores.map((m) => m.id)) + 1;
  const novos: Morador[] = dados.moradores.map((m) => ({
    id: proximoId++,
    nome: m.nome,
    telefone: m.telefone,
    email: m.email,
    contas: [],
  }));

  const casa = {
    id: Math.max(0, ...casas.map((c) => c.id)) + 1,
    numero: dados.numero,
    moradores: novos,
  };
  casas.push(casa);
  moradores.push(...novos);
  return Response.json(casa, { status: 201 });
}
