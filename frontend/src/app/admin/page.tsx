"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearToken } from "@/lib/adminApi";
import AdminShell, { type AdminTabKey } from "@/components/admin/AdminShell";
import ProfileEditor from "@/components/admin/ProfileEditor";
import StackEditor from "@/components/admin/StackEditor";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import ExperienceEditor from "@/components/admin/ExperienceEditor";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<AdminTabKey>("profile");

  useEffect(() => {
    if (!getToken()) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  function handleLogout() {
    clearToken();
    router.replace("/admin/login");
  }

  if (!checked) return null;

  return (
    <AdminShell active={tab} onChange={setTab} onLogout={handleLogout}>
      {tab === "profile" && <ProfileEditor />}
      {tab === "stack" && <StackEditor />}
      {tab === "projects" && <ProjectsEditor />}
      {tab === "experience" && <ExperienceEditor />}
    </AdminShell>
  );
}