"use client";

import { useEffect, useState } from "react";

type Visita = {
  cve_visita: number;
  qr: string;
  residencia_visitada: string;
  fecha: string;
  hora_entrada: string;
  hora_salida: string | null;
  estado: string;
};

export default function VigilantePage() {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [loading, setLoading] = useState(true);

  const API = "https://erpfraccionamiento-api.onrender.com";

  const obtenerVisitas = async () => {
    try {
      const res = await fetch(`${API}/visitas`);

      if (!res.ok) throw new Error("Error al obtener visitas");

      const data = await res.json();
      setVisitas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerVisitas();
  }, []);

  // 🔥 Cálculos dinámicos
  const entradasHoy = visitas.filter(v => v.hora_entrada).length;
  const salidasHoy = visitas.filter(v => v.hora_salida).length;
  const enRecinto = visitas.filter(v => !v.hora_salida).length;

  return (
    <main className="min-h-screen flex bg-slate-100 text-slate-900">
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
        <div className="mt-6">
          <h1 className="text-3xl font-semibold">
            Monitor de Accesos
          </h1>
          <p className="text-sm text-slate-500">
            Panel en tiempo real de visitas
          </p>
        </div>

        {/* 🔥 Tarjetas dinámicas */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Entradas hoy" value={entradasHoy.toString()} />
          <StatCard title="Salidas hoy" value={salidasHoy.toString()} />
          <StatCard title="En recinto" value={enRecinto.toString()} />
        </section>

        {/* Estado */}
        <div className="mt-4 bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-2xl p-6">
          <h2 className="font-semibold">Estado del Sistema</h2>
          <p className="text-sm mt-1">
            Operación normal. {enRecinto} personas dentro.
          </p>
        </div>

        {/* Tabla */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">

          {/* Tabs (solo visual por ahora) */}
          <div className="flex gap-4 text-sm mb-4">
            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-lg">
              Todos
            </span>
          </div>

          {/* Registros */}
          <div className="space-y-3">
            {loading ? (
              <p className="text-slate-500">Cargando...</p>
            ) : visitas.length === 0 ? (
              <p className="text-slate-500">No hay visitas</p>
            ) : (
              visitas.map((v) => (
                <AccessRow
                  key={v.cve_visita}
                  tipo={v.hora_salida ? "Salida" : "Entrada"}
                  nombre={`QR: ${v.qr}`}
                  detalle={`Casa ${v.residencia_visitada}`}
                  placa="—"
                  hora={v.hora_entrada}
                  estado={v.estado}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

//////////////// COMPONENTES //////////////////

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
          estado === "autorizado"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {estado}
      </span>
    </div>
  );
}