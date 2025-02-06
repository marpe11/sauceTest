# 🛒 Sauce Demo Automation - Playwright

Welcome to the automated testing repository for **Sauce Demo**! 🎭🚀

Here you will find a suite of automated tests using **Playwright** to validate functionalities of the [Sauce Demo](https://www.saucedemo.com) website. From login to checkout, we've got everything covered! 🔥

## 🛠️ Technologies Used

- [Playwright](https://playwright.dev/) 🎭
- Node.js 🟢
- JavaScript 📝

## 📦 Installation

1️⃣ Clone this repository:

```sh
  git clone https://github.com/your-username/sauce-demo-automation.git
```

2️⃣ Navigate to the project directory:

```sh
  cd sauce-demo-automation
```

3️⃣ Install dependencies:

```sh
  npm install
```

## 🚀 Running the Tests

To run all tests:

```sh
  npx playwright test
```

## 📜 Project Structure

📂 **pages/** - Page Object Model (POM) files 🏗️\
📂 **tests/** - Automated test scripts 🧪\
📂 **utils/** - Constants and helper functions 🔧

## 📌 Implemented Test Cases

1️⃣ Login Tests: Logs in with all users described in the scenario, including validation for incorrect username/password and empty fields. 🔑

2️⃣ Navigation & Search: Directly navigates to the products section (no search functionality found). 🧭

3️⃣ Product Validation: Locates the "Sauce Labs Bolt T-Shirt" and verifies its name, price, and description. 🏷️

4️⃣ Add to Cart & Verification: Adds the product to the cart, checks if the cart icon (shopping_cart_link) displays a badge, clicks on the cart, and verifies that the product was added with the correct details. 🛍️

5️⃣ Checkout Process: Proceeds to the checkout page, verifies error messages for missing first name, last name, and zip code. Then fills in the fields, continues, and checks if the item appears with all necessary details, the tax is as expected, and the total price is correct. Clicks the "Finish" button and confirms successful checkout completion. ✅
## 🎯 Project Objective

This project was created to enhance **test automation** skills and ensure that Sauce Demo always runs smoothly! 😎

##
