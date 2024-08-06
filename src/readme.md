# Todo Application - Express.js

## Description

This Todo application, built with Express.js, allows users to manage tasks efficiently. Users can create, read, update, and delete todos, and also export their data to a GitHub Gist for backup or sharing purposes.

## Technologies Used

- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Jest](https://jestjs.io/) (for testing)
- [GitHub Gist API](https://docs.github.com/en/rest/gists) (for exporting data)
- 



## Running the Application

To run the application, use the appropriate command based on your needs:

- **Development Mode**: `npm run start`
- **Watch Mode**: `npm run dev`
- **Run Tests**: `npm run test`

## Contact

For any questions, suggestions, or support, feel free to reach out:

- **Email:** [junaidvinu133@gmail.com](mailto:junaidvinu133@gmail.com)



Thank you for checking out the Todo application! We hope it helps you manage your tasks efficiently. If you have any feedback or need assistance, don't hesitate to contact me.


## Environment Setup

Ensure you have a `.env` file in the root directory with the following environment variables:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017
CORS_ORIGIN=http://localhost:4200
USER_SECRET=your_secret_key
GITHUB_TOKEN=your_github_token