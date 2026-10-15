# BAADV Advocacia Empresarial

Site institucional da **BAADV Advocacia Empresarial** (São Paulo), feito em React.
Apresenta a atuação do escritório, as áreas de prática, como funciona a contratação, os conteúdos do Instagram, perguntas frequentes e um formulário de contato.

**Site no ar:** https://dvarakaki.github.io/baadv-web/

## Tecnologias

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) + [Vite](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com) e [shadcn/ui](https://ui.shadcn.com) (Radix)
- [Motion](https://motion.dev) para animações e [Lenis](https://lenis.darkroom.engineering) para rolagem suave
- Fontes auto-hospedadas: Cormorant Garamond e Manrope
- Componentes adaptados do catálogo [21st.dev](https://21st.dev): *Services Stack* e *Timeline*

## Como rodar

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # gera a pasta dist/
npm run preview   # serve o build localmente
npm run lint
```

## Estrutura

```text
src/
  data/site.ts          conteúdo do site (contatos, áreas, FAQ, posts, etapas)
  sections/             uma seção da página por arquivo (hero, áreas, contato...)
  components/ui/        primitivos de interface e de movimento
  components/brand/     logo, ícones, tela de carregamento, linhas orbitais
  hooks/                rolagem suave e velocidade de rolagem
  index.css             tokens da marca e tema
public/img/             logo, fotos e posts do Instagram
```

## Editar o conteúdo

Quase tudo que o visitante lê está em [`src/data/site.ts`](src/data/site.ts): telefone, e-mail, endereço, horários, áreas de atuação, perguntas frequentes, etapas da contratação e posts em destaque. Para trocar um post do Instagram, coloque a imagem (WebP) em `public/img/insta/` e atualize a lista `posts`.

## Identidade visual

| Token | Cor | Uso |
| --- | --- | --- |
| `brand-900` | `#1C3133` | verde-petróleo, fundos escuros |
| `sand-50` / `sand-100` | `#FAF8F5` / `#F4F0EA` | fundos claros |
| `caramel-500` | `#B19781` | cor do logo, destaques e botões |

Títulos em Cormorant Garamond; textos em Manrope. O motivo de linhas finas em círculo vem dos posts do Instagram @advocacia_baa.

## Animações e acessibilidade

- Tela de carregamento, faixas que aceleram com a rolagem, partículas no hero, revelações ao rolar e empilhamento das áreas de atuação.
- Com "reduzir movimento" ativo no sistema, o site fica mais calmo: sem parallax, inclinações ou giros; as faixas andam na metade da velocidade e os textos aparecem só com fade.
- Navegação por teclado com foco visível, link "Pular para o conteúdo", menu móvel que isola o fundo e formulário com validação e mensagens de erro anunciadas.

## Formulário de contato

Sem servidor, o formulário valida os campos e abre o aplicativo de e-mail do visitante com a mensagem preenchida. Para receber direto na caixa de entrada, conecte um serviço (Formspree, Netlify Forms ou API própria) na função `onSubmit` de [`src/sections/contact.tsx`](src/sections/contact.tsx).

## Publicação

O deploy é automático: todo push na branch `main` roda o workflow [`deploy.yml`](.github/workflows/deploy.yml), que gera o build e publica no GitHub Pages.

- Em produção o site usa o caminho base `/baadv-web/`.
- Para publicar em domínio próprio (por exemplo `baadv.adv.br`), gere o build com `VITE_BASE=/` e configure o domínio em *Settings → Pages*.

## Aviso legal

As informações do site têm caráter meramente informativo e não constituem consultoria jurídica individualizada. Imagens, logo e marca pertencem à BAADV Advocacia Empresarial.
