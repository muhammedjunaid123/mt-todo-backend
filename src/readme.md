# Todo Application - Express.js

## Description

This is a Todo application built using Express.js. The app allows users to manage their tasks, including creating, reading, updating, and deleting todos. Additionally, the application includes functionality to export the todo data to a GitHub Gist, enabling users to back up their data or share it easily. 

## Technologies Used

- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) or [In-Memory Store](#) (for data storage)
- [Jest](https://jestjs.io/) (for testing)
- [GitHub Gist API](https://docs.github.com/en/rest/gists) (for exporting data)

## Installation

To set up the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/muhammedjunaid123/mt-todo-backend.git
    cd mt-todo-backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

#run the test
npm run test
```

## Environment Setup

1. Create a `.env` file in the root of the project directory

2. Add the following environment variables to your `.env` file:

    ```
    PORT=3000
    MONGO_URL=mongodb://127.0.0.1:27017
    CORS_ORIGIN=http://localhost:4200
    USER_SECRET=HKJETU4GTHU848T45GFGE54T534TTJSDFBHJBASFHGASHFGH
    GITHUB_TOKEN=you can create with your github profile
    ```

