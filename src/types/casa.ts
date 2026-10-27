import type { Conta } from "./conta";
import type { Morador } from "./morador";

export type Casa = {
  id: number;
  numero: string;
  moradores: Morador[];
  contas: Conta[];
};
