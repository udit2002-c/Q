# CareQ - Healthcare Queue Management System

A modern, comprehensive healthcare queue management system built with Next.js, React, TypeScript, and Tailwind CSS. CareQ streamlines patient appointments, reduces wait times, and provides efficient healthcare service management for hospitals, doctors, patients, and healthcare staff.


## 🎯 Overview

CareQ is designed to revolutionize healthcare service delivery by providing:
- **Real-time queue management** with intelligent wait time predictions
- **Multi-role access** for patients, doctors, nurses, pharmacists, and hospital administrators
- **Responsive design** that works seamlessly across desktop, tablet, and mobile devices
- **Comprehensive patient management** including medical records, prescriptions, and billing
- **Efficient resource allocation** with bed management and inventory tracking

## ✨ Key Features

### 🏥 For Hospitals
- **Dashboard Overview**: Real-time statistics and system monitoring
- **Bed Management**: Track bed availability, occupancy, and assignments
- **Staff Management**: Manage doctors, nurses, and support staff
- **Department Organization**: Organize services by departments
- **Inventory Control**: Track medical supplies and equipment
- **Queue Monitoring**: Oversee patient queues across departments

### 👨‍⚕️ For Healthcare Providers (Doctors/Nurses)
- **Patient Management**: Access complete patient profiles and medical history
- **Appointment Scheduling**: Manage appointments and availability
- **Prescription Management**: Create and manage prescriptions
- **Queue Management**: Monitor and manage patient queues
- **Medical Records**: Update and maintain patient medical records

### 👤 For Patients
- **Appointment Booking**: Schedule appointments with preferred doctors
- **Queue Status**: Real-time updates on wait times and queue position
- **Medical Records**: Access personal medical history and test results
- **Prescription Tracking**: Monitor active prescriptions and refills
- **Bed Booking**: Request and track hospital bed assignments
- **Insurance Management**: Manage insurance information and claims

### 💊 For Pharmacists
- **Prescription Processing**: Review and fulfill patient prescriptions
- **Inventory Management**: Track medication stock and expiry dates
- **Patient Consultation**: Provide medication counseling and support

## 🛠️ Technology Stack

- **Frontend Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **UI Library**: [React 18](https://reactjs.org/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API with custom hooks
- **Type Safety**: TypeScript with comprehensive type definitions

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18.0 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/careq.git
   cd careq
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
careq/
├── app/                          # Next.js App Router
│   ├── contexts/                 # React contexts
│   ├── data/                     # Mock data and constants
│   ├── doctor/                   # Doctor portal pages
│   ├── hospital/                 # Hospital portal pages
│   ├── nurse/                    # Nurse portal pages
│   ├── patient/                  # Patient portal pages
│   ├── pharmacist/               # Pharmacist portal pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   └── ui/                       # shadcn/ui components
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities and configurations
│   ├── types.ts                  # TypeScript type definitions
│   ├── constants.ts              # Application constants
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── package.json                  # Project dependencies
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## 🎨 User Interfaces

### Patient Portal
- **Dashboard**: Overview of appointments, queue status, and medical records
- **Appointments**: Book, reschedule, and manage appointments
- **Queue**: Join queues and track wait times
- **Medical Records**: View test results and medical history
- **Bed Booking**: Request and manage hospital bed assignments
- **Insurance**: Manage insurance information and coverage

### Doctor Portal
- **Dashboard**: Patient overview and appointment schedule
- **Patient Management**: Access patient profiles and medical history
- **Prescriptions**: Create and manage patient prescriptions
- **Appointments**: Manage appointment schedules

### Hospital Admin Portal
- **Dashboard**: System overview and analytics
- **Bed Management**: Monitor bed availability and assignments
- **Staff Management**: Manage hospital staff and departments
- **Queue Management**: Oversee patient queues
- **Inventory**: Track medical supplies and equipment

### Nurse Portal
- **Dashboard**: Patient care overview
- **Patient Monitoring**: Track patient care checkpoints
- **Medication Management**: Monitor patient medications

### Pharmacist Portal
- **Dashboard**: Prescription overview
- **Inventory Management**: Track medication stock
- **Patient Prescriptions**: Process and fulfill prescriptions

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Additional commands
npm run type-check   # Run TypeScript compiler check
npm run format       # Format code with Prettier
```

## 🌟 Key Features Implementation

### Authentication System
- Multi-role authentication (Patient, Doctor, Nurse, Pharmacist, Hospital)
- Secure session management with automatic token refresh
- Role-based access control and route protection

### Queue Management
- Real-time queue updates with estimated wait times
- Priority-based queue system (Emergency, High, Medium, Low)
- Automated queue progression and notifications

### Appointment System
- Flexible appointment booking with doctor availability
- Appointment reminders and confirmations
- Rescheduling and cancellation capabilities

### Medical Records
- Comprehensive patient medical history
- Prescription tracking and management
- Test result integration and viewing

### Responsive Design
- Mobile-first responsive design
- Optimized for various screen sizes
- Touch-friendly interface for mobile devices

## 🔒 Security Features

- **Authentication**: Secure login system with JWT tokens
- **Authorization**: Role-based access control
- **Data Protection**: Client-side data validation and sanitization
- **Session Management**: Automatic token refresh and session timeout

## 🎯 Future Enhancements

- [ ] **Real-time Notifications**: WebSocket integration for instant updates
- [ ] **Video Consultations**: Telemedicine capabilities
- [ ] **Mobile App**: React Native mobile application
- [ ] **Analytics Dashboard**: Advanced reporting and analytics
- [ ] **Integration APIs**: Third-party system integrations
- [ ] **Multilingual Support**: Internationalization (i18n)
- [ ] **Offline Capabilities**: Progressive Web App (PWA) features
- [ ] **Payment Gateway**: Integrated billing and payment processing

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use consistent code formatting (Prettier)
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React.js, TypeScript, Tailwind CSS
- **Backend Integration**: RESTful APIs, Authentication
- **UI/UX Design**: Modern healthcare-focused design system
- **Quality Assurance**: Testing and optimization

## 📞 Support

For support and questions:

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub
- **Email**: support@careq.com
- **Community**: Join our Discord server

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- Healthcare professionals who provided valuable feedback

---

**Made with ❤️ for better healthcare management**

> CareQ aims to improve healthcare accessibility and efficiency through modern technology solutions.

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
