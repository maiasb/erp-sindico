"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./menu.module.css";

const itens = [
  { href: "/casas", rotulo: "Casas" },
  { href: "/moradores", rotulo: "Moradores" },
];

export default function Menu() {
  const pathname = usePathname();
  return (
    <nav className={styles.menu}>
      <Link href="/" className={styles.marca}>
        ERP Síndico
      </Link>
      {itens.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className={pathname.startsWith(i.href) ? styles.ativo : undefined}
        >
          {i.rotulo}
        </Link>
      ))}
    </nav>
  );
}
