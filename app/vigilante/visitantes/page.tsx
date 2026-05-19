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

  const API = "http://127.0.0.1:3002";

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

      console.log("STATUS:", res.status);

      const texto = await res.text();

      console.log("RESPUESTA BACKEND:", texto);

      if (!res.ok) {
        throw new Error("Código inválido");
      }

      const data = JSON.parse(texto);

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

    setError("");
    setSuccess("");

    const res = await fetch(
      `${API}/visitas/entrada/${codigo}`,
      {
        method: "POST",
      }
    );

    console.log("STATUS REGISTRO:", res.status);

    const texto = await res.text();

    console.log("RESPUESTA REGISTRO:", texto);

    if (!res.ok) {
      throw new Error("No se pudo registrar");
    }

    if (visitante?.estado.toLowerCase() === "pendiente") {

  setVisitante({
    ...visitante,
    estado: "en_proceso",
  });

  setSuccess("Acceso autorizado correctamente 🚪");

} else if (visitante?.estado.toLowerCase() === "en_proceso") {

  setVisitante({
    ...visitante,
    estado: "finalizado",
  });

  setSuccess("Visita finalizada correctamente ✅");
}

  } catch (err) {

    console.error(err);

    setError("Error al registrar acceso");

  } finally {

    setLoading(false);
  }
};

const abrirPlumilla = async () => {

  try {

    const res = await fetch(
      `${API}/plumilla/abrir`,
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      throw new Error();
    }

    alert("🚪 Plumilla abierta");

  } catch {

    alert("Error al abrir plumilla");
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
                  visitante.estado.toLowerCase() === "finalizado"
                    ? "bg-emerald-100 text-emerald-700"
                    : visitante.estado.toLowerCase() === "en_proceso"
                    ? "bg-sky-100 text-sky-700"
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
  disabled={
    loading ||
    visitante.estado.toLowerCase() === "finalizado"
  }
  className={`mt-8 w-full text-white py-3 rounded-xl font-semibold transition ${
    visitante.estado.toLowerCase() === "finalizado"
      ? "bg-slate-400 cursor-not-allowed"
      : visitante.estado.toLowerCase() === "en_proceso"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-emerald-600 hover:bg-emerald-700"
  }`}
>
  {
    visitante.estado.toLowerCase() === "finalizado"
      ? "Visita finalizada"
      : visitante.estado.toLowerCase() === "en_proceso"
      ? "Finalizar visita"
      : "Autorizar acceso"
  }
</button>

<button
  onClick={abrirPlumilla}
  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
>
  Abrir plumilla
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