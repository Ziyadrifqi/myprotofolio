"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearToken, verifyToken } from "@/lib/adminApi";
import AdminShell, { type AdminTabKey } from "@/components/admin/AdminShell";
import ProfileEditor from "@/components/admin/ProfileEditor";
import StackEditor from "@/components/admin/StackEditor";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import MessagesEditor from "@/components/admin/MessagesEditor";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<AdminTabKey>("profile");

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      if (!getToken()) {
        router.replace("/admin/login");
        return;
      }

      const isValid = await verifyToken();
      if (!isMounted) return;

      if (!isValid) {
        clearToken();
        router.replace("/admin/login?expired=1");
        return;
      }

      setChecked(true);
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
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
      {tab === "messages" && <MessagesEditor />}
    </AdminShell>
  );
}
