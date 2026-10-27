import { Suspense } from "react";
import EditarCasa from "./editar-casa";

async function Conteudo({ params }: Pick<PageProps<"/casas/[id]/editar">, "params">) {
  const { id } = await params;
  return <EditarCasa id={id} />;
}

export default function EditarCasaPage({ params }: PageProps<"/casas/[id]/editar">) {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Conteudo params={params} />
    </Suspense>
  );
}
