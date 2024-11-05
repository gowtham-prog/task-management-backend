
# Task Management with Node.js and Express

## Description
This is a Node.js project that uses the Express framework.

## Prerequisites
Before running this project, ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (v20.11.0 recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (installed locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/atlas/database))


## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <this repo>
   cd <taskManagement repo>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory of your project:**
   Create the file if it doesn't exist and add the following line to it:
   ```bash
   JWT_SECRET="secret"
   ```

4. **Start the server:**
   Run the following command to start the development server:
   ```bash
   npm start
   ```
   or, for development with automatic reloading:
   ```bash
   npm run dev
   ```



## Running the Project
To start the project, you can use one of the following scripts defined in `package.json`:

- **`npm start`** – Starts the server in production mode.
- **`npm run dev`** – Starts the server with [nodemon](https://nodemon.io/) for development (automatically restarts the server when files change).


## Testing the Project

### Unit and Integration Testing
1. **Install testing tools (e.g., Jest):**
   ```bash
   npm install --save-dev jest
   ```

2. **Run tests:**
   Ensure you have some test files (e.g., `src/tests/`) and run:
   ```bash
   npm test
   ```
