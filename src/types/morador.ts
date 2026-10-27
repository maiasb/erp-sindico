export type Morador = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
};

// Morador como chega nos formulários e no corpo do POST/PUT; sem id quando é novo.
export type MoradorEntrada = Omit<Morador, "id"> & { id?: number };
