# UMS - University Management System

![University Management System](./unitech/src/assets/EduVerse.png)

A comprehensive University Management System built with modern web technologies to streamline academic administration, student management, faculty operations, and educational processes.

## 🎓 Overview

UMS (University Management System) is a full-stack web application designed to digitize and automate university operations. The system provides distinct interfaces for administrators, faculty members, and students, enabling efficient management of academic programs, student records, faculty information, courses, and institutional communication.

## ✨ Key Features

### 👨‍💼 Administrative Dashboard

- **Student Management**: Complete student lifecycle management including enrollment, academic progress tracking, and profile management
- **Faculty Management**: Faculty recruitment, profile management, department assignments, and performance tracking
- **Program Management**: Academic program creation, curriculum design, and enrollment management
- **Analytics & Reporting**: Comprehensive dashboards with statistics, charts, and data visualization
- **News & Events Management**: Institutional communication and event management
- **Contact Management**: Inquiry and communication management system

### 👨‍🏫 Faculty Portal

- **Course Management**: Manage assigned courses, course materials, and curriculum
- **Student Management**: Track students enrolled in faculty courses with attendance and grade management
- **Class Scheduling**: Create and manage class schedules with room assignments
- **Attendance Management**: Digital attendance tracking and reporting
- **Notices & Announcements**: Communication tools for student announcements
- **Profile Management**: Faculty profile and credentials management

### 👨‍🎓 Student Portal

- **Academic Dashboard**: View enrolled courses, grades, and academic progress
- **Course Information**: Access course materials, schedules, and announcements
- **Profile Management**: Update personal information and academic preferences
- **News & Events**: Stay updated with institutional announcements and events

### 🔐 Authentication & Authorization

- **Role-based Access Control**: Separate dashboards for Admin, Faculty, and Student roles
- **Secure Authentication**: JWT-based authentication with password encryption
- **Profile Management**: User profile management with image upload capabilities

## 🛠️ Technology Stack

### Frontend

- **React 19.1.0**: Modern UI framework with hooks and context
- **React Router**: Navigation and routing management
- **React Bootstrap**: Responsive UI components and styling
- **React Icons**: Comprehensive icon library
- **Recharts**: Data visualization and chart components
- **Vite**: Fast build tool and development server

### Backend

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **Sequelize ORM**: Database object-relational mapping
- **MySQL2**: Database driver and connection management
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment configuration management

### Database

- **MySQL**: Relational database management system
- **Sequelize Models**: Structured data models for Students, Faculty, Programs, News/Events, Users, and Contacts

## 📁 Project Structure

```
UMS/
├── server/                          # Backend API Server
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # Database configuration
│   │   ├── controllers/            # API Controllers
│   │   │   ├── StudentController.js
│   │   │   ├── FacultyController.js
│   │   │   ├── ProgramController.js
│   │   │   ├── NewsEventController.js
│   │   │   ├── UserController.js
│   │   │   └── ContactController.js
│   │   ├── models/                 # Database Models
│   │   │   ├── Student.js
│   │   │   ├── Faculty.js
│   │   │   ├── Program.js
│   │   │   ├── NewsEvent.js
│   │   │   ├── Users.js
│   │   │   └── Contact.js
│   │   ├── routes/                 # API Routes
│   │   │   ├── StudentRoutes.js
│   │   │   ├── FacultyRoutes.js
│   │   │   ├── ProgramRoutes.js
│   │   │   ├── NewsEventRoutes.js
│   │   │   ├── UserRoutes.js
│   │   │   └── ContactRoutes.js
│   │   └── index.js               # Server entry point
│   └── package.json
├── unitech/                        # Frontend React Application
│   ├── src/
│   │   ├── Components/             # Reusable UI Components
│   │   │   ├── Admin/             # Admin-specific components
│   │   │   │   ├── Dashboard/
│   │   │   │   ├── Forms/
│   │   │   │   └── Layout/
│   │   │   ├── Common/            # Shared components
│   │   │   ├── Faculty/           # Faculty-specific components
│   │   │   ├── Home/              # Public homepage components
│   │   │   └── Student/           # Student-specific components
│   │   ├── Pages/                 # Main application pages
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── FacultyDashboard.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── StudentManagement.jsx
│   │   │   ├── FacultyManagement.jsx
│   │   │   ├── ProgramManagement.jsx
│   │   │   ├── NewsEventsManagement.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Login.jsx
│   │   ├── contexts/              # React Context for state management
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # API service layer
│   │   └── assets/                # Static assets
│   └── package.json
├── README.md
└── LICENSE
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/CypherNinjaa/UMS.git
   cd UMS
   ```

