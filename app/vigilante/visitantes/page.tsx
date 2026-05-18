"use client";

import { useState } from "react";

type Visitante = {
  nombre: string;
  residencia: string;
  qr: string;
  fecha: string;
  estado: string;
};

export default function VisitantesPage() {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visitante, setVisitante] = useState<Visitante | null>(null);
  const [success, setSuccess] = useState("");

  const API = "https://erpfraccionamiento-api.onrender.com";

  const validarCodigo = async () => {
    if (!codigo.trim()) {
      setError("Ingresa un código");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setVisitante(null);

    try {
      // 🔥 Endpoint ejemplo
      const res = await fetch(`${API}/visitas/validar/${codigo}`);

      if (!res.ok) {
        throw new Error("Código inválido");
      }

      const data = await res.json();

      setVisitante({
        nombre: data.nombre ?? "Visitante",
        residencia: data.residencia_visitada ?? "N/D",
        qr: data.qr ?? codigo,
        fecha: data.fecha ?? "Sin fecha",
        estado: data.estado ?? "pendiente",
      });

    } catch (err) {
      console.error(err);
      setError("No se encontró el código");
    } finally {
      setLoading(false);
    }
  };

  const registrarEntrada = async () => {
    try {
      setLoading(true);

      // 🔥 Endpoint ejemplo
      const res = await fetch(`${API}/visitas/entrada/${visitante?.qr}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        throw new Error("No se pudo registrar");
      }

      setSuccess("Acceso autorizado correctamente 🚪");
    } catch (err) {
      console.error(err);
      setError("Error al registrar acceso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-800">
          Validación de Visitantes
        </h1>

        <p className="text-slate-500 mt-1">
          Ingresa o escanea el código del visitante
        </p>
      </div>

      {/* Card principal */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

        {/* Input */}
        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Ej. QR-92831"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
          />

          <button
            onClick={validarCodigo}
            disabled={loading}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            {loading ? "Validando..." : "Validar"}
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 bg-red-100 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mt-5 bg-emerald-100 text-emerald-700 px-4 py-3 rounded-xl">
            {success}
          </div>
        )}

        {/* Resultado */}
        {visitante && (
          <div className="mt-8 border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-semibold">
                  {visitante.nombre}
                </h2>

                <p className="text-slate-500 mt-1">
                  Casa {visitante.residencia}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  visitante.estado.toLowerCase() === "autorizado"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {visitante.estado}
              </span>

            </div>

            {/* Datos */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

              <InfoCard
                title="Código QR"
                value={visitante.qr}
              />

              <InfoCard
                title="Fecha"
                value={visitante.fecha}
              />

            </div>

            {/* Botón */}
            <button
              onClick={registrarEntrada}
              disabled={loading}
              className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Autorizar acceso
            </button>

          </div>
        )}

      </div>
    </section>
  );
}

//////////////// COMPONENTES //////////////////

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <p className="text-xs uppercase text-slate-500">
        {title}
      </p>

      <p className="text-lg font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}