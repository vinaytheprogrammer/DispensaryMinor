

# Dispensary Management System

The **Dispensary Management System** is a comprehensive healthcare solution built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It streamlines the management of dispensaries by providing a secure, efficient, and user-friendly platform for handling patient appointments, prescriptions, and medical history.

## Key Features

- **Secure Login/Logout**: Authentication and authorization for doctors, staff, and patients. Sensitive medical information is safeguarded with JWT and secure session management.
- **Appointment Management**: Patients can easily schedule appointments, and doctors can track their upcoming appointments.
- **Doctor Prescription Component**: Doctors can digitally generate, save, and send prescriptions to patients. These prescriptions are securely stored.
- **Patient History Management**: The system stores a detailed medical history for each patient, allowing doctors to view past prescriptions and treatments.
  
## Tools/Technologies Used

- **MongoDB**: NoSQL database for managing medical records, prescriptions, and patient data.
- **Express.js**: Backend framework for handling API requests and server-side operations.
- **React.js**: Frontend library for building user interfaces and managing component states.
- **Node.js**: JavaScript runtime environment to execute server-side code.
- **JWT**: For secure login/logout functionality.
- **HTML**: For structuring web forms and pages.
- **CSS/Tailwind CSS**: For styling the frontend with responsive designs.
- **JavaScript**: For client-side validation and dynamic behaviors.


## Modules

### Doctor Activities:
- Schedule appointments
- Create and manage prescriptions
- View patient history
- Update profile and password

### Patient Activities:
- Book appointments
- View medical history and receive prescriptions
- Update profile and password

## Activity Flow

1. **Login**: Secure login for doctors and patients.
2. **Appointment Scheduling**: Patients book appointments, and doctors are notified.
3. **Prescription Generation**: Doctors generate and send prescriptions to patients.
4. **View Medical History**: Both doctors and patients can view previous prescriptions and medical history.

## Future Scope

- **Integration with third-party healthcare systems**: To allow patient record sharing across healthcare institutions.
- **AI-based diagnostic tools**: To assist doctors in treatment recommendations.
- **Telemedicine**: Enabling remote consultations between doctors and patients.

## Conclusion

The **Dispensary Management System** improves operational efficiency and patient care by digitizing key processes. It ensures secure and scalable management of patient records, appointments, and prescriptions, providing real-time updates and an intuitive user interface. The system is also designed for future expansion, including telemedicine features and advanced analytics.

---

## How to Clone, Install Dependencies, and Run the Project

### Clone the Repository

To get started, clone the project repository using the following command:

```bash
git clone https://github.com/vinaytheprogrammer/DispensaryMinor/
```

### Navigate to the Project Directory

```bash
cd dispensary-management-system
```

### Install Dependencies

For the backend:

```bash
cd backend
npm install
```

For the frontend:

```bash
cd dispensary-management
npm install
```

### Set Up Environment Variables

You need to create a `.env` file in the root of the `backend` folder with the following environment variables:

```env
JWT_SECRET=your_jwt_secret
```

### Run the Application

To start both the backend and frontend servers:

#### Start the Backend Server

```bash
cd backend
node start
```

This will run the backend server on `http://localhost:5000`.

#### Start the Frontend Server

In a new terminal window/tab, run the frontend:

```bash
cd dispensary-management
npm start
```

This will run the frontend server on `http://localhost:3000`.

### Access the Application

Once both servers are running, you can access the application in your browser at:

```
http://localhost:3000
```

---

Now you're all set!
