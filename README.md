# e-commerce

Features
    Product listing with images, prices, and stock status.
    Detailed product view with the ability to add to cart.
    Shopping cart to update quantities and remove items.
    Checkout functionality with order confirmation.

Install dependencies:
    npm install

Start the development server:
    npm start

Ensure the backend API is running at http://localhost:5132. Update the API_BASE_URL in src/redux/sagas.js if necessary.

Known Issues or Limitations
    Requires a running backend server for functionality.
    Basic error handling for API failures.
    Since there are persistant storage(database) to store data, order history will be lost.
    There are no feature to add stocks in the frontend.

Demo video link : https://youtu.be/X1BuR57-sTE