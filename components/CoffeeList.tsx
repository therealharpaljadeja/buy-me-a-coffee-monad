"use client";

import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import { buyMeACoffeeAbi } from "@/lib/abi";
import { CONTRACT_ADDRESS } from "@/lib/contract";

interface Coffee {
  from: string;
  timestamp: bigint;
  name: string;
  message: string;
  amount: bigint;
}

export function CoffeeList() {
  const { data: coffees, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: buyMeACoffeeAbi,
    functionName: "getCoffees",
  });

  const sortedCoffees = coffees
    ? [...(coffees as Coffee[])].reverse().slice(0, 20)
    : [];

  if (isLoading) {
    return (
      <div style={styles.container}>
        <h2 style={{ margin: 0, fontSize: 20 }}>Recent Coffees</h2>
        <p style={{ opacity: 0.5 }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={{ margin: 0, fontSize: 20 }}>
        Recent Coffees {sortedCoffees.length > 0 && `(${sortedCoffees.length})`}
      </h2>

      {sortedCoffees.length === 0 ? (
        <p style={{ opacity: 0.5, textAlign: "center", padding: 24 }}>
          No coffees yet. Be the first to buy one! ☕
        </p>
      ) : (
        <div style={styles.list}>
          {sortedCoffees.map((coffee, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={{ fontWeight: 600 }}>{coffee.name}</span>
                <span style={styles.amount}>
                  {formatEther(coffee.amount)} MON
                </span>
              </div>
              <p style={styles.message}>{coffee.message}</p>
              <div style={styles.meta}>
                <span>{coffee.from.slice(0, 6)}...{coffee.from.slice(-4)}</span>
                <span>
                  {new Date(Number(coffee.timestamp) * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    background: "#1a1a2e",
    borderRadius: 16,
    padding: 24,
    border: "1px solid #2a2a4a",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxHeight: 400,
    overflowY: "auto",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 16,
    borderRadius: 12,
    background: "#0f0f1e",
    border: "1px solid #2a2a4a",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    background: "rgba(131, 110, 249, 0.15)",
    color: "#836ef9",
    padding: "4px 10px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
  },
  message: {
    margin: 0,
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 1.5,
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    opacity: 0.4,
  },
};