2. **Set up the Backend**

   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the server directory:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=ums_database
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Set up the Database**

   - Create a MySQL database named `ums_database`
   - The application will automatically create the required tables on first run

5. **Start the Backend Server**

   ```bash
   npm run dev
   ```

6. **Set up the Frontend**

   ```bash
   cd ../unitech
   npm install
   ```

7. **Start the Frontend Development Server**

   ```bash
   npm run dev
   ```

8. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📊 Database Schema

### Core Entities

#### Students

- Personal information (name, email, phone, address)
- Academic details (program, year, semester, GPA)
- Enrollment information (status, dates, credits)
- Financial information (tuition status, scholarships)

#### Faculty

- Professional information (name, title, department)
- Contact details (email, phone, office location)
- Academic credentials (specialization, qualifications)
- Administrative details (join date, status)

#### Programs

- Program details (name, type, duration, credits)
- Administrative information (department, capacity, fees)
- Academic structure (requirements, objectives, outcomes)
- Enrollment management (start/end dates, deadlines)

#### Users

- Authentication credentials (email, password, role)
- Profile linking (student_id, faculty_id)
- Security features (password hashing, role-based access)

## 🔧 API Endpoints

### Student Management

- `GET /api/students` - Get all students with filtering
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student information
- `DELETE /api/students/:id` - Delete student record
- `GET /api/students/statistics` - Get student statistics

### Faculty Management

- `GET /api/faculty` - Get all faculty members
- `POST /api/faculty` - Create new faculty member
- `PUT /api/faculty/:id` - Update faculty information
- `DELETE /api/faculty/:id` - Delete faculty record
- `GET /api/faculty/departments` - Get all departments

### Program Management

- `GET /api/programs` - Get all academic programs
- `POST /api/programs` - Create new program
- `PUT /api/programs/:id` - Update program information
- `DELETE /api/programs/:id` - Delete program

### Authentication

- `POST /api/users/login` - User authentication
- `POST /api/users/register` - User registration
- `GET /api/users/profile` - Get user profile

## 🎨 UI Features

### Responsive Design

- Mobile-first responsive layout
- Bootstrap-based component system
- Dark/light theme support
- Intuitive navigation and user experience

### Data Visualization

- Interactive charts and graphs using Recharts
- Statistical dashboards for administrators
- Progress tracking and performance metrics
- Real-time data updates

### Advanced Filtering & Search

- Multi-criteria filtering for all management modules
- Real-time search functionality
- Pagination and sorting capabilities
- Export functionality for reports

## 🛡️ Security Features

- **Password Encryption**: Secure password hashing
- **JWT Authentication**: Token-based authentication system
- **Role-Based Access**: Granular permission system
- **Input Validation**: Comprehensive data validation
- **SQL Injection Prevention**: Parameterized queries with Sequelize ORM

## 📱 Deployment

### Development Environment

```bash
# Backend
cd server && npm run dev

# Frontend
cd unitech && npm run dev
```

### Production Build

```bash
# Frontend build
cd unitech && npm run build

# Backend production
cd server && npm start
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **CypherNinjaa** - _Initial work_ - [GitHub Profile](https://github.com/CypherNinjaa)

## 🙏 Acknowledgments

- React and Node.js communities for excellent documentation
- Bootstrap team for the responsive UI framework
- MySQL and Sequelize teams for robust database solutions
- All contributors who help improve this project

## 📞 Support

For support, email vikashkelly@gmail.com or create an issue in the GitHub repository.

---

**Built with ❤️ for educational institutions seeking digital transformation**
