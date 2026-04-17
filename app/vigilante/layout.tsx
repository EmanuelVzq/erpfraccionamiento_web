"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type StoredUser = {
  nombre_completo: string;
  correo: string;
};

export default function VigilanteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("fracc_user");
    if (!raw) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(raw);
    setUser(parsed);
  }, [router]);

  const displayName = user?.nombre_completo ?? "Vigilante";
  const displayEmail = user?.correo ?? "vigilante@frac.com";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen flex bg-slate-100 text-slate-900">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">

        {/* Perfil */}
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {avatarLetter}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold line-clamp-1">
              {displayName}
            </span>
            <span className="text-xs text-slate-500">
              Vigilante
            </span>
            <span className="text-[11px] text-slate-400 line-clamp-1">
              {displayEmail}
            </span>
          </div>
        </div>

        {/* Menú */}
        <nav className="mt-4 px-3 space-y-1 text-sm">

          <SidebarItem
            label="Registro de accesos"
            icon="RA"
            onClick={() => router.push("/vigilante")}
          />

          <SidebarItem
            label="Visitantes"
            icon="V"
            onClick={() => router.push("/vigilante/visitantes")}
          />

          <SidebarItem
            label="Emergencias"
            icon="!"
            onClick={() => router.push("/vigilante/emergencias")}
          />

        </nav>

        {/* Footer */}
        <div className="mt-auto px-4 pb-6 space-y-2 text-xs text-slate-500">

          <button className="w-full hover:bg-slate-50 px-2 py-1.5 rounded-lg">
            ⚙ Configuración
          </button>

          <button className="w-full hover:bg-slate-50 px-2 py-1.5 rounded-lg">
            ? Ayuda
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("fracc_user");
              router.push("/login");
            }}
            className="w-full hover:bg-red-50 text-red-600 px-2 py-1.5 rounded-lg"
          >
            ⏻ Cerrar sesión
          </button>

        </div>
      </aside>

      {/* ================= CONTENIDO ================= */}
      <section className="flex-1 px-10 py-8">
        {children}
      </section>
    </main>
  );
}

type SidebarItemProps = {
  label: string;
  icon: string;
  onClick?: () => void;
};

function SidebarItem({ label, icon, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50"
    >
      <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold">
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}