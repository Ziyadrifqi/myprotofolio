"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/adminApi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(password);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <form
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-8 w-full max-w-sm space-y-5"
      >
        <div>
          <h1 className="font-display text-xl font-bold text-fog">Admin Login</h1>
          <p className="mt-1 text-sm text-fog-muted">
            Masuk untuk mengelola konten portofolio.
          </p>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-semibold text-fog-muted mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-fog outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {error && <p className="text-xs text-warm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-accent to-accent-soft px-6 py-3 text-sm font-semibold text-ink disabled:opacity-70"
        >
          {loading ? "Masuk..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}