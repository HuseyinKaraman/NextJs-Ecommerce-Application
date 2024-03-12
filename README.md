# Next.js E-commerce Application

## Application Specification

NextEcom is a web application built with Next.js, React, Stripe, Tailwind and other libraries. It provides features for e-commerce, such as product display, user authentication, and payment processing.

<a href="https://next-js-ecommerce-application.vercel.app/" target="_blank">Demo Link</a> <br/>
<strong>user mail:</strong> test2@gmail.com <strong>password</strong> ?$vs>2kL39H5x^A  <br/>
<strong>admin mail:</strong> test@gmail.com <strong>password</strong> ?$vs>2kL39H5x^A  <br/>



### Technologies Used
- Next.js
- React
- MongoDB
- Node.js
- Express.js
- Tailwind CSS
- Axios
- JWT (JSON Web Tokens) for authentication
- Stripe for payment processing


### Application Features:

1. User Authentication:
   - Users can sign up and log in to their accounts.
   - JWT tokens are used for authentication and authorization.

2. Product Management:
   - Admin users can add, edit, and delete products.
   - Products are categorized for easy navigation.

3. Shopping Cart:
   - Users can add products to their cart and adjust quantities.
   - Cart items are stored in the database for persistence.

4. Checkout Process:
   - Users can proceed to checkout and enter shipping information.
   - Stripe is integrated for secure payment processing.

5. Order History:
   - Users can view their order history and details of past purchases.
  
6. Search and Filter:
   - Users can search for products using keywords.
   - Filtering options are available based on categories, price range, etc.

7. Responsive Design:
   - The application is designed to be mobile-friendly and responsive across devices.
 
8. Star Rating & Commenting System:
   - Users can rate products using a star rating system (e.g., 1 to 5 stars).
   - Users can leave comments and reviews on products, including text feedback and ratings.
   - Ratings and comments contribute to the overall product rating displayed to users.

9. Coupon System:
   - Admin users can create and manage coupons for discounts on products.
   - Coupons can be applied during checkout to receive discounts on eligible items.
   - Coupons can have various properties such as percentage discounts, fixed amount discounts, expiration dates, usage limits, etc.
   - The system validates and applies coupons during the checkout process, adjusting the final order total accordingly.

10. Admin Dashboard:
   - Admin users have access to a dashboard to manage products, orders, and users.

11. Email Notifications:
   - Users receive email notifications for order confirmation, shipping updates, etc.
   - Admin users receive notifications for new orders and other important events.

12. Social Media Integration:
    - Users can share products on social media platforms.
    - Social login options are available for user convenience.

13. Performance Optimization:
    - Application is optimized for speed and performance using Next.js features like server-side rendering and incremental static regeneration.

14. Security Features:
    - Implementation of best practices for data security, including encryption of sensitive information and protection against common vulnerabilities.
    

# Getting Started:

To run the application locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/HuseyinKaraman/NextJs-Ecommerce-Application.git

2. Navigate to the project directory:
   cd NextJs-Ecommerce-Application

3. Install dependencies:
   npm install

4. Set up environment variables:
   - Create a .env.local file in the root directory.
   - Add necessary environment variables like MongoDB connection string, JWT secret, Stripe API keys, etc.

5. Start the development server:
   npm run dev

6. Open your browser and navigate to http://localhost:3000 to view the application.

Contributors:

- Huseyin Karaman (https://github.com/HuseyinKaraman)

License:

This project is licensed under the MIT License - see the LICENSE file for details.
