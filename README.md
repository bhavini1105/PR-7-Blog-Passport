# PR-7-Blog-Passport
# PR-7 Blog Passport

## Overview
PR-7 Blog Passport is a blog application that implements user authentication using Passport.js. This project enables users to sign up, log in, and manage their blog posts securely.

## Features
- User authentication with Passport.js
- Secure login and signup system
- Blog post creation, editing, and deletion
- Session management
- Express and MongoDB integration

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js (for authentication)
- EJS (Embedded JavaScript for templating)
- Bootstrap (for styling)

## Installation
Follow these steps to set up the project on your local machine:

Password :
username:admin
password:12345


1. Clone the repository:
   ```sh
   git clone https://github.com/bhavini1105/PR-7-Blog-Passport.git
   ```

2. Navigate to the project directory:
   ```sh
   cd PR-7-Blog-Passport
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Create a `.env` file and add the following environment variables:
   ```sh
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   ```

5. Start the development server:
   ```sh
   npm start
   ```

6. Open your browser and visit:
   ```sh
   http://localhost:3000
   ```


## Usage
1. Sign up or log in using your credentials.
2. Create, edit, and delete blog posts.
3. Log out when finished.

