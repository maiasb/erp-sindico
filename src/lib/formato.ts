const moedaBRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const moeda = (valor: number) => moedaBRL.format(valor);
export const data = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR");
