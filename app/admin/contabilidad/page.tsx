"use client";

import { useRouter } from "next/navigation";

export default function ContabilidadPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex bg-slate-100 text-slate-900">
      
      {/*  CONTENIDO  */}
      <section className="flex-1 px-10 py-8">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Contabilidad</h1>
            <p className="text-sm text-slate-500">
              Resumen financiero y estado de activos actuales.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-lg bg-sky-500 text-white text-sm">
              Mes
            </button>
            <button className="px-4 py-1.5 rounded-lg bg-slate-200 text-sm">
              Trimestre
            </button>
            <button className="px-4 py-1.5 rounded-lg bg-slate-200 text-sm">
              Semestre
            </button>
          </div>
        </header>

        {/* Tarjetas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card title="Ingresos Totales" value="$1,500.00" extra="+12.5%" />
          <Card title="Tasa de Ocupación" value="92%" extra="Estable" />
          <Card title="Morosidad" value="3.5%" extra="+0.5%" />
        </section>

        {/* Gráfico */}
        <div className="bg-white rounded-2xl p-6 mt-8 shadow-sm border border-slate-200">
          <h2 className="font-semibold mb-2">Gráfico de Ingresos</h2>
          <p className="text-xs text-slate-500 mb-4">
            Renta y mantenimiento mensual
          </p>

          <div className="h-40 bg-slate-100 rounded-xl flex items-center justify-center">
            <span className="text-slate-400 text-sm">Gráfica aquí</span>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl p-6 mt-8 shadow-sm border border-slate-200">
          <h2 className="font-semibold mb-4">Detalle de Activos</h2>

          <table className="w-full text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="text-left">Inmueble</th>
                <th>Estado</th>
                <th>Vencimiento</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td>Oficina Editorial</td>
                <td className="text-emerald-600">Al corriente</td>
                <td>12 Oct 2023</td>
                <td>$450</td>
              </tr>
            </tbody>
          </table>
        </div>
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

type CardProps = {
  title: string;
  value: string;
  extra?: string;
};

function Card({ title, value, extra }: CardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 px-6 py-4 shadow-sm">
      <p className="text-xs text-slate-500 mb-1">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
      {extra && (
        <p className="text-xs mt-2 text-slate-500">{extra}</p>
      )}
    </div>
  );
}