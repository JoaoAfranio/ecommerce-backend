
# Ecommerce Backend

This is a basic backend project that uses Express.js, TypeScript and Prisma in order to create a backend that validates some business rules for adjustment of products prices.

Some of Bussines Rules are:

- The system should receive a csv file containing the product code and the new price that will be loaded.
- The system must prevent the the sale price of the products is below their cost.
- The system must prevent any readjustment greater or less than 10% of the current price of the product.
- When readjusting the price of a package, the same file must contain the price adjustments of the components of the package so that the final price of the sum of the components equals the package price.

## Run Locally

#### Follow the instructions below to configure and run the project.

Clone the project

```bash
  git clone https://github.com/JoaoAfranio/ecommerce-backend
```

Go to the project directory

```bash
  cd ecommerce-backend
```

Install dependencies

```bash
  npm install
```

Run the migrations

```bash
  npx prisma migrate dev
```

Run the seed (if needed)

```bash
  npx prisma db seed
```

Configure .env file

```bash
  PORT=4000
  DATABASE_URL="mysql://example_user:example_password@localhost:3306/ecommerce"
```
## Technologies Used

- Node.js
- Express
- TypeScript
- Prisma
- MySQL

## Related

Link frontend application

[FrontEnd Ecommerce](https://github.com/JoaoAfranio/ecommerce-frontend)

