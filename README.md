# Security App

This is a security application designed to manage employees, contractors, guards, and related entities. The application uses Prisma as the ORM and PostgreSQL as the database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [License](#license)

## Installation

1. Clone the repository:
  ```sh
  git clone <repository-url>
  ```
2. Navigate to the project directory:
  ```sh
  cd securety-app
  ```
3. Install dependencies:
  ```sh
  npm install
  ```
4. Set up the database:
  ```sh
  npx prisma migrate dev --name init
  ```

## Usage

1. Start the application:
  ```sh
  npm start
  ```
2. The application will be available at `http://localhost:3000`.

## Database Schema

The application uses the following database schema:

### User

```prisma
model User {
  id        String   @id @default(uuid())
  userName  String   @unique
  password  String
  site      String
  role      Role     @default(guard)
  createdAt DateTime @default(now())
}
```

### Employee

```prisma
model Employee {
  id          String      @id @default(uuid())
  firstName   String
  lastName    String
  employeeId  String      @unique
  idNumber    String?     @unique
  phoneNumber String?
  email       String?     @unique
  position    String?
  address     String?
  active      Boolean     @default(true)
  startDate   DateTime    @default(now())
  endDate     DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  department  String?
  site        String?
  keyLogs     KeyLog[]
  isManager   Boolean     @default(false)
  contractor  Contractor?
  managerId   String?
  manager     Employee?   @relation("ManagedContractors", fields: [managerId], references: [id], onDelete: SetNull)
  employees   Employee[]  @relation("ManagedContractors")
  guard       Guard?
  car         Car?
  RideLog     RideLog[]
}
```

### Contractor

```prisma
model Contractor {
  id             Int      @id @default(autoincrement())
  employee       Employee @relation(fields: [employeeId], references: [idNumber], onDelete: Cascade)
  employeeId     String   @unique
}
```
## Features

- **User Management**: Manage users with different roles such as guards, employees, and contractors.
- **Employee Tracking**: Keep track of employee details, including personal information, position, and department.
- **Contractor Management**: Manage contractors and their association with employees.
- **Guard Management**: Handle guard details and their assignments.
- **Vehicle Management**: Track vehicles and their usage.
- **Access Logs**: Monitor key logs and ride logs for security purposes.
- **Role-Based Access Control**: Ensure secure access to different parts of the application based on user roles.
- **Database Integration**: Seamless integration with PostgreSQL using Prisma ORM.

## License

This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.