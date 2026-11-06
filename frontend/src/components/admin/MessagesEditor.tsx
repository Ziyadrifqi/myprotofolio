"use client";

import { useEffect, useState, useCallback } from "react";
import { authFetch } from "@/lib/adminApi";
import { Mail, Check, Trash2, MailOpen, RefreshCw, Clock, User, AlertCircle } from "lucide-react";

interface MessageItem {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessagesEditor() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authFetch("/api/messages");
      if (!res.ok) {
        throw new Error("Gagal mengambil pesan");
      }
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function toggleReadStatus(id: number, currentStatus: boolean) {
    setActionLoadingId(id);
    try {
      const res = await authFetch(`/api/messages/${id}/read`, {
        method: "PATCH",
        body: JSON.stringify({ is_read: !currentStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, is_read: !currentStatus } : msg))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  }

  async function deleteMessage(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;

    setActionLoadingId(id);
    try {
      const res = await authFetch(`/api/messages/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-border pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-fog">Pesan Masuk (Inbox)</h2>
            {unreadCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30">
                {unreadCount} belum dibaca
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-fog-muted">
            Pesan yang dikirimkan oleh pengunjung melalui form kontak portofolio.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-xl border border-ink-border bg-ink-panel text-fog hover:bg-white/5 transition disabled:opacity-50"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Segarkan
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-warm/10 border border-warm/30 text-warm flex items-center gap-3">
          <AlertCircle className="size-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Message List */}
      {loading && messages.length === 0 ? (
        <div className="py-20 text-center text-fog-muted text-sm">Memuat pesan masuk...</div>
      ) : messages.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-ink-border">
          <Mail className="size-10 text-fog-muted/50 mx-auto mb-3" />
          <p className="text-fog font-medium">Belum ada pesan masuk</p>
          <p className="text-fog-muted text-xs mt-1">
            Pesan baru dari form kontak akan muncul di sini secara otomatis.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((item) => {
            const dateStr = new Date(item.created_at).toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short",
            });
            const isActing = actionLoadingId === item.id;

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  item.is_read
                    ? "bg-ink-panel/40 border-ink-border text-fog-muted"
                    : "bg-ink-panel border-accent/30 shadow-lg shadow-accent/5 text-fog"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${
                        item.is_read
                          ? "bg-white/5 text-fog-muted"
                          : "bg-accent/15 text-accent border border-accent/25"
                      }`}
                    >
                      <User className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-base text-fog">{item.name}</span>
                        {!item.is_read && (
                          <span className="inline-block size-2 rounded-full bg-accent" />
                        )}
                      </div>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-xs text-accent-soft hover:underline"
                      >
                        {item.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="flex items-center gap-1 text-xs text-fog-muted mr-2">
                      <Clock className="size-3.5" />
                      {dateStr}
                    </span>

                    <button
                      onClick={() => toggleReadStatus(item.id, item.is_read)}
                      disabled={isActing}
                      title={item.is_read ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
                      className="p-2 rounded-lg border border-ink-border bg-white/5 hover:bg-white/10 text-fog-muted hover:text-fog transition disabled:opacity-50"
                    >
                      {item.is_read ? (
                        <Mail className="size-4" />
                      ) : (
                        <Check className="size-4 text-accent" />
                      )}
                    </button>

                    <button
                      onClick={() => deleteMessage(item.id)}
                      disabled={isActing}
                      title="Hapus pesan"
                      className="p-2 rounded-lg border border-ink-border bg-white/5 hover:bg-warm/20 text-fog-muted hover:text-warm transition disabled:opacity-50"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 pl-0 sm:pl-13">
                  <div className="p-4 rounded-xl bg-ink/70 border border-ink-border text-sm leading-relaxed whitespace-pre-wrap text-fog">
                    {item.message}
                  </div>
                  <div className="mt-3 flex justify-end">
                    <a
                      href={`mailto:${item.email}?subject=Re: Kontak Portofolio`}
                      className="inline-flex items-center gap-2 text-xs font-medium text-accent hover:underline"
                    >
                      <MailOpen className="size-3.5" />
                      Balas via Email
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

