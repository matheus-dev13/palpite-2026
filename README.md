# Quem leva 2026?

Site de palpites entre amigos para a eleição de presidente de 2026, com placar ao vivo.
Brincadeira sem valor de pesquisa eleitoral. Não divulgue os resultados publicamente como enquete.

## Peças
- `index.html`: o site inteiro (visual, urna, gráficos e Pix).
- `supabase.sql`: cria a tabela de votos, as regras de segurança e o tempo real.
- Votos no Supabase (um voto por aparelho, com login anônimo). Hospedagem na Cloudflare Pages.

## Pix (opcional)
Preencha `PIX_KEY`, `PIX_NAME` e `PIX_CITY` no index.html. Com `PIX_KEY` vazio a área fica escondida. Prefira uma chave aleatória.

## Cloudflare Pages
Workers & Pages > Create > Pages > Connect to Git > este repositório.
Framework preset: None. Build command e output directory vazios.
