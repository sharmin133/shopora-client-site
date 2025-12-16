Shopora 

This is the frontend of the Shopora e-commerce application built with [your framework, e.g., React/Vite].

Prerequisites

Node.js (v18+ recommended)

npm or yarn

Access to the backend API (deployed or local)

Getting Started

Clone the repository

git clone <your-client-repo-url>
cd shopora-client


Install dependencies

npm install
# or
yarn install


Set up environment variables

Create a .env file in the root of the project:

VITE_API_BASE_URL=https://shopora-server.vercel.app
VITE_image_upload_key=<your-imgbb-key>


VITE_API_BASE_URL: Your backend API URL (deployed on Vercel or local)

VITE_image_upload_key: API key for image upload (if using imgbb)

Run the development server

npm run dev
# or
yarn dev


The client will run at http://localhost:5173
 (default for Vite). Open your browser to see the app.

Build for production

npm run build
# or
yarn build


The production-ready files will be in the dist folder. You can deploy these to Vercel, Netlify, or any static hosting service.