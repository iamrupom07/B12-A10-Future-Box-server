# 📦 Habit Tracker Server

This repository contains the server-side (backend) code for **Habit Tracker**, a full-stack web application. It is responsible for handling business logic, API endpoints, database management, and user authentication.


## 🔗 Quick Links

* **Live Website:** `[https://habittrackerrupom.netlify.app/]`
* **Client-Side Repository:** `[https://github.com/iamrupom07/B12-A10-Future-Box-client]`
* **Live Server API:** `[https://habittrackerapi.vercel.app/]`

---

## 🚀 Features

* **Secure RESTful API:** Provides all necessary endpoints for the client-side application.
* **Database Management:** Full CRUD (Create, Read, Update, Delete) operations for [products, subscriptions, user data, etc.].
* **User-Specific Data:** API routes to fetch data specific to the logged-in user (e.g., "My Orders," "My Profile").


---

## 🛠️ Technology Stack

* **Runtime:** [Node.js](https://nodejs.org/en/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **Middleware:** [CORS](https://www.npmjs.com/package/cors), [dotenv](https://www.npmjs.com/package/dotenv)
* **Hosting:** [Vercel]

---
## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) (which includes npm) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your local machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/iamrupom07/B12-A10-Future-Box-server.git](https://github.com/iamrupom07/B12-A10-Future-Box-server.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd B12-A10-Future-Box-server
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Create an environment file:**
    Create a `.env` file in the root of the project and add the following variables.

    ```.env
    # Server Port
    PORT=5000

    # MongoDB Connection String
    DB_URI=[Your_MongoDB_Connection_String]


    # Client-side URL (for CORS)
    CLIENT_SIDE_URL=[http://localhost:5173]
    ```

5.  **Run the server:**
    To run the server in development mode (with hot-reloading using nodemon):
    ```sh
    nodemon index.js
    ```
    Or, to run it in production mode:
    ```sh
    npm start
    ```

The server will be running on `http://localhost:5000`.

---



## 🧑‍💻 Author

* **Rupom (iamrupom07)**
* GitHub: [@iamrupom07](https://github.com/iamrupom07)

