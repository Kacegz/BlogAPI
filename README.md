# Blog API app
## 📋 Description
This is a blog REST API that allows all CRUD operations on posts and comments and includes user authentication.

## 🔍 Preview
- Client page
- CMS page
## 🔗 Links
- [API source code](https://github.com/Kacegz/BlogAPI)
- [Client source code]()
- [CMS source code]()
## ✨ Features
- CRUD operations for posts and comments
- User creation with authentication, authorization and encryption using bcryptjs
## ⚙️ Installation
1. Clone the repo:
```sh
git clone git@github.com:Kacegz/BlogAPI.git
```
2. Navigate to the cloned repo
```sh
cd BlogAPI
```
3. Install [NPM and NodeJS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
4. Install dependencies:
```sh
npm install
```
5. Create .env file with variables:
```sh
db="Connection string to your mongo database"
secretkey="Your secret key for JWT token"
allowList="Array of allowed cors headers"
```
6. Start server
```sh
npm run start
```
__The server will start on ```localhost:3000```__