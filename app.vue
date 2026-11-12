<script setup lang="ts">
const config = useRuntimeConfig()
const origin = config.public.siteUrl as string
const phone = '5547996188271'
const wa = (message = 'Olá! Gostaria de conversar sobre a montagem dos meus móveis.') => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
const instagram = 'https://www.instagram.com/fox_montador_de_moveis/'
const heroVideo = ref<HTMLVideoElement>()
const videoPaused = ref(false)
function toggleVideo() { if (!heroVideo.value) return; if (heroVideo.value.paused) heroVideo.value.play().then(() => videoPaused.value = false).catch(() => videoPaused.value = true); else { heroVideo.value.pause(); videoPaused.value = true } }
const quote = reactive({ name: '', city: '', service: '', message: '' })
function sendQuote() {
 const message = `Olá, FOX! Meu nome é ${quote.name.trim()}.\nCidade/bairro: ${quote.city.trim()}\nServiço: ${quote.service}\n\n${quote.message.trim()}`
 // Abrir em uma nova aba evita bloqueios de navegação em previews e no iPhone.
 // Se o navegador impedir a nova aba, usa a navegação normal como alternativa.
 const link = wa(message)
 const opened = window.open(link, '_blank')
 if (opened) opened.opener = null
 else window.location.assign(link)
}
const menu = ref(false)
const selected = ref<number | null>(null)
const dialog = ref<HTMLDialogElement>()
const activeCategory = ref('Todos')
const categories = ['Todos', 'Cozinhas', 'Closets', 'Painéis', 'Banheiros', 'Detalhes']
const projects = [
 {"image": "closet-ilha", "title": "Madeira, luz e espaço para você", "category": "Closets", "text": "Closet com ilha central e iluminação nos nichos"},
 {"image": "cozinha-ilha", "title": "O encontro da madeira com o preto", "category": "Cozinhas", "text": "Cozinha com ilha e móveis planejados"},
 {"image": "banheiro-duplo", "title": "Cuidado que acompanha a rotina", "category": "Banheiros", "text": "Gabinete de madeira com duas cubas e armários superiores"},
 {"image": "painel-sala", "title": "Integração em cada detalhe", "category": "Painéis", "text": "Painel de madeira com porta integrada e armário suspenso"},
 {"image": "closet-led", "title": "Cada coisa no seu lugar", "category": "Closets", "text": "Closet com gavetas e prateleiras iluminadas"},
 {"image": "cozinha-madeira", "title": "O projeto tomando forma", "category": "Cozinhas", "text": "Montagem de cozinha em madeira com módulos inferiores e superiores"},
 {"image": "banheiro-led", "title": "Um acabamento que acolhe", "category": "Banheiros", "text": "Armário espelhado e gabinete com iluminação indireta"},
 {"image": "escada-madeira", "title": "Continuidade do piso ao teto", "category": "Detalhes", "text": "Revestimento de madeira acompanhando a escada e porta integrada"},
 {"image": "painel-portas", "title": "Linhas que se encontram", "category": "Painéis", "text": "Painel de madeira com portas de correr"},
 {"image": "painel-corredor", "title": "Textura ao longo do caminho", "category": "Painéis", "text": "Revestimento de madeira no corredor com porta integrada"},
 {"image": "montagem-balcao", "title": "Precisão antes do acabamento", "category": "Detalhes", "text": "Balcão de madeira durante a etapa de montagem"},
 {"image": "cozinha-integrada", "title": "Espaço para a vida acontecer", "category": "Cozinhas", "text": "Cozinha integrada com iluminação e funcionalidade"}
]
const filtered = computed(() => projects.filter(p => activeCategory.value === 'Todos' || p.category === activeCategory.value))
const current = computed(() => selected.value === null ? null : projects[selected.value])
const services = [
 ['Cozinhas e áreas gourmet', 'Para cozinhar, receber e viver bem', 'Montagem de módulos, ilhas, armários e acabamentos, com atenção aos encaixes e ao alinhamento do conjunto.'],
 ['Closets e dormitórios', 'Cada coisa no seu lugar', 'Montagem de roupeiros, closets e móveis planejados para aproveitar o espaço e organizar a rotina.'],
 ['Painéis e banheiros', 'O detalhe completa o ambiente', 'Instalação de painéis, gabinetes e nichos, respeitando as medidas e as especificações do seu projeto.'],
 ['Regulagens e ajustes', 'Pequenos acertos fazem diferença', 'Ajustes de portas, gavetas e ferragens para deixar a montagem alinhada e o uso mais confortável.']
]
const faqs = [
 ['Quais serviços a FOX realiza?', 'A FOX é especializada na montagem de móveis planejados e sob medida, incluindo cozinhas, closets, dormitórios, banheiros e painéis. Também realiza regulagem de portas e gavetas e ajustes de acabamento.'],
 ['A FOX atende em qual região?', 'Atendemos Blumenau e região, em Santa Catarina. Envie sua localização pelo WhatsApp para consultar a disponibilidade de atendimento no seu endereço.'],
 ['Como solicito um orçamento?', 'Envie pelo WhatsApp as fotos ou o projeto dos móveis, o endereço de atendimento e o que você precisa montar. A equipe conversa com você sobre o serviço, a disponibilidade e o orçamento.'],
 ['Vocês atendem empresas também?', 'Sim. O atendimento é voltado tanto para residências quanto para empresas que precisam de montagem de móveis planejados.'],
 ['Qual é o horário de atendimento?', 'De segunda a sábado, das 8h às 18h. Aos domingos, fechado.']
]
function openProject(p: typeof projects[number]) { selected.value = projects.indexOf(p); dialog.value?.showModal() }
function closeProject() { dialog.value?.close(); selected.value = null }
function step(direction: number) { selected.value = ((selected.value ?? 0) + direction + projects.length) % projects.length }
watch(selected, value => { if (import.meta.client) document.body.style.overflow = value === null ? '' : 'hidden' })
function dialogKey(e: KeyboardEvent) { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
let observer: IntersectionObserver | undefined
onMounted(() => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { heroVideo.value?.pause(); videoPaused.value = true }; observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer?.unobserve(entry.target) } }), { threshold: 0.08 }); document.querySelectorAll('[data-reveal]').forEach(el => observer?.observe(el)) })
onBeforeUnmount(() => { observer?.disconnect(); document.body.style.overflow = '' })
useSeoMeta({ title: 'FOX | Montagem de móveis planejados em Blumenau', description: 'Seu projeto merece uma montagem bem feita. Montagem de móveis planejados, cozinhas, closets e painéis em Blumenau e região. Converse com a FOX pelo WhatsApp.', ogTitle: 'FOX — O seu espaço merece esse cuidado', ogDescription: 'Montagem de móveis planejados em Blumenau e região. Precisão, qualidade e compromisso em cada ambiente.', ogImage: `${origin}/media/cozinha-ilha.webp`, ogUrl: origin, ogType: 'website', twitterCard: 'summary_large_image', robots: 'index, follow' })
useHead({ link: [{ rel: 'canonical', href: origin + '/' }], script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'HomeAndConstructionBusiness', '@id': origin + '/#empresa', name: 'FOX Montagem de Móveis', alternateName: 'FOX Ambientes Planejados', url: origin, image: `${origin}/media/cozinha-ilha.webp`, logo: `${origin}/media/logo.webp`, telephone: '+5547996188271', email: 'foxxmontagem@gmail.com', address: { '@type': 'PostalAddress', streetAddress: 'Av. Brasil, 88 - Ponta Aguda', addressLocality: 'Blumenau', addressRegion: 'SC', postalCode: '89050-000', addressCountry: 'BR' }, areaServed: 'Blumenau e região, Santa Catarina', sameAs: [instagram], openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens:'08:00', closes:'18:00' }], hasOfferCatalog: { '@type':'OfferCatalog', name:'Montagem de móveis', itemListElement: services.map(s => ({ '@type':'Offer', itemOffered:{ '@type':'Service', name:s[0], description:s[2] } })) } }, { '@type':'FAQPage', mainEntity:faqs.map(f => ({ '@type':'Question', name:f[0], acceptedAnswer:{ '@type':'Answer', text:f[1] } })) }] }) }] })
</script>

