import type { Casa } from "@/types/casa";
import type { ContaDetalhada } from "@/types/conta";
import type { Morador } from "@/types/morador";

export const moradores: Morador[] = [
  { id: 1, nome: "Marina Teixeira", telefone: "(91) 98888-0001", email: "marina.teixeira@example.com" },
  { id: 2, nome: "Rafael Monteiro", telefone: "(91) 98888-0002", email: "rafael.monteiro@example.com" },
  { id: 3, nome: "Juliana Barbosa", telefone: "(91) 98888-0003", email: "juliana.barbosa@example.com" },
];

export const casas: Casa[] = [
  {
    id: 1,
    numero: "101",
    moradores: [moradores[0], moradores[1]],
    contas: [
      { id: 101, valor: 450.0, data_inicio: "2026-10-01", data_fim: "2026-10-31" },
      { id: 102, valor: 450.0, data_inicio: "2026-11-01", data_fim: "2026-11-30" },
      { id: 103, valor: 520.5, data_inicio: "2026-10-01", data_fim: "2026-10-31" },
    ],
  },
  { id: 2, numero: "102", moradores: [moradores[2]], contas: [] },
];

export function listarContas(): ContaDetalhada[] {
  return casas.flatMap((c) =>
    c.contas.map((conta) => ({ ...conta, casa: { id: c.id, numero: c.numero } })),
  );
}
