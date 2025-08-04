Library Management System

🔧 Tech Stack

Frontend: Angular
Backend: ASP.NET Core Web API
Database: SQL Server (Database First Approach)
Tools: Visual Studio, Visual Studio Code, SQL Server Management Studio (SSMS)
🎯 Features

👤 Customer

User Registration & Login
Browse/Search books by Category
View book Details
View book History
Edit Profile
🛠️ Admin

Secure Admin Login
Add/Update/Delete books
Manage Categories
issue books and return books
📁 Project Structure

/Frontend - Angular components & services /Backend - ASP.NET Core Web API controllers & models /Database - DB-first entity models, connection configs /Documents - SRS Document, PPT Presentation

yaml Copy Edit

📄 Documentation

SRS Document (PDF)
These files include detailed functional and non-functional requirements, ER diagrams, UI flows, and system design specifications.

🚀 Getting Started

Prerequisites

Node.js & Angular CLI
.NET SDK (for ASP.NET Core)
SQL Server
Visual Studio / VS Code
Steps

Clone the repository
git clone https://github.com/shekar-506/LibraryManagementSystem.git
cd LibraryManagementSystem
Database Setup

Configure connection string in appsettings.json

Use Database-First approach with EF Core

Run Backend (ASP.NET Core Web API)

bash Copy Edit dotnet restore dotnet build dotnet run Run Frontend (Angular)

bash Copy Edit cd /Frontend npm install ng serve

📌 Notes This project demonstrates practical implementation of full-stack development using Angular and ASP.NET Core.

It includes secure authentication, responsive design, component-based UI, RESTful APIs, and database-first integration with Entity Framework.

All critical operations are logged and the system is designed to be scalable and maintainable.

🔐 Disclaimer: This is a training/demo project and not intended for production use without further enhancements to security, optimization, and testing.
# LibraryFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

