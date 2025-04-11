# Security App 🛡️

**Security App** is a web-based system for managing employees, contractors, guards, and related entities, featuring role-based access, and database integration using Prisma and PostgreSQL.

## 📝 Why Security App?

In today's fast-paced world, ensuring the safety and efficiency of security operations is paramount. Traditional methods of managing security personnel, patrols, and checkpoints often lead to inefficiencies, miscommunication, and lack of real-time oversight. **Security App** addresses these challenges by providing a centralized platform that streamlines operations, enhances accountability, and ensures timely responses to incidents. Whether it's tracking guards in real-time, managing patrol schedules, or handling employee and contractor data, this app is designed to modernize and simplify security management.

## 📌 Features

- 🔐 Role-based login for Admin, Officer, and Guard
- 🗺️ Map integration for checkpoints and guard tracking
- 📅 Patrol schedule management and assignment
- ✅ Check-in validation at specific checkpoints
- 🚨 Alert notifications for missed check-ins or schedule issues
- **User Management**: Manage users with different roles such as guards, employees, and contractors.
- **Employee Tracking**: Keep track of employee details, including personal information, position, and department.
- **Contractor Management**: Manage contractors and their association with employees.
- **Guard Management**: Handle guard details and their assignments.
- **Vehicle Management**: Track vehicles and their usage.
- **Access Logs**: Monitor key logs and ride logs for security purposes.
- **Database Integration**: Seamless integration with PostgreSQL using Prisma ORM.

## 🛠️ Tech Stack

- React.js (Frontend)
- Node.js + Express (Backend)
- MongoDB (Database for real-time tracking)
- PostgreSQL + Prisma (Database for user and entity management)
- Firebase (Authentication & Notifications)
- Leaflet.js (Map integration)

## 📦 Installation

1. **Clone the repo**
```bash
git clone https://github.com/BenShuan/security-app.git
```

2. **Install server dependencies**
```bash
cd server
npm install
npm run dev
```

> ⚠️ Don’t forget to add environment variables and Firebase credentials as needed.

## 📷 Screenshots

_(Add screenshots of the dashboard, guard map, and check-in view here)_

## 🌐 Website

Visit the live application: [Security App Website](https://securety-app.vercel.app/)

## 👥 Authors

- Developed by: [Ben Shuan](https://github.com/BenShuan)

## 📄 License

This project is for academic and demonstration purposes.
