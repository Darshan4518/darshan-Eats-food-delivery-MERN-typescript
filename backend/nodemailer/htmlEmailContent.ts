export const htmlContent: string = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Email Verification</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f9fafc;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                padding: 30px;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border: 1px solid #e3e3e3;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 2px solid #f0f0f0;
            }
            .header h1 {
                margin: 0;
                color: #1a202c;
                font-size: 28px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content h2 {
                color: #1a202c;
                font-size: 24px;
            }
            .content p {
                color: #4a5568;
                font-size: 16px;
                line-height: 1.6;
            }
            .content .code {
                font-size: 26px;
                font-weight: bold;
                color: #2d3748;
                margin: 20px 0;
                padding: 15px;
                border: 2px dashed #e2e8f0;
                border-radius: 8px;
                background-color: #edf2f7;
            }
            .footer {
                text-align: center;
                padding: 30px;
                font-size: 14px;
                color: #718096;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Verify Your Email</h1>
            </div>
            <div class="content">
                <h2>Hello,</h2>
                <p>Thank you for registering with us. Please verify your email by entering the following code:</p>
                <div class="code">{verificationToken}</div>
                <p>If you did not request this, you can safely ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Darshan. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`;

export const generateWelcomeEmailHtml = (name: string) => {
  return `
      <html>
        <head>
          <style>
            .email-container {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              padding: 20px;
              background-color: #f9fafc;
              border-radius: 12px;
              max-width: 600px;
              margin: 40px auto;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              background-color: #48bb78;
              color: white;
              padding: 15px;
              text-align: center;
              border-radius: 12px 12px 0 0;
            }
            .email-body {
              padding: 25px;
              background-color: white;
              border-radius: 0 0 12px 12px;
              color: #2d3748;
            }
            .email-footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #718096;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Welcome to Darshan!</h1>
            </div>
            <div class="email-body">
              <p>Hi ${name},</p>
              <p>Your email has been successfully verified. Welcome aboard at Darshan!</p>
              <p>We hope you enjoy our services. If you have any questions, feel free to reach out to us.</p>
              <p>Best Regards,<br/>The Darshan Team</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2024 Darshan. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
};

export const generatePasswordResetEmailHtml = (resetURL: string) => {
  return `
      <html>
        <head>
          <style>
            .email-container {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              padding: 20px;
              background-color: #f9fafc;
              border-radius: 12px;
              max-width: 600px;
              margin: 40px auto;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              background-color: #e53e3e;
              color: white;
              padding: 15px;
              text-align: center;
              border-radius: 12px 12px 0 0;
            }
            .email-body {
              padding: 25px;
              background-color: white;
              border-radius: 0 0 12px 12px;
              color: #2d3748;
            }
            .button {
              display: inline-block;
              padding: 12px 25px;
              margin: 20px 0;
              font-size: 16px;
              color: white;
              background-color: #e53e3e;
              text-decoration: none;
              border-radius: 5px;
            }
            .email-footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #718096;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Reset Your Password</h1>
            </div>
            <div class="email-body">
              <p>Hello,</p>
              <p>We received a request to reset your password. Click the button below to reset it:</p>
              <a href="${resetURL}" class="button">Reset Password</a>
              <p>If you didn’t make this request, please ignore this email.</p>
              <p>Best regards,<br/>The Darshan Team</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2024 Darshan. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
};

export const generateResetSuccessEmailHtml = () => {
  return `
      <html>
        <head>
          <style>
            .email-container {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              padding: 20px;
              background-color: #f9fafc;
              border-radius: 12px;
              max-width: 600px;
              margin: 40px auto;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              background-color: #48bb78;
              color: white;
              padding: 15px;
              text-align: center;
              border-radius: 12px 12px 0 0;
            }
            .email-body {
              padding: 25px;
              background-color: white;
              border-radius: 0 0 12px 12px;
              color: #2d3748;
            }
            .email-footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #718096;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Password Reset Successful</h1>
            </div>
            <div class="email-body">
              <p>Hello,</p>
              <p>Your password has been successfully reset. You can now log in with your new password.</p>
              <p>If this wasn’t you, contact support immediately.</p>
              <p>Best regards,<br/>The Darshan Team</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2024 Darshan. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
};
