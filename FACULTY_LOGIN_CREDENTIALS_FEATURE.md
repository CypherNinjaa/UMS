# Faculty Login Credentials Management Feature

## Overview

This feature allows administrators to create and manage login credentials for faculty members directly from the Faculty Management system. When adding or editing faculty, admins can now:

- ✅ Create login accounts for faculty members
- ✅ Set custom email and password for faculty login
- ✅ Generate secure random passwords
- ✅ Update existing faculty login credentials
- ✅ Enable faculty to access their dedicated dashboard

## Changes Made

### Frontend Changes

#### 1. Enhanced FacultyFormModal Component

**File:** `unitech/src/Components/Admin/Forms/FacultyFormModal.jsx`

**New Features:**

- Added login credentials section to the faculty form
- Checkbox to enable/disable login creation
- Login email field (can be different from profile email)
- Password field with show/hide toggle
- Confirm password field with validation
- Generate random password button
- Visual indicators and helpful text

**New Form Fields:**

```jsx
// Login credentials
createLogin: boolean,        // Enable/disable login creation
loginEmail: string,         // Email for login (can differ from profile email)
password: string,           // Password for login
confirmPassword: string,    // Password confirmation
generatePassword: boolean   // Flag for auto-generation
```

**Enhanced Validation:**

- Login email format validation
- Password strength requirements (minimum 6 characters)
- Password confirmation matching
- Conditional validation (only when createLogin is true)

#### 2. Updated FacultyManagement Component

**File:** `unitech/src/Pages/FacultyManagement.jsx`

**Changes:**

- Integrated new `FacultyService` methods for login creation
- Separates faculty data from login data before saving
- Handles both creation and update scenarios
- Added success messaging for login credential creation

#### 3. Enhanced FacultyService

**File:** `unitech/src/services/FacultyService.js`

**New Methods:**

```javascript
// Create faculty with optional login credentials
static async createFacultyWithLogin(facultyData, loginData)

// Update faculty with optional login credentials
static async updateFacultyWithLogin(id, facultyData, loginData)
```

### Backend Changes

#### 1. Enhanced Users Model

**File:** `server/src/models/Users.js`

**New Fields:**

```javascript
faculty_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'faculty', key: 'id' }
},
student_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'students', key: 'id' }
}
```

#### 2. New User Controller Method

**File:** `server/src/controllers/UserController.js`

**New Method:**

```javascript
getUserByFacultyId: async (req, res) => {
	// Finds user account linked to a faculty member
	// Used for checking existing accounts during updates
};
```

#### 3. Enhanced User Routes

**File:** `server/src/routes/UserRoutes.js`

**New Route:**

```javascript
router.get("/faculty/:facultyId", UserController.getUserByFacultyId);
```

#### 4. Database Migration Script

**File:** `server/add_user_references.js`

- Adds `faculty_id` and `student_id` columns to Users table
- Creates foreign key constraints
- Safe to run on existing databases

## Usage Guide

### For Administrators

#### Creating New Faculty with Login

1. Navigate to Faculty Management
2. Click "Add Faculty"
3. Fill in faculty profile information
4. Check "Create Login Account for Faculty"
5. Enter login email (can be same as profile email)
6. Either:
   - Enter custom password manually, OR
   - Click "Generate" for auto-generated secure password
7. Confirm password
8. Save faculty

#### Updating Existing Faculty Login

1. Edit existing faculty member
2. Check "Create/Update Login Account for Faculty"
3. Modify login credentials as needed
4. Save changes

#### Password Generation

- Click "Generate" button for automatic secure password
- Generated passwords include: uppercase, lowercase, numbers, and special characters
- Always 10 characters long for security

### For Faculty Members

Once login credentials are created:

1. Faculty receive login email and password
2. Access system at login page
3. Use provided credentials to login
4. Automatically redirected to Faculty Dashboard
5. Full access to faculty-specific features

## Security Features

### Password Security

- Minimum 6 character requirement
- Support for complex passwords with special characters
- Auto-generation creates strong 10-character passwords
- Password confirmation prevents typos

### Account Management

- Login email can differ from profile email for security
- Existing user accounts are updated, not duplicated
- Failed user creation doesn't affect faculty profile creation
- Proper error handling and rollback scenarios

### Data Integrity

- Foreign key constraints ensure data consistency
- Safe migration script for existing databases
- Validation at both frontend and backend levels

## Database Schema Changes

### Users Table Extensions

```sql
ALTER TABLE Users
ADD COLUMN faculty_id INTEGER,
ADD COLUMN student_id INTEGER;

-- Foreign key constraints
ALTER TABLE Users
ADD CONSTRAINT fk_users_faculty
FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE SET NULL;

ALTER TABLE Users
ADD CONSTRAINT fk_users_student
FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL;
```

## API Endpoints

### New/Modified Endpoints

#### Get User by Faculty ID

```
GET /api/users/faculty/:facultyId
Response: { user: {...} } or 404 if not found
```

#### Create User (Enhanced)

```
POST /api/users
Body: {
    name, email, mobile_no, password, role,
    faculty_id (optional), student_id (optional)
}
```

#### Update User (Enhanced)

```
PUT /api/users/edit/:id
Body: { name, email, mobile_no, password, ... }
```

## Error Handling

### Frontend Validation Errors

- "Login email is required"
- "Please enter a valid login email address"
- "Password is required"
- "Password must be at least 6 characters long"
- "Passwords do not match"

### Backend Error Scenarios

- Faculty creation success + User creation failure
- User account already exists (handled gracefully)
- Database constraint violations
- Network/connection errors

## Benefits

### For Administrators

- ✅ Centralized user management
- ✅ Streamlined faculty onboarding
- ✅ Consistent credential management
- ✅ Professional account provisioning

### For Faculty

- ✅ Direct dashboard access
- ✅ Secure login credentials
- ✅ Role-based system access
- ✅ Professional user experience

### For System

- ✅ Proper data relationships
- ✅ Scalable architecture
- ✅ Security best practices
- ✅ Maintainable codebase

## Next Steps

1. **Run Database Migration:**

   ```bash
   cd server
   node add_user_references.js
   ```

2. **Test the Feature:**

   - Create new faculty with login
   - Update existing faculty
   - Test faculty login process
   - Verify dashboard access

3. **Optional Enhancements:**
   - Email notifications to faculty with credentials
   - Password reset functionality
   - Account activation workflow
   - Bulk user creation for multiple faculty

## Security Considerations

- Consider implementing password hashing (bcrypt)
- Add email verification for new accounts
- Implement account lockout after failed attempts
- Add audit logging for credential changes
- Consider two-factor authentication for enhanced security

This feature significantly improves the Faculty Management system by providing professional user account management capabilities while maintaining security and data integrity.
