"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { buyMeACoffeeAbi } from "@/lib/abi";
import { CONTRACT_ADDRESS } from "@/lib/contract";

const coffeeOptions = [
  { label: "Small Coffee", amount: "0.001", emoji: "☕" },
  { label: "Medium Coffee", amount: "0.005", emoji: "☕☕" },
  { label: "Large Coffee", amount: "0.01", emoji: "☕☕☕" },
];

export function BuyCoffeeForm({ onSuccess }: { onSuccess?: () => void }) {
  const { isConnected } = useAccount();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(coffeeOptions[0].amount);

  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: buyMeACoffeeAbi,
      functionName: "buyCoffee",
      args: [name || "Anonymous", message || "Enjoy your coffee!"],
      value: parseEther(selectedAmount),
    });
  };

  if (isSuccess) {
    onSuccess?.();
    return (
      <div style={styles.successCard}>
        <span style={{ fontSize: 48 }}>🎉</span>
        <h3 style={{ margin: 0 }}>Coffee sent!</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>Thank you for your support</p>
        <button
          onClick={() => window.location.reload()}
          style={styles.button}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={{ margin: 0, fontSize: 20 }}>Buy a Coffee</h2>

      <div style={styles.amountGrid}>
        {coffeeOptions.map((opt) => (
          <button
            key={opt.amount}
            type="button"
            onClick={() => setSelectedAmount(opt.amount)}
            style={{
              ...styles.amountOption,
              ...(selectedAmount === opt.amount ? styles.amountSelected : {}),
            }}
          >
            <span style={{ fontSize: 20 }}>{opt.emoji}</span>
            <span style={{ fontWeight: 600 }}>{opt.label}</span>
            <span style={{ opacity: 0.6, fontSize: 13 }}>{opt.amount} MON</span>
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        maxLength={50}
      />

      <textarea
        placeholder="Leave a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ ...styles.input, minHeight: 80, resize: "vertical" }}
        maxLength={280}
      />

      <button
        type="submit"
        disabled={!isConnected || isPending || isConfirming}
        style={{
          ...styles.button,
          ...(!isConnected ? styles.buttonDisabled : {}),
        }}
      >
        {!isConnected
          ? "Connect wallet first"
          : isPending
          ? "Confirm in wallet..."
          : isConfirming
          ? "Confirming..."
          : `Send ${selectedAmount} MON ☕`}
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    background: "#1a1a2e",
    borderRadius: 16,
    padding: 24,
    border: "1px solid #2a2a4a",
  },
  amountGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
  },
  amountOption: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "12px 8px",
    borderRadius: 12,
    border: "1px solid #2a2a4a",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: 14,
  },
  amountSelected: {
    border: "1px solid #836ef9",
    background: "rgba(131, 110, 249, 0.1)",
  },
  input: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #2a2a4a",
    background: "#0f0f1e",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
  },
  button: {
    padding: "14px 24px",
    borderRadius: 12,
    border: "none",
    background: "#836ef9",
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  successCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    background: "#1a1a2e",
    borderRadius: 16,
    padding: 32,
    border: "1px solid #2a2a4a",
    textAlign: "center",
  },
};
