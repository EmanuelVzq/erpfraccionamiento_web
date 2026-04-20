"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ContabilidadPage() {
  const router = useRouter();

  const [periodo, setPeriodo] = useState("mes");
  const [resumen, setResumen] = useState({
    ingresos: 0,
    ocupacion: 0,
    morosidad: 0,
  });
  const [grafica, setGrafica] = useState<any[]>([]);

  const API = "https://erpfraccionamiento-api.onrender.com";

  // =========================
  // RESUMEN
  // =========================
  const obtenerResumen = async (periodoSeleccionado: string) => {
    try {
      const res = await fetch(
        `${API}/dashboard/resumen?periodo=${periodoSeleccionado}`
      );

      const data = await res.json();
      setResumen(data);
    } catch (error) {
      console.error("Error resumen:", error);
    }
  };

  // =========================
  // GRAFICA
  // =========================
  const obtenerGrafica = async () => {
    try {
      const res = await fetch(`${API}/grafica?periodo=${periodo}`);

      if (!res.ok) throw new Error("Error en API");

      const data = await res.json();

      const formateado = data.map((item: any) => ({
        mes: item.mes?.slice(0, 7),
        total: Number(item.total),
      }));

      setGrafica(formateado);
    } catch (error) {
      console.error("Error gráfica:", error);
      setGrafica([]);
    }
  };

  useEffect(() => {
    obtenerResumen(periodo);
    obtenerGrafica();
  }, [periodo]);

  return (
    <main className="min-h-screen flex bg-slate-100 text-slate-900">
      <section className="flex-1 px-10 py-8">
        
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Contabilidad</h1>
            <p className="text-sm text-slate-500">
              Resumen financiero y estado de activos actuales.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPeriodo("mes")}
              className={`px-4 py-1.5 rounded-lg text-sm ${
                periodo === "mes"
                  ? "bg-sky-500 text-white"
                  : "bg-slate-200"
              }`}
            >
              Mes
            </button>

            <button
              onClick={() => setPeriodo("trimestre")}
              className={`px-4 py-1.5 rounded-lg text-sm ${
                periodo === "trimestre"
                  ? "bg-sky-500 text-white"
                  : "bg-slate-200"
              }`}
            >
              Trimestre
            </button>

            <button
              onClick={() => setPeriodo("semestre")}
              className={`px-4 py-1.5 rounded-lg text-sm ${
                periodo === "semestre"
                  ? "bg-sky-500 text-white"
                  : "bg-slate-200"
              }`}
            >
              Semestre
            </button>
          </div>
        </header>

        {/* TARJETAS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card
            title="Ingresos Totales"
            value={`$${resumen.ingresos.toFixed(2)}`}
          />

          <Card
            title="Tasa de Ocupación"
            value={`${resumen.ocupacion.toFixed(1)}%`}
          />

          <Card
            title="Morosidad"
            value={`${resumen.morosidad.toFixed(1)}%`}
          />
        </section>

        {/* GRAFICA */}
        <div className="bg-white rounded-2xl p-6 mt-8 shadow-sm border border-slate-200">
          <h2 className="font-semibold mb-2">Gráfico de Ingresos</h2>
          <p className="text-xs text-slate-500 mb-4">
            Ingresos por periodo
          </p>

          <div className="w-full h-64 min-w-0">
            {grafica.length === 0 ? (
              <span className="text-slate-400 text-sm">
                Sin datos disponibles
              </span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={grafica}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* TABLA (placeholder) */}
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

// =========================
// COMPONENTE CARD
// =========================
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
      {extra && <p className="text-xs mt-2 text-slate-500">{extra}</p>}
    </div>
  );
}