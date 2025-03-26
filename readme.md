# MERN Stack E-Commerce

## Overview
This is a full-stack eCommerce application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The project is currently in the development phase and currently has user authentication and an initial admin panel setup.

## Features (Completed & In-Progress)
- ✅ User authentication (JWT-based login & signup)
- ⚙️ Admin panel (partially implemented)
- ⏳ Product catalog with categories and filters (upcoming)
- ⏳ Shopping cart functionality (upcoming)
- ⏳ Checkout process with payment integration (upcoming)
- ⏳ Redux Toolkit for state management (partially implemented)
- ⏳ Responsive design using Tailwind CSS & Shadcn

## Tech Stack
### Frontend:
- React.js
- Redux Toolkit
- Tailwind CSS & Shadcn

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB (local or cloud-based like MongoDB Atlas)
- Git

### Steps to Run the Project
#### 1. Clone the repository
```sh
https://github.com/Avijit07x/MERN-Ecommerce.git
cd your-repo
```

#### 2. Install dependencies
##### Server
```sh
cd server
npm install
```
##### Client
```sh
cd client
npm install
```

#### 3. Set up environment variables
Create a `.env` file in the `server` folder and add the following:
```
MONGO_URI=
CLIENT_URL=
PORT=
TOKEN_KEY=
REFRESH_TOKEN_KEY=
TOKEN_KEY_EXPIRY=
REFRESH_TOKEN_KEY_EXPIRY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_URL=
GMAIL_USER=
GMAIL_PASSWORD=
```

#### 4. Start the development server
##### Backend
```sh
cd server
npm run dev
```
##### Frontend
```sh
cd client
npm run dev
```

#### 5. Open the application
Once both servers are running, open your browser and navigate to:
```
http://localhost:8000
```

## Contribution
If you would like to contribute, feel free to fork the repository and create a pull request.

## License
This project is licensed under the MIT License.

---
### Note:
The project is currently in active development. More features like product catalog, cart functionality, and payment integration will be added soon. Stay tuned! 🚀

