"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";


const cuotasData = [
  {
    title: "RECAUDACIÓN MENSUAL",
    value: "$142,500.00",
    badge: "+12.5% vs mes ant.",
    progress: 88,
    description: "88% de cumplimiento alcanzado",
  },
  {
    title: "TOTAL EN MOROSIDAD",
    value: "$28,450.00",
    badge: "14 casas pendientes",
    progress: 38,
    description: "Revisión urgente requerida",
  },
  {
    title: "FONDO DE RESERVA ACTUAL",
    value: "$2,450,800.00",
    badge: "Saldo estable",
    progress: 72,
    description: "Fondo disponible para mantenimiento",
  },
];

const historialItems = [
  {
    lote: "A-102",
    residente: "Ricardo M. Sosa",
    concepto: "Cuota Mant.",
    monto: "$2,500.00",
  },
  {
    lote: "C-045",
    residente: "Elena Valenzuela",
    concepto: "Cuota Mant.",
    monto: "$2,500.00",
  },
  {
    lote: "B-012",
    residente: "Ignacio G. Torres",
    concepto: "Cuota Mant.",
    monto: "$2,500.00",
  },
  {
    lote: "A-008",
    residente: "Mariana L. Peña",
    concepto: "Cuota Mant.",
    monto: "$2,500.00",
  },
];

const months = [
  "Octubre 2023",
  "Septiembre 2023",
  "Agosto 2023",
  "Julio 2023",
  "Junio 2023",
];

const statuses = ["Todos los estatus", "Pagado", "Pendiente", "Vencido"];

  // menú lateral (mismo que en residentes y pagos)
  const navItems = [
    { label: "Dashboard", path: "/mesa_directiva" },
    { label: "Residentes", path: "/mesa_directiva/residentes" },
    { label: "Administración de pagos", path: "/mesa_directiva/pagos" },
    { label: "Áreas comunes", path: "/mesa_directiva/areas" },
    { label: "Avisos", path: "/mesa_directiva/avisos" },
  ];

export default function ContabilidadPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);

  const handleNav = (path: string) => {
    router.push(path);
    setSidebarOpen(false);
  };

  const isActivePath = (path: string) => {
    if (!pathname) return false;
    if (path === "/mesa_directiva") {
      return pathname === "/mesa_directiva";
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-16 px-5 flex items-center border-b border-slate-100 gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-500 flex items-center justify-center text-xs font-bold text-white">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800">
              Mesa Directiva
            </span>
            <span className="text-[11px] text-sky-500 font-medium">
              Panel administrativo
            </span>
          </div>
        </div>

        <nav className="mt-4 px-3 space-y-1 text-sm">
          {navItems.map((item) => {
            const active = isActivePath(item.path);
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-left transition ${
                  active
                    ? "bg-sky-50 text-sky-700 border border-sky-200"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
                onClick={() => setSidebarOpen((prev) => !prev)}
              >
                <span className="sr-only">Abrir menú</span>
                <div className="space-y-1">
                  <span className="block h-0.5 w-5 bg-current" />
                  <span className="block h-0.5 w-5 bg-current" />
                  <span className="block h-0.5 w-5 bg-current" />
                </div>
              </button>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">Administración</span>
                <span className="text-xs text-slate-500">Gestión de Cuotas</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs text-slate-500">Estado</span>
                <span className="text-sm font-semibold text-slate-800">{selectedMonth}</span>
              </div>
              <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                Descargar PDF
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-[0.18em]">Administración · Gestión de Cuotas</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">Gestión de Cuotas de Mantenimiento</h1>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <label className="grid gap-2 text-xs text-slate-500">
                  Mes
                  <select
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-xs text-slate-500">
                  Estatus
                  <select
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value)}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              {cuotasData.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.title}</p>
                      <p className="mt-4 text-3xl font-semibold text-slate-900">{item.value}</p>
                    </div>
                    <span className="rounded-full bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-600">
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-6 rounded-full bg-slate-100 h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-sky-500 transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>

                  <p className="mt-4 text-sm text-slate-500">{item.description}</p>
                </div>
              ))}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Cumplimiento de Pago</p>
                    <p className="mt-1 text-xs text-slate-500">Recaudación mensual vs presupuesto</p>
                  </div>
                  <div className="rounded-full bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-600">
                    88% del objetivo
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-slate-500">
                  {['MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT'].map((label) => (
                    <div key={label}>
                      <p className="font-semibold text-slate-900">{label}</p>
                      <div className="mt-3 flex h-36 items-end justify-center">
                        <div className="w-10 rounded-2xl bg-slate-100 p-1">
                          <div
                            className={`mx-auto h-full w-full rounded-2xl bg-sky-500`}
                            style={{ height: `${[55, 62, 68, 74, 82, 88][['MAY','JUN','JUL','AGO','SEP','OCT'].indexOf(label)]}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Historial de Cuotas</p>
                    <p className="mt-1 text-xs text-slate-500">Últimas transacciones registradas</p>
                  </div>
                  <button className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition">
                    Ver historial completo
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  {historialItems.map((item) => (
                    <div
                      key={item.lote}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{item.lote}</p>
                          <p className="text-sm text-slate-700">{item.residente}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">{item.concepto}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{item.monto}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl border border-slate-200 bg-sky-50 p-4 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-9 w-9 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-semibold">i</div>
                    <div>
                      <p className="font-semibold text-slate-900">Hemos superado la meta de recaudación</p>
                      <p className="text-xs text-slate-600">4% respecto al trimestre anterior</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                Descargar comprobantes
              </button>
              <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 transition">
                Generar reporte de morosidad
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
