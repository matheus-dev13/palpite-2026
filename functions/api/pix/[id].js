// Consulta só o status de uma cobrança (para o site mostrar "pagamento recebido").
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export async function onRequestGet({ params, env }) {
  const id = String(params.id || "");
  if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: "id inválido" }, 400);
  if (!env.OBYPAY_KEY) return json({ error: "Pix não configurado" }, 503);

  const r = await fetch("https://api.obypay.app/transactions/" + id, {
    headers: { Authorization: env.OBYPAY_KEY },
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || (d.type && d.type !== "DEPOSIT")) return json({ error: "não encontrado" }, 404);
  return json({ status: d.status || null });
}
