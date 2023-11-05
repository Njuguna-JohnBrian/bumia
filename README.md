
# Bumia E-commerce Backend Application

## Project Description

Bumia Shop is an e-commerce backend application that allows administrators to manage products, users to purchase products, and provide reviews. It also integrates Stripe for payment processing.

## Project Structure

- **server.ts**: Main entry point for the application.
- **src/**
  - **controllers/**: Contains controllers for different application features (e.g., product, user, review).
    - **Auth.controller.ts**
    - **Product.controller.ts**
  - **models/**: Defines Mongoose schemas for MongoDB data.
    - **User.ts**
  - **routes/**: Contains Express route definitions.
    - **auth.router.ts**
    - **product.router.ts**
  - **middleware/**: Middleware functions (e.g., authentication, validation).
    - **ErrorHandler.ts**
  - **config/**: Configuration files (e.g., Stripe API keys, database connection).
  - **utils/**: Utility functions (e.g., seeder for database population).
    - **RequestFunction.ts**
    - **Response.ts**
    - **forgotPassword.ts**
    - **login.ts**
    - **register.ts**
    - **resetPassword.ts**
    - **sendEmail.ts**
    - **updateProfile.ts**
    - **verifyEmail.ts**
  - **typings/**: Custom TypeScript type definitions.
  - **index.ts**: Initializes the Express app, sets up routes, and starts the server.

## Admin Features

- Admins can:
  - Add products.
  - Delete products.
  - Edit product details.

## User Features

- Users can:
  - Browse and search for products.
  - Add products to the cart.
  - Proceed to checkout and make payments using Stripe.
  - Leave reviews and ratings for products.

## Technologies Used

- Node.js and Express for the server.
- TypeScript for type-safe code.
- MongoDB as the database.
- Stripe for payment processing.

## Getting Started

1. Clone the repository: `git clone https://github.com/Njuguna-JohnBrian/bumia.git`
2. Install dependencies: `npm install`
3. Set up environment variables (e.g., Stripe API keys) in a `.env` file.
```dotenv
PORT=2345
NODE_ENV=dev
DB_LOCAL_URI=mongodb://127.0.0.1:27017/bumia
JWT_SECRET=YouCannotHackMe!123JWT
JWT_EXPIRES_TIME=24h
COOKIE_EXPIRES_TIME=24h
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_PASSWORD=55f35883f59496
SMTP_FROM_EMAIL=devjohnbrian@gmail.com
SMTP_FROM_NAME=Bumia
SMTP_USER=88f246835166cd
```

## API Documentation

- Swagger API documentation is available at [http://localhost:2345/bumia/v1/swagger/](http://localhost:2345/bumia/v1/swagger/).

## License

This project is licensed under the ISC License.

## Report Issues

If you encounter any issues, please report them on the [GitHub issues page](https://github.com/Njuguna-JohnBrian/bumia/issues).

## Author

- John Brian

