import { connection } from "next/server";
import { moradores } from "@/lib/dados";

export async function GET() {
  await connection();
  return Response.json(moradores);
}
