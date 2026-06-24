"use client";

import { Header } from "@/components/Header";
import { BuyCoffeeForm } from "@/components/BuyCoffeeForm";
import { CoffeeList } from "@/components/CoffeeList";

export default function Page() {
  return (
    <main>
      <Header />
      <div style={styles.container}>
        <div style={styles.hero}>
          <h1 style={styles.title}>Buy Me a Coffee ☕</h1>
          <p style={styles.subtitle}>
            Support your favorite creator with MON on Monad — fast, cheap, and
            onchain.
          </p>
        </div>
        <div style={styles.grid}>
          <BuyCoffeeForm />
          <CoffeeList />
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "32px 24px 64px",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  hero: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  title: {
    margin: 0,
    fontSize: 36,
    fontWeight: 800,
    background: "linear-gradient(135deg, #836ef9, #b8a9ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    margin: 0,
    fontSize: 16,
    opacity: 0.6,
    maxWidth: 480,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    alignItems: "start",
  },
};
