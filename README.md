# Node REST API + JWT in Typescript
- basically it's another API project that not only contains user management with authentication and authorization, it also has product management
- Json Web Token (JWT) protected products routes
- Manually done authentication
  
# Installation
- Clone the repository
    
    `git clone https://github.com/B4PH0/merch-store`

- Install dependencies
  
    `cd merch-store`
    
    `npm install`

# Configure
- Enter your credentials such as connection text for MongoDB, JWT hash, and API port
    
    `DB_CONNECTION_STRING=`

    `API_PORT=`

    `SECRET=`

- Ok, with everything the .env file configured, just run the project
  
    `npm run dev`

# Getting started
- When starting the project, it will list all active routes, including user management and product management
- To create, view, or delete a product, you will need to be a logged in user, otherwise the route will return this to you
  
    ```
    {
        "status": 401,
        "message": "Access denied."
    }
    ```

## Step 1: Register a user
- Send a POST request to `http://localhost:${API_PORT}/users/register` with following payload:
  
    ```
    {
        "name": "User Name",
        "email": "User Email",
        "password": "User password"
    }
    ``` 
- If it occurs according to the parameters, the following will be returned to you:
    
    ```
    {
        "status": 201,
        "message": "User created"
    }
    ```
## Step 2: Login user
- With registered user, send a POST request to `http://localhost:${API_PORT}/users/login` with following payload:
  
    ```
    {
        "email": "Email logged in",
        "password": "Email password
    }
    ```
- If it occurs according to the parameters, it will return the following response:
  
    ```
    {
        "status": 200",
        "message": "Authorization made."
    }
    ```

- be brief, as the authorization token will expire in five minutes

## Step 3: create, view, or delete a product
- Send a GET request to `http://localhost:${API_PORT}/product/view/:id`, enter the product ID, and if it exists, the information will be returned in JSON format

- Send a POST request to `http://localhost:${API_PORT}/product/create` and create the product following the payload:
  
    ```
    {
        "id": Any number
        "name": "Product's name",
        "description": "Product description",
        "price": price of the product
    }
    ```

- If you want to remove a product from stock, send a DELETE request to `http://localhost:${API_PORT}/product/delete/:id`, enter the ID of your registered product, when deleted the response will be the same as this:

    ```
    {
        "status": 200,
        "message: "Excluded product."
    }
    ```