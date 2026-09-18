// Lista pública dos últimos apoiadores (só nome e horário, sem valor).
export async function onRequestGet({ env }) {
  const feed = (env.DOACOES && (await env.DOACOES.get("feed", "json"))) || [];
  const lista = feed.slice(0, 20).map((x) => ({ nome: x.nome, t: x.t }));
  return new Response(JSON.stringify({ ativo: !!env.DOACOES, apoiadores: lista }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
