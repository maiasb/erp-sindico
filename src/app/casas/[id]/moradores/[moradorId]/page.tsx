import { Suspense } from "react";
import DetalheMorador from "./detalhe-morador";

async function Conteudo({
  params,
}: Pick<PageProps<"/casas/[id]/moradores/[moradorId]">, "params">) {
  const { id, moradorId } = await params;
  return <DetalheMorador casaId={id} moradorId={moradorId} />;
}

export default function MoradorDaCasaPage({
  params,
}: PageProps<"/casas/[id]/moradores/[moradorId]">) {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Conteudo params={params} />
    </Suspense>
  );
}
