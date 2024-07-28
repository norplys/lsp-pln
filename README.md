# PLN Postpaid Payment

## Tech Stack

- Next.js
- Auth.js
- TypeScript
- PostgreSQL
- Tailwind CSS
- Shadcn UI
- Prisma
- Zod

## Development

Here are the steps to run the project locally.

1. Clone the repository

   ```bash
   git clone https://github.com/norplys/lsp-pln.git
   ```

1. Change directory to the project

   ```bash
   cd PLN-APP
   ```

1. Install dependencies

   ```bash
   npm i
   ```

1. Edit env file, Make sure to fill the credentials correctly.

   ```bash
    .env
   ```

1. Run migrations

   ```bash
   npx prisma migrate dev
   ```

1. Run seeders

   ```bash
   npx prisma db seed
   ```

1. Run the app

   ```bash
   npm run dev
   ```