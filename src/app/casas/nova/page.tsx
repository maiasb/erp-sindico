import CasaForm from "../casa-form";

export default function NovaCasaPage() {
  return <CasaForm titulo="Nova casa" url="/api/casas" metodo="POST" />;
}
