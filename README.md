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

1️⃣ **Login:** Faz o teste de todos os logins fornecidos pela plataforma, também validando cada mensagem de erro. 🔑

2️⃣ **Products** Faz a checagem da página Products, verificando se o produto setado na productDetails, esta contido na página, verificando nome, descrição e valor. 🧭

3️⃣ **Cart** Adiciona o produto ao carrinho, verifica se o ícone do carrinho (`shopping_cart_link`) exibe um badge, clica no carrinho e confirma que o produto foi adicionado com os detalhes corretos, após isso clica em remover e verifica se o mesmo badge some do (`shopping_cart_link`)🏷️

4️⃣ **Checkout** O fluxo de Checkout valida todo o processo de finalização de compra, desde a inserção das informações de envio até a confirmação do pedido. O teste inicia o checkout, verifica mensagens de erro para campos obrigatórios (First Name, Last Name e Postal Code) e preenche os dados corretamente. Em seguida, avança para a página de resumo, onde confirma os detalhes do produto e os valores totais. Após finalizar o pedido, o teste valida se o usuário é redirecionado para a página de confirmação com a mensagem de sucesso, garantindo que o processo foi concluído com segurança. 🛒✅

