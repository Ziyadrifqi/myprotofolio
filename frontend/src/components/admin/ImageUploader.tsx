"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/adminApi";

export default function ImageUploader({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (path: string) => void;
  folder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const path = await uploadImage(file, folder);
      onChange(path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="relative size-20 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.03] shrink-0">
          {value ? (
            // Local upload preview — plain img avoids next/image config for a small admin-only thumbnail
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-fog-muted">
              <ImagePlus className="size-5" />
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Loader2 className="size-4 text-fog animate-spin" />
            </div>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-full glass px-4 py-2 text-xs font-semibold text-fog hover:border-accent/40 transition-colors disabled:opacity-60"
          >
            {value ? "Ganti gambar" : "Unggah gambar"}
          </button>
          <p className="mt-1.5 text-[11px] text-fog-muted">JPG, PNG, WEBP, atau GIF. Maks 5MB.</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        className="hidden"
      />

      {error && <p className="mt-2 text-xs text-warm font-medium">{error}</p>}
    </div>
  );
}