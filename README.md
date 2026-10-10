# Quem leva 2026?

Site de palpites entre amigos para a eleição de presidente de 2026, com placar ao vivo.
Brincadeira sem valor de pesquisa eleitoral. Não divulgue os resultados publicamente como enquete.

## Peças
- `index.html`: o site inteiro (visual, urna, gráficos e Pix).
- `supabase.sql`: cria a tabela de votos, as regras de segurança e o tempo real.
- Votos no Supabase (um voto por aparelho, com login anônimo). Hospedagem na Cloudflare Pages.

## MultiLogin (perfis de navegador com sessão isolada)
- `multilogin.html`: painel para gerenciar perfis de navegador, cada um com **sessão isolada**.
  Serve para manter cada cliente/conta separado: cookies, logins e armazenamento de um perfil
  não se misturam com os de outro. Cada perfil guarda configurações padrão de navegador
  (User Agent, resolução, fuso, idioma), proxy próprio (HTTP/HTTPS/SOCKS4/SOCKS5),
  geolocalização e cookies. Tem grupos, tags, busca, operações em massa e import/export em JSON.
- `multilogin.sql`: tabelas `browser_profiles` e `profile_groups` no Supabase (opcional; por
  padrão os dados ficam no `localStorage` do navegador).
- Como uma página web não lança navegadores desktop, o painel **gera scripts prontos de
  Playwright ou Puppeteer** por perfil (botão "Abrir" ou menu de contexto). O script usa um
  `userDataDir` próprio por perfil (`launchPersistentContext` / `userDataDir`), então cada
  sessão fica isolada em disco. Rode com `node launch_<perfil>.js` para abrir um navegador real
  com a sessão, proxy e cookies daquele perfil. Requer `npm i playwright` (ou `puppeteer`).
- Acesse em `/multilogin.html`.

## Pix (opcional)
Preencha `PIX_KEY`, `PIX_NAME` e `PIX_CITY` no index.html. Com `PIX_KEY` vazio a área fica escondida. Prefira uma chave aleatória.

## Cloudflare Pages
Workers & Pages > Create > Pages > Connect to Git > este repositório.
Framework preset: None. Build command e output directory vazios.
