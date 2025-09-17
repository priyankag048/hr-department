# HR Department

A simple Employee HR application built as a monorepo, featuring a React-based web frontend and a Node.js/Express backend service, with a PostgreSQL database and managed database migrations.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Applications](#running-the-applications)
  - [Running Tests](#running-tests)
- [Database Migrations](#database-migrations)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

---

## Project Structure

- **applications/employee-services/**: Express backend for employee and department management.
- **applications/web/**: React frontend for HR operations.
- **libraries/database/**: Database connection utilities and SQL migrations.

---

## Features

- **Employee Management**: Add, update, and remove employees.
- **Department Management**: List and assign employees to departments.
- **Unassigned Employees**: View employees not assigned to any department.
- **Database Migrations**: Versioned SQL migrations using [Umzug](https://github.com/sequelize/umzug).
- **Containerization**: Dockerfiles for both frontend and backend for easy deployment.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (for monorepo management)
- [PostgreSQL](https://www.postgresql.org/) (for database)
- [Docker](https://www.docker.com/) (optional, for containerization)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd hr-department
   ```

2. Install dependencies:
    ```bash
    pnpm install

    ```

3. Configure environment variables:

    Set up your PostgreSQL connection details as required by the backend and database library.

    Running the Applications

    Start the Backend (Employee Services)

    ```  bash
      cd applications/employee-services
      pnpm start
      Starts the Express server (default: http://localhost:3001).
    ```

4. Start the Frontend (Web)
    ```bash
    cd applications/web
    pnpm start
    Starts the React development server (default: http://localhost:3000).
    ```

5. Database Migrations

    Migrations are managed in libraries/database/migrations/ as SQL files.

    To run migrations run
    ```
      pnpm start:db-migrate
    ```

## Development

- Monorepo: Uses pnpm workspaces for dependency management.

- Shared Libraries: Common database logic is in libraries/database.

- Linting: ESLint is configured for the web app.

- TypeScript: Used throughout for type safety.

## Deployment

- Both frontend and backend have Dockerfiles for containerized deployment.


## License
This project is licensed under the MIT License.
