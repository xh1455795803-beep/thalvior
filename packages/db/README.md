# @thalvior/db

Shared Prisma database package for Thalvior services.

- `db` exports the shared Prisma client.
- Prisma schema lives in `schema.prisma`.
- Runtime configuration uses `DATABASE_URL`.

The API layer should access persistence through application repositories rather than importing Prisma models into controllers.
