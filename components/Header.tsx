"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        <span style={{ fontSize: 24 }}>☕</span>
        <span style={{ fontWeight: 700, fontSize: 18 }}>Buy Me a Coffee</span>
        <span style={styles.badge}>Monad</span>
      </div>
      <ConnectButton />
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #2a2a4a",
    background: "rgba(15, 15, 30, 0.8)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  badge: {
    background: "rgba(131, 110, 249, 0.15)",
    color: "#836ef9",
    padding: "2px 8px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
  },
};
