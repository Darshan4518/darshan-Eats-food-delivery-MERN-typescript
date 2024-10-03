<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Darshan-Eats - README</title>
</head>
<body>

  <h1>Darshan-Eats</h1>
  <p>Darshan-Eats is a full-stack food delivery website built using TypeScript for both the frontend and backend. The project allows users to order food from their favorite restaurants, and provides an admin panel for managing restaurants, menus, and orders. The website features advanced authentication and role-based access control.</p>

  <h2>Live Demo</h2>
  <p>Check out the live site: <a href="https://darshan-eats-food-delivery-mern-typescript.vercel.app/" target="_blank">https://darshan-eats-food-delivery-mern-typescript.vercel.app</a></p>

  <h2>Features</h2>
  <ul>
    <li><strong>Advanced Authentication:</strong>
      <ul>
        <li>Email verification using <strong>Nodemailer</strong></li>
        <li>Forgot password and reset password functionality</li>
        <li>Login as admin or user</li>
      </ul>
    </li>
    <li><strong>Role-based Access:</strong>
      <ul>
        <li>Users can browse and order from restaurants</li>
        <li>Admins can create, update, and delete restaurants and menus</li>
        <li>Admins are limited to creating only one restaurant</li>
      </ul>
    </li>
    <li><strong>User Features:</strong>
      <ul>
        <li>Order food from favorite restaurants</li>
        <li>Add items to the cart</li>
        <li>Payment gateway integration</li>
      </ul>
    </li>
    <li><strong>Admin Features:</strong>
      <ul>
        <li>Manage restaurants and menus</li>
        <li>View recent orders</li>
      </ul>
    </li>
  </ul>

  <h2>Dark Mode and Light Mode</h2>
  <p>The website supports both dark and light themes, allowing users to toggle between them for a personalized experience.</p>

  <h2>Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong>
      <ul>
        <li>React.js with TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Shadcn UI</li>
        <li>Magic UI</li>
        <li>Zustand for state management</li>
        <li>Axios for API requests</li>
        <li>Zod for schema validation</li>
        <li>Cloudinary for image management</li>
      </ul>
    </li>
    <li><strong>Backend:</strong>
      <ul>
        <li>Node.js with TypeScript</li>
        <li>Express.js for server-side logic</li>
        <li>MongoDB for database</li>
        <li>Nodemailer for email services</li>
        <li>JWT for authentication</li>
      </ul>
    </li>
  </ul>

  <h2>Project Structure</h2>
  <h3>Admin Panel:</h3>
  <ul>
    <li>Admins can:
      <ul>
        <li>Create, update, and delete restaurants (limited to one restaurant per admin)</li>
        <li>Manage menus for restaurants</li>
        <li>View recent orders</li>
      </ul>
    </li>
  </ul>

  <h3>User Panel:</h3>
  <ul>
    <li>Users can:
      <ul>
        <li>Order from restaurants</li>
        <li>Add items to the cart</li>
        <li>Complete payments via the integrated payment gateway</li>
      </ul>
    </li>
  </ul>

  <h3>Authentication:</h3>
  <ul>
    <li>Sign up with email verification</li>
    <li>Forgot and reset password flows</li>
    <li>Login as an admin or a user</li>
  </ul>

  <h2>How to Run</h2>
  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js installed</li>
    <li>MongoDB instance</li>
    <li>Cloudinary account for image storage</li>
    <li>Payment gateway API keys (if using a real payment system)</li>
  </ul>

  <h3>Setup</h3>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/your-username/darshan-eats.git
cd darshan-eats
      </code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Set up environment variables:
      <p>Create a <code>.env</code> file with the following variables:</p>
      <ul>
        <li>MongoDB connection string</li>
        <li>JWT secret</li>
        <li>Nodemailer configuration</li>
        <li>Cloudinary API credentials</li>
      </ul>
    </li>
    <li>Start the development server:
      <pre><code>npm run dev</code></pre>
    </li>
    <li>Open your browser at <code>http://localhost:3000</code> to access the application.</li>
  </ol>

  <h2>Screenshots</h2>
  <p>Here are some screenshots of the application:</p>
  
![Screenshot 2024-10-03 120645](https://github.com/user-attachments/assets/1326f4d7-d19d-4cb1-9d52-2502613b0bb8)

![Screenshot 2024-10-03 120703](https://github.com/user-attachments/assets/ab67727f-dde9-4aab-b732-b8fb32a35728)

<h3> for User </h3>

![Screenshot 2024-10-03 120843](https://github.com/user-attachments/assets/31fbb615-86cc-4974-a9a4-cbaadaa243ee)

![Screenshot 2024-10-03 121007](https://github.com/user-attachments/assets/6b4859d1-553a-463e-a813-92e55cb7b5e5)

![Screenshot 2024-10-03 121034](https://github.com/user-attachments/assets/0e622335-8162-41eb-8f13-0703b146656a)

![Screenshot 2024-10-03 121050](https://github.com/user-attachments/assets/6b6ef023-2212-4fce-962b-214411077916)

![Screenshot 2024-10-03 121159](https://github.com/user-attachments/assets/f516e4f1-7a36-426c-9c7a-8340867da3ac)

![Screenshot 2024-10-03 121242](https://github.com/user-attachments/assets/6d2e4035-0a40-491f-aa26-2ccb1ec7fb25)

![Screenshot 2024-10-03 121432](https://github.com/user-attachments/assets/ba839415-acb4-4220-a51f-271d037ba637)



  <h2>Contributing</h2>
  <p>If you find any issues or want to contribute to this project, feel free to open an issue or submit a pull request.</p>

  <hr>
  <p>This project is built to provide a robust platform for food delivery, combining powerful tools like <strong>React</strong>, <strong>Node.js</strong>, <strong>MongoDB</strong>, and various UI and utility libraries.</p>

</body>
</html>
