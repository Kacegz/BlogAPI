# Blog API app
## 📋 Description
This is a blog REST API that allows all CRUD operations on posts and comments and includes user authentication.

## 🔍 Preview
- Client page
- CMS page
## 🔗 Links
- [API source code](https://github.com/Kacegz/BlogAPI)
- [Client Live](https://kacegz-blogclient.vercel.app/)
- [Client source code](https://github.com/Kacegz/Blog-Client)
- [CMS Live](https://kacegz-blogcms.vercel.app/)
- [CMS source code](https://github.com/Kacegz/BlogCMS)
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
## 🗺️Endpoints
### Users
- ```POST /register``` 
- - Create user
- - Request:
```json
{
    "username":"username",
    "password": "password",
    "confirm": "password to confirm"
}
```
- ```POST /login``` 
- - Log in user
- - Request:
```json
{
    "username":"username",
    "password": "password",
}
```

### Posts
- ```GET /posts``` 
- - Get all posts

- ```GET /posts/:postid``` 
- - Get a certain post

- ```POST /posts``` 
- - Create a post

- ```PUT /posts/:postid``` 
- - Update a post

- ```DELETE /posts/:postid``` 
- - Delete post

### Comments
- ```GET /posts/:postid/comments``` 
- - Get all posts

- ```POST /posts/:postid/comments``` 
- - Create a post

- ```PUT /posts/:postid/comments/:commentid``` 
- - Update a post

- ```DELETE /posts/:postid/comments/:commentid``` 
- - Delete a comment
