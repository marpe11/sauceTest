# 🛒 Sauce Demo Automação - Playwright

Bem-vindo ao repositório de testes automatizados para **Sauce Demo**! 🎭🚀

Aqui você encontrará uma suíte de testes automatizados usando **Playwright** para validar funcionalidades do site [Sauce Demo](https://www.saucedemo.com). Desde login até checkout, cobrimos tudo! 🔥

## 🛠️ Tecnologias Utilizadas

- [Playwright](https://playwright.dev/) 🎭
- Node.js 🟢
- JavaScript 📝

## 📦 Instalação

1️⃣ Clone este repositório:

```sh
  git clone https://github.com/seu-usuario/sauce-demo-automation.git
```

2️⃣ Acesse o diretório do projeto:

```sh
  cd sauce-demo-automation
```

3️⃣ Instale as dependências:

```sh
  npm install
```

## 🚀 Executando os Testes

Para executar todos os testes:

```sh
npx playwright test --reporter=html
```
Para abrir o relatório de testes:

```sh
  npx playwright show-report
```
## 📜 Estrutura do Projeto

📂 **pages/** - Arquivos do Page Object Model (POM) 🏗️\
📂 **tests/** - Scripts de testes automatizados 🧪\
📂 **utils/** - Constantes e funções auxiliares 🔧

## 📌 Casos de Teste Implementados

1️⃣ **Testes de Login:** Faz login com todos os usuários descritos no cenário, incluindo validação para usuário/senha incorretos e campos vazios. 🔑

2️⃣ **Navegação & Pesquisa:** Aqui já caimos na seção de produtos e não encontrei nenhum campo de pesquisa. 🧭

3️⃣ **Validação de Produto:** Procura o item "Sauce Labs Bolt T-Shirt" e verifica nome, preço e descrição. 🏷️

4️⃣ **Adicionar ao Carrinho & Verificação:** Adiciona o produto ao carrinho, verifica se o ícone do carrinho (`shopping_cart_link`) exibe um badge, clica no carrinho e confirma que o produto foi adicionado com os detalhes corretos. 🛍️

5️⃣ **Processo de Checkout:** Acessa a página de checkout, verifica mensagens de erro para campos obrigatórios (first name, last name e zip code). Após preenchê-los, continua e verifica se o item aparece com todas as informações necessárias, se a taxa está correta e se o valor total está de acordo com o esperado. Clica no botão "Finish" e confirma a conclusão bem-sucedida do checkout. ✅

## **Resultado:**

