#### Generate new keys: https://travistidwell.com/jsencrypt/demo/

#### Base64 encode the keys: https://www.base64encode.org/


## What you will need
* A running instance of MongoDB
* Postman
* An IDE or text editor (VS Code)
* A web browser
* Node.js installed

## Concepts
* REST API principals
    * CRUD
    * HTTP methods
* JWT & refresh tokens
* Request validation
## Technologies
* Node.js
* MongoDB with Mongoose
* TypeScript
* Express.js & Express.js middleware
* Zod validation

## Video structure
1. What are we going to build (Postman demo)
2. Code walk-through
3. Bootstrap application
   1. Setup express JS
   2. Create routes function
   3. Setup database connection
   4. Setup logger
   5. Validate request middleware
4. Registration
   1. Create user model
   2. Create user endpoint
   3. Create user session
   4. Deserialize user middleware (refresh tokens)
   5. Get sessions
   6. Delete session
   7. Require user middleware
5. Product resource
   1. Create product model
   2. Create product
   3. Read product
   4. Update product
   5. Delete product


## Data flow
![](./diagrams/data-flow.png)


## Access & refresh token flow
![](./diagrams/refresh-token-flow.png)


# Deployment

## What will we use
* Docker (image)
* docker-compose (container)
* Caddy - Web server
* DigitalOcean
