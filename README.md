# Remix Nest To-Do App

A simple **To-Do application** built with **Remix** (React-based full-stack framework) and **NestJS** (progressive Node.js framework). This project is designed to provide a **modern, scalable**, and **serverless-ready** full-stack application.

---

## 🚀 Tech Stack

### **Backend (NestJS)**

- **@nestjs/common** - Core utilities for NestJS
- **@nestjs/core** - Framework core
- **@nestjs/platform-express** - Express-based NestJS adapter
- **@neondatabase/serverless** - Serverless PostgreSQL database support
- **dotenv** - Manage environment variables
- **reflect-metadata** - Required for TypeScript decorators
- **rxjs** - Reactive programming utilities

### **Frontend (Remix)**

- **@remix-run/node** - Remix server-side utilities
- **@remix-run/react** - React integration for Remix
- **@remix-run/serve** - Simple server for Remix
- **react** - UI library
- **react-dom** - DOM renderer for React
- **react-hot-toast** - Notifications
- **isbot** - Bot detection for Remix SSR optimization

---

## 📂 Folder Structure

This project follows a structured and modular approach, separating the **frontend (Remix)** and **backend (NestJS)** into different folders.

### **1️⃣ client/** - The Frontend (Remix)

This folder contains the **Remix-based UI** and handles everything related to the client side, including:

- **React Components** – UI elements like buttons, forms, and layouts.
- **Routes** – Pages and navigational structure.
- **State Management** – If applicable, state-related configurations.
- **API Calls** – Fetching and posting data to the backend.

### **2️⃣ server/** - The Backend (NestJS)

This folder is responsible for the **API logic, business rules, and database interactions**, including:

- **Controllers** – Define API endpoints.
- **Services** – Handle business logic.
- **Database Models** – Connect to NeonDB (PostgreSQL).
- **Middleware & Authentication** – If needed, request handling before reaching controllers.

### **3️⃣ .gitignore**

This file specifies which files and folders should be **excluded from version control (GitHub)**, such as:

- `node_modules/` – Dependencies that can be installed again.
- `.env` – Environment variables (database credentials, API keys).
- `.cache/` – Temporary files that shouldn’t be committed.

### **4️⃣ README.md**

A documentation file that helps **developers understand** the project’s purpose, installation steps, and usage.

---

## 📦 Installation

Clone the repository and install dependencies.

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/Remix_Nest.git
cd Remix_Nest
```
