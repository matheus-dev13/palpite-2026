# Quem leva 2026?

Site de palpites entre amigos para a eleição de presidente de 2026, com placar ao vivo.
Brincadeira sem valor de pesquisa eleitoral. Não divulgue os resultados publicamente como enquete.

## Peças
- `index.html`: o site inteiro (visual, urna, gráficos e Pix).
- `supabase.sql`: cria a tabela de votos, as regras de segurança e o tempo real.
- Votos no Supabase (um voto por aparelho, com login anônimo). Hospedagem na Cloudflare Pages.

## MultiLogin (gerenciador de perfis de navegador)
- `multilogin.html`: painel estilo AdsPower para gerenciar perfis de navegador isolados.
  Cada perfil guarda um fingerprint (User Agent, resolução, fuso, idioma, WebGL, Canvas/Audio
  noise, WebRTC, CPU/memória), proxy próprio (HTTP/HTTPS/SOCKS4/SOCKS5), geolocalização e cookies.
  Tem grupos, tags, busca, operações em massa e importação/exportação em JSON.
- `multilogin.sql`: tabelas `browser_profiles` e `profile_groups` no Supabase (opcional; por
  padrão os dados ficam no `localStorage` do navegador).
- Como uma página web não lança navegadores desktop, o painel **gera scripts prontos de
  Playwright ou Puppeteer** por perfil (botão "Abrir" ou menu de contexto). Rode com
  `node launch_<perfil>.js` para abrir um navegador real com o fingerprint, proxy e cookies
  aplicados. Requer `npm i playwright` (ou `puppeteer`) no seu computador.
- Acesse em `/multilogin.html`.

## Pix (opcional)
Preencha `PIX_KEY`, `PIX_NAME` e `PIX_CITY` no index.html. Com `PIX_KEY` vazio a área fica escondida. Prefira uma chave aleatória.

## Cloudflare Pages
Workers & Pages > Create > Pages > Connect to Git > este repositório.
Framework preset: None. Build command e output directory vazios.
