import { connection } from "next/server";
import { listarContas } from "@/lib/dados";

export async function GET() {
  await connection();
  return Response.json(listarContas());
}
