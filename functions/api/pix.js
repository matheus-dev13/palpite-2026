// Cria uma cobrança Pix na ObyPay. A chave fica só na Cloudflare (variável OBYPAY_KEY).
const VALORES = [1, 5, 10, 20, 50, 100, 200];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function limparNome(n) {
  let s = String(n || "").replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 30);
  if (/:\/\/|www\.|\.com|\.br|@/i.test(s)) s = "";
  return s || "Anônimo";
}

export async function onRequestPost({ request, env }) {
  if (!env.OBYPAY_KEY) return json({ error: "Pix não configurado" }, 503);
  let body = {};
  try { body = await request.json(); } catch (e) {}
  const valor = Number(body.value);
  if (!VALORES.includes(valor)) return json({ error: "Valor inválido" }, 400);
  const nome = limparNome(body.name);

  const r = await fetch("https://api.obypay.app/transactions", {
    method: "POST",
    headers: { Authorization: env.OBYPAY_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ amount: valor * 100 }),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) return json({ error: "Não foi possível gerar o Pix", code: d.code || null }, 502);

  // Guarda o nome até o pagamento ser confirmado (some sozinho em 2 horas se não pagar).
  if (env.DOACOES && d.id) {
    await env.DOACOES.put("pend:" + d.id, JSON.stringify({ nome, valor, t: Date.now() }), { expirationTtl: 7200 });
  }

  return json({ id: d.id, copyPaste: d.copyPaste, qr: d.qrCodeBase64, expiresAt: d.expiresAt });
}
