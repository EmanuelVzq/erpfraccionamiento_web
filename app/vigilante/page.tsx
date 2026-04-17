"use client";

import { useRouter } from "next/navigation";

export default function VigilantePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex bg-slate-100 text-slate-900">

      {/* ================= CONTENIDO ================= */}
      <section className="flex-1 px-8 py-6">

        {/* Header */}
        <header className="flex items-center justify-between">
          <input
            placeholder="Buscar registros..."
            className="bg-slate-200 rounded-lg px-4 py-2 text-sm w-72 outline-none"
          />

          <div className="flex items-center gap-4">
            <span>🔔</span>
            <span>⚙</span>
            <div className="h-8 w-8 rounded-full bg-slate-300"></div>
          </div>
        </header>

        {/* Título */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">
              Monitor de Accesos
            </h1>
            <p className="text-sm text-slate-500">
              Panel de control en tiempo real para la gestión de ingresos y salidas.
            </p>
          </div>

        </div>

        {/* Tarjetas */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Entradas hoy" value="142" />
          <StatCard title="Salidas hoy" value="118" />
          <StatCard title="En recinto" value="24" />
        </section>

        {/* Estado */}
        <div className="mt-4 bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-2xl p-6">
          <h2 className="font-semibold">Estado del Sistema</h2>
          <p className="text-sm mt-1">
            Operación normal. Todos los puntos de control activos.
          </p>
        </div>

        {/* Tabla */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          
          {/* Tabs */}
          <div className="flex gap-4 text-sm mb-4">
            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-lg">
              Todos
            </span>
            <span className="text-slate-500">Residencial</span>
            <span className="text-slate-500">Visitantes</span>
            <span className="text-slate-500">Servicios</span>
          </div>

          {/* Registros */}
          <div className="space-y-3">
            <AccessRow
              tipo="Entrada"
              nombre="Carlos Mendoza"
              detalle="Residente - Torre B"
              placa="ABC-1234"
              hora="14:25"
              estado="Autorizado"
            />
            <AccessRow
              tipo="Salida"
              nombre="Lucía Torres"
              detalle="Visitante - Casa 12"
              placa="Peatonal"
              hora="14:18"
              estado="Autorizado"
            />
            <AccessRow
              tipo="Entrada"
              nombre="Uber / Entrega"
              detalle="Servicio"
              placa="XYZ-987"
              hora="14:10"
              estado="En proceso"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

//////////////// COMPONENTES //////////////////

function SidebarItem({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl ${
        active
          ? "bg-sky-100 text-sky-700 font-medium"
          : "hover:bg-slate-50"
      }`}
    >
      <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">
        •
      </span>
      {label}
    </button>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <p className="text-xs text-slate-500 uppercase">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function AccessRow({
  tipo,
  nombre,
  detalle,
  placa,
  hora,
  estado,
}: any) {
  return (
    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
      <div>
        <p className="text-sm font-semibold">{tipo} · {nombre}</p>
        <p className="text-xs text-slate-500">{detalle}</p>
      </div>

      <span className="text-xs bg-slate-200 px-2 py-1 rounded">
        {placa}
      </span>

      <span className="text-sm">{hora}</span>

      <span
        className={`text-xs px-2 py-1 rounded-full ${
          estado === "Autorizado"
            ? "bg-sky-100 text-sky-700"
            : "bg-slate-200 text-slate-600"
        }`}
      >
        {estado}
      </span>
    </div>
  );
}