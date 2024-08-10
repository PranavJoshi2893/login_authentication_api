## Procedure to Run Express Server

### Setting Up Environment Variables

#### If DB Runs on Local System

Create a `.env` file and add the following environment variables:

```env
DATABASE_URL=postgresql://<username>:<password>@${HOST}:${PORT}/<DB_NAME>?schema=public
HOST= <Preffered IP address>
PORT= <Preffered PORT>
ADMIN_FIRSTNAME = <First Name for first account setup>
ADMIN_LASTNAME = <Last Name for first account setup>
ADMIN_EMAIL = <Email for first account setup>
ADMIN_PASSWORD = <Password for first account setup>
```

#### If DB runs on Docker

Add these additional environment variables in the `.env` file:

```env
POSTGRES_USER=<USERNAME>
POSTGRES_PASSWORD=<PASSWORD>
POSTGRES_DB=<DB_NAME>
```

### Setting Up PostgreSQL with Docker

To start the PostgreSQL database in a Docker container, run:

```bash
docker-compose up dev-db -d
```

### Installing NPM Packages

Install the required npm packages:

```bash
npm install
```

### Prisma Setup

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```
