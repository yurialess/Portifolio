# Como começar o seu portfólio

Este portfólio é feito só com HTML, CSS e JavaScript. Não precisa instalar nada além do VS Code.

## Arquivos (o que é cada um)

```
portfolio/
├── index.html          → página inicial (não precisa mexer)
├── projeto.html        → página de cada projeto (não precisa mexer)
├── css/style.css       → visual; as CORES ficam no topo do arquivo
├── js/config.js        → SEUS DADOS: nome, frase, sobre, WhatsApp, e-mail, Instagram
├── js/projetos.js      → SEUS PROJETOS (é aqui que você adiciona projetos novos)
├── js/main.js          → monta as páginas sozinho (não precisa mexer)
└── imagens/            → prints dos projetos
```

---

## Passo 1 — Abrir no VS Code

1. Descompacte o arquivo `portfolio.zip` numa pasta fácil de achar (ex.: `Documentos/portfolio`).
2. Abra o VS Code → **File → Open Folder** (Arquivo → Abrir Pasta) → escolha a pasta `portfolio`.
3. Na barra lateral esquerda (ícone de quadradinhos, **Extensions**), procure **Live Server** (autor: Ritwick Dey) e clique em **Install**.
4. Abra o `index.html`, clique com o botão direito no código → **Open with Live Server**.
   O site abre no navegador e **atualiza sozinho** toda vez que você salva (Ctrl+S).

## Passo 2 — Colocar seus dados

1. Abra `js/config.js`.
2. Troque os textos entre aspas: nome, função, frase, sobre.
3. WhatsApp: só números, com 55 + DDD + número. Ex.: `"5579981234567"`.
4. Coloque seu e-mail e Instagram (sem o @). O que deixar vazio (`""`) não aparece.
5. Salve (Ctrl+S) e veja no navegador.

## Passo 3 — Colocar os prints da GY Imports

1. Abra o site da GY Imports no navegador e tire prints:
   - página inicial → salve como `gy-home.png`
   - página de produto → `gy-produto.png`
   - checkout/reserva → `gy-checkout.png`
2. Coloque esses arquivos dentro da pasta `imagens`.
3. Dica de print bonito: no Chrome, aperte **F12 → Ctrl+Shift+P → digite "screenshot" → "Capture screenshot"**. Sai sem a barra do navegador.
4. Enquanto não tiver o print, o site mostra um quadro com o nome do projeto, então nada quebra.
5. Quando a GY estiver no ar com domínio, coloque o endereço em `link:` no `js/projetos.js`.

## Passo 4 — Adicionar um projeto novo (sempre que fizer um)

1. Abra `js/projetos.js`.
2. No final tem um **MODELO** com `//` na frente das linhas. Copie esse bloco.
3. Cole logo depois do `[` da primeira linha da lista (assim ele aparece primeiro).
4. Apague os `//` e troque os textos.
5. O `id` precisa ser único, sem espaço e sem acento (ex.: `"barbearia-silva"`).
6. Coloque os prints na pasta `imagens` com os nomes que você escreveu.
7. **Atenção à vírgula**: cada bloco `{ ... }` termina com `},`. Se o site ficar em branco, quase sempre é vírgula ou aspas faltando. Aperte F12 no navegador → aba **Console** que ele mostra a linha do erro.

## Passo 5 — Mudar as cores (opcional)

No topo do `css/style.css` tem as variáveis. A principal é:

```css
--destaque: #e5484d;
```

Troque pelo código de outra cor (pegue em https://htmlcolorcodes.com) e todo o site muda junto.

---

## Passo 6 — Subir para o GitHub

1. Crie uma conta em https://github.com (se ainda não tiver).
2. Instale o Git: https://git-scm.com/download/win (pode ir em "Next" em tudo).
3. Feche e abra o VS Code de novo.
4. No VS Code, clique no ícone de **Source Control** (barra lateral, o de "galhos", ou Ctrl+Shift+G).
5. Clique em **Publish to GitHub** (ou "Initialize Repository" e depois "Publish Branch").
6. Ele pede para entrar na sua conta do GitHub → autorize.
7. Escolha **public** ou **private**. O portfólio pode ser público (não tem nada secreto).
   ⚠️ Já o **repositório da GY Imports deve continuar PRIVADO**, para ninguém copiar o código da loja.
8. Toda vez que mudar algo depois:
   - vá em Source Control,
   - escreva uma mensagem (ex.: "adiciona projeto barbearia"),
   - clique em **Commit** e depois **Sync Changes**.

## Passo 7 — Colocar no ar com a Vercel

1. Entre em https://vercel.com → **Sign Up** → **Continue with GitHub**.
2. Clique em **Add New… → Project**.
3. Escolha o repositório `portfolio` → **Import**.
4. Em "Framework Preset" deixe **Other**. Não precisa mudar mais nada → **Deploy**.
5. Em menos de 1 minuto ele te dá um endereço tipo `portfolio-seunome.vercel.app`. Esse é o link para mandar pros clientes.
6. **A partir daí é automático**: cada vez que você der "Sync Changes" no VS Code, a Vercel atualiza o site sozinha.

> Portfólio pessoal pode ficar no plano gratuito (Hobby) da Vercel. O plano grátis não é para uso comercial; para a loja da GY ou sites de clientes que vendem, o ideal é plano pago ou conta do próprio cliente.

## Passo 8 — Domínio próprio (opcional, depois)

1. Compre um domínio no https://registro.br (ex.: `seunome.dev.br` ou `seunome.com.br`, em torno de R$ 40/ano).
2. Na Vercel: abra o projeto → **Settings → Domains** → digite o domínio → **Add**.
3. A Vercel mostra o que configurar (registros DNS). No Registro.br, vá no domínio → **DNS** → coloque o que a Vercel pediu.
4. Em algumas horas o site abre no seu domínio.

---

## Resumo do dia a dia

1. Fez um projeto novo → tira prints → coloca em `imagens/`.
2. Adiciona um bloco em `js/projetos.js`.
3. Confere com o Live Server.
4. Source Control → mensagem → Commit → Sync.
5. A Vercel atualiza sozinha. Pronto.
