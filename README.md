# express-session-app

A really simple example project to demonstrate, understand **and** test the use of express-session.

If you want to try "/login" with a real database, you need to provide MONGODB_URL as an environment variable.
That can easily be done by creating a .env file in the root directory of the project and adding the following line:

```shell
# example for a local MongoDB instance
MONGODB_URL=mongodb://localhost:27017/<database>
# example for a MongoDB Atlas instance
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

Then create a collection called "users" and add a document with the following structure:

```json
{
  "username": "admin",
  "password": "admin"
}
```

All other routes are working without a database connection.

## Installation

```
npm install
```

## Start

```
npm start
```

## Dev (nodemon)

```
npm run dev
```

## Test (jest)

```
npm test
```