<template>
 <div>
  <a class="skip" href="#conteudo">Pular para o conteúdo</a>
  <header class="header">
   <a class="brand" href="#inicio" aria-label="FOX — início"><img class="brand-logo" src="/media/fox-logo-small.webp" alt="Logo FOX" width="44" height="44"><span>FOX<small>AMBIENTES PLANEJADOS</small></span></a>
   <button class="menu-toggle" :aria-expanded="menu" aria-controls="navigation" @click="menu=!menu">{{ menu ? 'Fechar ×' : 'Menu ☰' }}</button>
   <nav id="navigation" :class="{open:menu}" aria-label="Menu principal"><a href="#essencia" @click="menu=false">A essência</a><a href="#ambientes" @click="menu=false">Ambientes</a><a href="#servicos" @click="menu=false">O que fazemos</a><a class="nav-contact" :href="wa()" target="_blank" rel="noopener noreferrer">Vamos conversar <span>↗</span></a></nav>
  </header>
  <main id="conteudo">
   <section id="inicio" class="hero">
    <video ref="heroVideo" class="hero-video" autoplay muted loop playsinline preload="metadata" poster="/media/closet-ilha.webp" aria-label="Apresentação dos ambientes FOX" @pause="videoPaused=true" @play="videoPaused=false"><source src="/media/fox-filme.mp4" type="video/mp4"></video>
    <div class="hero-scrim"></div><div class="hero-lines" aria-hidden="true"></div>
    <div class="hero-content"><p class="eyebrow"><i></i> BLUMENAU & REGIÃO · SC</p><h1>Seu espaço<br>tem uma história<br><em>A gente cuida<br class="mobile-break"> dos detalhes</em></h1><p class="hero-copy">Do primeiro encaixe ao último ajuste, uma montagem cuidadosa para o ambiente que você imaginou</p><a class="button orange" :href="wa('Olá! Tenho um projeto e gostaria de solicitar um orçamento com a FOX.')" target="_blank" rel="noopener noreferrer">Vamos falar do seu projeto <span>↗</span></a></div>
    <div class="hero-caption"><span class="pulse"></span> MONTAGEM DE MÓVEIS PLANEJADOS</div><a class="hero-scroll" href="#essencia">EXPLORE A FOX <span>↓</span></a>
    <button class="video-toggle" @click="toggleVideo()" :aria-label="videoPaused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo'">{{ videoPaused ? '▶ Reproduzir' : 'Ⅱ Pausar vídeo' }}</button>
   </section>
   <div class="ticker" aria-label="Precisão, qualidade e compromisso"><div aria-hidden="true"><span>PRECISÃO</span> ✳ <span>QUALIDADE</span> ✳ <span>COMPROMISSO</span> ✳ <span>SEU AMBIENTE, NOSSO CUIDADO</span> ✳ <span>PRECISÃO</span> ✳ <span>QUALIDADE</span> ✳ <span>COMPROMISSO</span> ✳ <span>SEU AMBIENTE, NOSSO CUIDADO</span> ✳</div></div>
   <section id="essencia" class="essence section">
    <div class="essence-art essence-photo" data-reveal><img src="/media/closet-ilha.webp" srcset="/media/closet-ilha-small.webp 780w, /media/closet-ilha.webp 1800w" sizes="(max-width:700px) 88vw, 44vw" alt="Closet de madeira com ilha central montado pela FOX" width="1800" height="1350" loading="lazy"><span class="art-label">CUIDADO QUE VOCÊ VÊ DE PERTO</span></div>
    <div class="essence-copy" data-reveal><p class="eyebrow">A ESSÊNCIA DA FOX</p><h2>O seu sonho<br>merece <em>mãos<br>comprometidas</em></h2><p>Você escolheu cada cor, pensou em cada medida e imaginou a vida acontecendo ali. A montagem precisa ter esse mesmo cuidado.</p><p>É assim que a FOX trabalha: com precisão, organização e atenção ao acabamento, para transformar o projeto em um ambiente pronto para fazer parte da sua história.</p><div class="signature"><span>FOX</span><p>Planejando seus<br>melhores momentos</p></div></div>
   </section>
   <section id="ambientes" class="projects section">
    <div class="section-top" data-reveal><div><p class="eyebrow">PORTFÓLIO · TRABALHOS REAIS</p><h2>É nos ambientes<br>que o cuidado <em>aparece</em></h2></div><p>Madeira, textura e personalidade<br>Conheça de perto o nosso trabalho</p></div>
    <div class="filters" aria-label="Filtrar ambientes"><button v-for="category in categories" :key="category" :class="{active:activeCategory===category}" :aria-pressed="activeCategory===category" @click="activeCategory=category">{{ category }}</button></div>
    <div class="project-grid"><button v-for="(project,i) in filtered" :key="project.image" class="project" :class="{'project-wide':i===0}" @click="openProject(project)"><div class="project-image"><img :src="`/media/${project.image}.webp`" :srcset="project.image.includes('cozinha-') && ['cozinha-ilha','cozinha-integrada'].includes(project.image) ? undefined : `/media/${project.image}-small.webp 780w, /media/${project.image}.webp 1800w`" sizes="(max-width:700px) 88vw, 45vw" :alt="project.text" width="806" height="1075" loading="lazy"><span class="view-project">Ver ambiente <span>↗</span></span></div><div class="project-caption"><div><small>{{ project.text }}</small><h3>{{ project.title }}</h3></div><span>↗</span></div></button></div>
    <a class="text-link" :href="instagram" target="_blank" rel="noopener">Mais detalhes no nosso Instagram <span>↗</span></a>
   </section>

   <section id="servicos" class="services section"><div class="section-top" data-reveal><div><p class="eyebrow">O QUE FAZEMOS</p><h2>Seu projeto<br><em>bem montado</em></h2></div><p>Da cozinha ao dormitório<br>Do encaixe ao acabamento</p></div><div class="service-list"><article v-for="(s,i) in services" :key="s[0]" data-reveal><div><p class="service-intro">{{ s[1] }}</p><h3>{{ s[0] }}</h3></div><p class="service-description">{{ s[2] }}</p><a :href="wa('Olá! Gostaria de um orçamento para '+s[0].toLowerCase()+'.')" target="_blank" rel="noopener noreferrer" :aria-label="`Solicitar orçamento para ${s[0]}`">↗</a></article></div></section>
   <section class="process section"><div data-reveal><p class="eyebrow">DO SEU PROJETO À SUA ROTINA</p><h2>Uma boa montagem<br>começa com <em>uma conversa</em></h2></div><div class="process-grid"><article data-reveal><span>CONVERSAR</span><h3>Conte sua ideia</h3><p>Envie fotos ou o projeto dos móveis e diga onde será o atendimento. A gente entende o que você precisa.</p></article><article data-reveal><span>COMBINAR</span><h3>Alinhe os detalhes</h3><p>Conversamos sobre o serviço, o orçamento e a disponibilidade para combinar a montagem.</p></article><article data-reveal><span>TRANSFORMAR</span><h3>Veja tudo no lugar</h3><p>A FOX cuida da montagem e dos ajustes, com organização e atenção aos detalhes do seu ambiente.</p></article></div></section>
   <section class="faq section"><div data-reveal><p class="eyebrow">ANTES DE COMEÇAR</p><h2>Vamos tirar<br>suas <em>dúvidas</em></h2></div><div class="faq-list"><details v-for="f in faqs" :key="f[0]"><summary>{{ f[0] }}<span>+</span></summary><p>{{ f[1] }}</p></details></div></section>
   <section id="contato" class="contact section"><div class="contact-bg" aria-hidden="true">FOX</div><div class="contact-layout"><div data-reveal><p class="eyebrow">O PRÓXIMO AMBIENTE PODE SER O SEU</p><h2>Você imagina<br><em>A FOX cuida</em></h2><p>Conte o que você precisa montar<br>A conversa começa por aqui</p><span class="contact-note">Atendimento residencial e comercial · Blumenau e região</span></div><form class="quote-form" @submit.prevent="sendQuote"><h3>Vamos falar do seu projeto</h3><div class="form-row"><label for="quote-name">Seu nome<input id="quote-name" v-model="quote.name" name="name" autocomplete="name" required maxlength="100" placeholder="Como podemos chamar você?"></label><label for="quote-city">Cidade e bairro<input id="quote-city" v-model="quote.city" name="city" autocomplete="address-level2" required maxlength="140" placeholder="Onde será a montagem?"></label></div><label for="quote-service">O que você precisa?<select id="quote-service" v-model="quote.service" name="service" required><option disabled value="">Selecione um serviço</option><option v-for="s in services" :key="s[0]">{{ s[0] }}</option><option>Outro serviço de montagem</option></select></label><label for="quote-message">Conte um pouco do projeto<textarea id="quote-message" v-model="quote.message" name="message" rows="4" required maxlength="2000" placeholder="Quais móveis você precisa montar? Já tem o projeto?"></textarea></label><button class="button dark" type="submit">Continuar no WhatsApp <span>↗</span></button><p class="form-note">O WhatsApp abre com seu pedido preenchido. Você confere a mensagem e toca em enviar para falar com a FOX. Se não abrir, <a :href="wa()" target="_blank" rel="noopener noreferrer" class="quote-fallback">toque aqui para conversar diretamente</a>.</p></form></div></section>
   <section class="location section"><div><p class="eyebrow">PERTINHO DO SEU PROJETO</p><h2>FOX em<br><em>Blumenau</em></h2><address>Av. Brasil, 88 · Ponta Aguda<br>Blumenau — SC · 89050-000</address><a class="button orange" href="https://www.google.com/maps/search/?api=1&amp;query=Av.+Brasil+88+Ponta+Aguda+Blumenau+SC" target="_blank" rel="noopener">Abrir endereço no mapa <span>↗</span></a><a class="instagram-contact" :href="instagram" target="_blank" rel="noopener">Instagram da FOX<br><strong>@fox_montador_de_moveis ↗</strong></a></div><iframe title="Mapa do endereço da FOX em Ponta Aguda, Blumenau" src="https://maps.google.com/maps?q=Av.%20Brasil%2C%2088%2C%20Ponta%20Aguda%2C%20Blumenau%20SC&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></section>
  </main>
  <footer class="footer"><div class="footer-top"><a class="brand" href="#inicio"><img class="brand-logo" src="/media/fox-logo-small.webp" alt="Logo FOX" width="44" height="44" loading="lazy"><span>FOX<small>AMBIENTES PLANEJADOS</small></span></a><p>Precisão no trabalho<br>Compromisso com você</p><a :href="instagram" target="_blank" rel="noopener">Instagram ↗</a></div><div class="footer-details"><div><small>ONDE ESTAMOS</small><a href="https://www.google.com/maps/search/?api=1&query=Av.+Brasil+88+Ponta+Aguda+Blumenau+SC" target="_blank" rel="noopener">Av. Brasil, 88 · Ponta Aguda<br>Blumenau — SC · 89050-000 ↗</a></div><div><small>QUANDO CONVERSAR</small><p>Segunda a sábado · 08h às 18h<br>Domingo · Fechado</p></div><div><small>FALE COM A FOX</small><a href="mailto:foxxmontagem@gmail.com">foxxmontagem@gmail.com</a><a :href="wa()" target="_blank" rel="noopener noreferrer">(47) 99618-8271 ↗</a></div></div><div class="footer-bottom"><span>© {{ new Date().getFullYear() }} FOX Montagem de Móveis</span><span>Planejando seus melhores momentos</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
  <a class="floating-wa" :href="wa()" target="_blank" rel="noopener noreferrer" aria-label="Conversar com a FOX no WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7a8.5 8.5 0 1 1 16.3-3.8Z"/><path d="M8 7.4c.4 4.1 3 6.7 7 7.7l1.2-1.8-2.4-1.2-1 1c-1.8-.7-2.9-1.9-3.5-3.5l.9-.9L9 6.8Z"/></svg><span>Vamos conversar</span></a>
  <dialog ref="dialog" class="lightbox" @close="selected=null" @cancel="selected=null" @click="($event.target === dialog) && closeProject()" @keydown="dialogKey"><template v-if="current"><button class="close-dialog" autofocus @click="closeProject()" aria-label="Fechar imagem">Fechar ×</button><button class="prev" @click="step(-1)" aria-label="Imagem anterior">←</button><figure><img :src="`/media/${current.image}.webp`" :alt="current.text"><figcaption>{{ current.title }} <span>{{ (selected ?? 0)+1 }} / {{ projects.length }}</span></figcaption></figure><button class="next" @click="step(1)" aria-label="Próxima imagem">→</button></template></dialog>
 </div>
</template>
