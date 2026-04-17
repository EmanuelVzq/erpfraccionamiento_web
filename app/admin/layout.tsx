"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            // borrar usuario local
            localStorage.removeItem("fracc_user");

            // cerrar sesión en firebase
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            // redirigir al login
            router.replace("/login");
        }
    };

    return (
        <main className="min-h-screen flex bg-slate-100 text-slate-900">

            {/* ================= SIDEBAR ================= */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">

                {/* Perfil */}
                <div className="px-6 pt-6 pb-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-semibold">
                        A
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Admin General</span>
                        <span className="text-xs text-slate-500">Administrador</span>
                        <span className="text-[11px] text-slate-400">
                            admin@frac.com
                        </span>
                    </div>
                </div>

                {/* Menú */}
                <nav className="mt-4 px-3 space-y-1 text-sm">
                    <SidebarItem label="Dashboard" icon="DB" onClick={() => router.push("/admin")} />
                    <SidebarItem label="Residentes" icon="R" onClick={() => router.push("/admin/residentes")} />
                    <SidebarItem label="Mesa Directiva" icon="M" onClick={() => router.push("/admin/mesa_directiva")} />
                    <SidebarItem label="Pagos" icon="$" onClick={() => router.push("/admin/pagos")} />
                    <SidebarItem label="Áreas" icon="A" onClick={() => router.push("/admin/areas")} />
                    <SidebarItem label="Avisos" icon="AV" onClick={() => router.push("/admin/avisos")} />
                    <SidebarItem label="Contabilidad" icon="C" onClick={() => router.push("/admin/contabilidad")} />
                </nav>

                {/* Botón */}
                <div className="mt-auto px-4 pb-2 pt-6">
                    <button className="w-full rounded-xl bg-sky-500 text-white text-sm font-medium py-2.5">
                        Crear aviso rápido
                    </button>
                </div>

                {/* Footer */}
                <div className="px-4 pb-6 space-y-2 text-xs text-slate-500">
                    <button className="w-full hover:bg-slate-50 px-2 py-1.5 rounded-lg">
                        ⚙ Configuración
                    </button>
                    <button className="w-full hover:bg-slate-50 px-2 py-1.5 rounded-lg">
                        ? Ayuda
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full hover:bg-red-50 text-red-600 px-2 py-1.5 rounded-lg"
                    >
                        ⏻ Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* ================= CONTENIDO DINÁMICO ================= */}
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