// Diz ao site se o Pix automático está configurado (sem revelar a chave).
export function onRequestGet({ env }) {
  return new Response(JSON.stringify({ pix: !!env.OBYPAY_KEY }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
