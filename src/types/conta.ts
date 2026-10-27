export type Conta = {
  id: number;
  valor: number;
  data_inicio: string;
  data_fim: string;
};

export type ContaDetalhada = Conta & {
  casa: { id: number; numero: string };
};
