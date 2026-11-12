# FOX — Ambientes Planejados

Site Nuxt 3 com geração estática, Vue 3 e CSS responsivo. Fotos reais dos materiais fornecidos, recortadas para remover a interface dos celulares. Vídeo convertido para MP4 sem áudio. Não utiliza banco de dados nem serviços pagos.

## Executar

Node.js 22 ou superior. `npm ci`, seguido de `npm run dev`. Para gerar a versão final: `npm run build`. Saída em `.output/public`.

## Vercel

Importe esta pasta em um repositório Git e conecte à Vercel. Configurações em `vercel.json`: framework Nuxt, comando `npm run build`, saída `.output/public`. Configure `NUXT_PUBLIC_SITE_URL` com a URL pública definitiva **antes do build**. O padrão reaproveita a URL do projeto anterior; troque se o novo endereço for diferente. O mesmo valor alimenta canonical, Open Graph, dados estruturados, sitemap e arquivos de descoberta. A prévia privada do ChatGPT não é o endereço para indexação no Google.

## Conteúdo e contatos

Edite `app.vue` para atualizar textos, portfólio, WhatsApp, horário e dados comerciais. Número de WhatsApp configurado: **+55 (47) 99618-8271** (`https://wa.me/5547996188271`). Os botões abrem em nova aba; o formulário envia a mensagem pré-preenchida e oferece um link alternativo. Confirme com a FOX se o número permanece ativo antes do lançamento. Instagram, endereço, e-mail e horários foram conferidos nos materiais enviados. Não foram inventadas avaliações, estatísticas ou depoimentos. O Instagram não pôde ser consultado automaticamente.

## Recursos

Galeria com filtros e ampliação em diálogo acessível (Escape fecha; setas navegam), navegação mobile, animações de entrada por IntersectionObserver, hover, faixa animada, preferência de movimento reduzido, vídeo com controles, imagens WebP, CTAs com mensagens específicas, HTML pré-renderizado, canonical, Open Graph, LocalBusiness/Service/FAQPage JSON-LD, sitemap.xml, robots.txt (padrão correto), robot.txt (alias), llms.txt e llm.txt. Os arquivos são regenerados no build.

Os arquivos de SEO e descoberta fornecem base técnica, sem garantia de posicionamento no Google ou citação em sistemas de IA. Cadastre o domínio definitivo no Google Search Console e envie seu sitemap após publicar.

## Atualização da apresentação
Vídeo na hero com autoplay sem áudio, loop e playsinline; botão de pausa e respeito à preferência de movimento reduzido. Removida a logo circular da interface, mantendo a marca tipográfica FOX. Dez fotos novas em WebP com versões de 780 pixels para dispositivos móveis, galeria com 12 imagens e categorias.
