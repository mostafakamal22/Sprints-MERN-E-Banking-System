<h1 id="title" align="center">Sprints-MERN-E-Banking-System</h1>

<p align="center"><img src="https://socialify.git.ci/mostafakamal22/Sprints-MERN-E-Banking-System/image?font=Bitter&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Charlie%20Brown&amp;stargazers=1&amp;theme=Auto" alt="project-image"></p>

<p id="description">This Full Stack MERN Application is a comprehensive E-Bank system that allows users to create and manage their own secure online bank accounts. With this system users can easily perform common banking tasks such as depositing withdrawing and transferring money at any time. Additionally the application features an intuitive admin dashboard that enables administrators to efficiently manage user account requests and bank account statuses with ease. Whether you're a user looking for a convenient and secure way to manage your finances or an administrator seeking a powerful tool to streamline your workflow this application is the perfect solution.</p>

<h2>🚀 Demo</h2>

[https://ebank-2t3r.onrender.com](https://ebank-2t3r.onrender.com)

<h2>Project Screenshots:</h2>

<img src="https://mkwebdev.onrender.com/images/e-bank.webp" alt="project-screenshot" width="100%" height="100%/">

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Full Stack MERN Application (MongoDB Express.js React Node.js)
*   Secure user authentication and authorization using JSON Web Tokens (JWT)
*   User account creation and management (Deposit Withdraw and Transfer)
*   Admin dashboard for managing user account requests and bank account statuses
*   Responsive design using Tailwindcss for compatibility with a range of devices
*   Efficient and intuitive user interface for ease of use

<h2>🛠️ Installation Steps:</h2>

### Adding a Manual Owner(Admin)

You NEED to add the first Admin(The Owner) Of the project after that you can add any additional admins/owners through admins' dashboard.

**You have Two Approaches:-**

<p>1. Add Manual Owner Document Direct to MongoDB cluster collection</p>

To add a manual Owner to the E-Banking system, follow these steps:

1. Open your MongoDB cluster and navigate to the Admins collection.
2. Click on the "Insert Document" button to add a new document to the collection.
3. Copy the admin schema and paste it into the document editor.
4. Replace the values in the schema with the admin's name, email, password, and role.
5. Save the document.

<p>2. Add Owner Through Public API</p>

To create the first owner of the e-bank platform, you can use the ```api/admins/owner/create``` route. This feature is publicly accessible and can be used using Postman, Thunder client, or any other REST client.

Note: Make sure to comment out or remove this feature from your code after creating the first owner to avoid any security risks.

**Request**

To create the first owner, send a ```POST request``` to the ```api/admins/owner/create``` route with the following required parameters:
```
    name: The name of the first owner.
    email: The email address of the first owner.
    password: The password of the first owner.
```

**Example request using cURL:**
```
scheme

curl --location --request POST 'http://localhost:3000/api/admins/owner/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}'
```

**Response**

If the request is successful, the API will return a JSON response with the following properties:
```
    _id: The ID of the created admin.
    admin_name: The name of the created admin.
    -email: The email address of the created admin.
    role: The role of the created admin, which will be set to "owner".
```
**Example response:**
```
apache

{
    "_id": "60af48b1f6e3c30c9cbbf0ad",
    "admin_name": "John Doe",
    "email": "johndoe@example.com",
    "role": "owner"
}
```
If there is an error during the creation process, the API will return an error message in the response body.

**Security Note**

It is important to note that this feature is publicly accessible and can be used by anyone. Therefore, it is crucial that you remove or comment out this feature from your code after creating the first owner. Leaving it in your code exposes your application to security risks.

That's it! Follow these steps to create the first owner of your e-bank platform using the ```api/admins/owner/create``` route.

Let me know if you have any questions or need further assistance.


### Setting Up API URL On Frontend

please make sure to add the following lines in your .env file or you will get a CORS Error after production deploy:

```
MONGO_URI= your Mongodb URI
JWT_SECRET=your JWT secret
CORS_DOMAINS = http://localhost:3000, https://yourAPIHost
```

Additionally, you need to modify every services file in the features directory to make API calls to your API host. 
For example, in ```Frontend\src\state\features\Account\accountServices.tsx```, you need to edit the following line:

```
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://ebank-2t3r.onrender.com/api/account/"
    : "http://localhost:5000/api/account/";
 ```

To be like this:

```
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://YourAPIHost/api/account/"
    : "http://localhost:5000/api/account/";
  ```


### Accessing The Admin Dashboard:-

You can use the route ``"/admins/login"`` to log in to the admin's dashboard. However, you will need a registered admin/owner account in the database before you can do so. You can manually add a new admin document into the MongoDB database admins collection with the role of "owner" THE STEPS ARE SHOWN ABOVE. Once you have created the account and logged in with the credentials, you can add other admins through the admin's dashboard.

### Getting Started

<p>1. install (Frontend & Backend) dependencies</p>

for backend:-
```
npm insatll
```

for frontend:-
```
cd Frontend
npm insatll
```

<p>2. run the server</p>

```
cd ..
npm run both
```
