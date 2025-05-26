# 🎬 Movie Website

**Movie Website** is a dynamic, full-featured film platform where users can register, browse, and interact with a collection of movies.  
The system supports both regular users and admin roles, offering features like adding films, liking, commenting, and more.  
The application uses Access & Refresh Tokens for secure authentication and a relational database for storage.

---

## 🚀 Features

- 🔐 **Authentication** with Access and Refresh Tokens (Register/Login)
- 👤 **User Profiles**: View and edit profile details
- 🛡️ **Role-based access**: Admins can add new movies
- 🎞️ **Movie Management**:
  - Add/update/delete movies (admin only)
  - Like and comment on movies (users)
  - Like comments
- 🔍 **Search and Filter** movies by title or category
- 🌟 **Top-rated** IMDb movies and **Recommended** suggestions
- 🏷️ **Movie Categories** and user favorites
- 💬 **Subtitles support** for enhanced accessibility
- 📧 **Contact Form**: Send messages to site admin

---

## 🛠️ Tech Stack

| Layer         | Technologies                        |
|---------------|-------------------------------------|
| Server-side   | Node.js, Express.js                 |
| Templating    | EJS (Embedded JavaScript Templates) |
| Authentication| JWT (Access & Refresh Tokens)       |
| Database      | Microsoft SQL Server (MSSQL)        |
| Tools         | Git, GitHub, Postman, VS Code       |

---

## 📷 Screenshots

> This project does not include screenshots. The UI is designed with a clean and functional layout to demonstrate core features.

---

## 📦 Getting Started

Clone the repository:

```bash
git clone https://github.com/kuyucucaner/movie-website.git
cd movie-website
npm install

---
## 🛡️ Environment Variables

PORT=5000
DB_SERVERNAME=your_db_servername
DB_NAME=your_db_name
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
JWT_ACCESSECRETKEY:your_jwt_accessecretkey
JWT_REFRESHSECRETKEY:your_jwt_refreshsecretkey
MAIL_ID:your_mail_id
MAIL_PASSWORD:your_mail_password

---
## ▶️ Run the App
 npm start

