## CRUD application using ReactJS ##
Application provides UI for manipulation of orders with the following attributes:
- ID
- Product
- Quantity
- Active Flag
- Create Time
- Change Time

By default, website uses in-memory data store.

## Setup ##
1. Install [NodeJS](https://nodejs.org/)
2. Install [Yarn](https://yarnpkg.com/en/docs/install)
3. Install dependencies
```bash
yarn install
```
4. Run at [http://localhost:3000](http://localhost:3000)
```bash
yarn start
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## API Integration ##
1. Deploy backend API from [aws-lambda-nodejs-crud-api](https://github.com/chyuck/aws-lambda-nodejs-crud-api) repository to AWS.

2. Add **.env.development.local** file to root of the project with the following content:
```
REACT_APP_USE_API=true
REACT_APP_API_URL=https://xxx.execute-api.us-east-1.amazonaws.com/dev
```
Replace **REACT_APP_API_URL** with real URL of deployed backend API.

3. Restart website.
