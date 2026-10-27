export type Conta = {
  id: number;
  valor: number;
  data_inicio: string;
  data_fim: string;
};

export type Morador = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  contas: Conta[];
};

export const moradores: Morador[] = [
  {
    id: 1,
    nome: "Marina Teixeira",
    telefone: "(91) 98888-0001",
    email: "marina.teixeira@example.com",
    contas: [
      { id: 101, valor: 450.0, data_inicio: "2026-10-01", data_fim: "2026-10-31" },
      { id: 102, valor: 450.0, data_inicio: "2026-11-01", data_fim: "2026-11-30" },
    ],
  },
  {
    id: 2,
    nome: "Rafael Monteiro",
    telefone: "(91) 98888-0002",
    email: "rafael.monteiro@example.com",
    contas: [{ id: 103, valor: 520.5, data_inicio: "2026-10-01", data_fim: "2026-10-31" }],
  },
  {
    id: 3,
    nome: "Juliana Barbosa",
    telefone: "(91) 98888-0003",
    email: "juliana.barbosa@example.com",
    contas: [],
  },
];

export type Casa = {
  id: number;
  numero: string;
  moradores: Morador[];
};

export const casas: Casa[] = [
  { id: 1, numero: "101", moradores: [moradores[0], moradores[1]] },
  { id: 2, numero: "102", moradores: [moradores[2]] },
];
