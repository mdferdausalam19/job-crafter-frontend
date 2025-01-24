# 💼 Job Crafter Frontend

**Job Crafter** is a feature-rich web application designed to connect job seekers and employers seamlessly. The platform enables users to post, manage, and bid for jobs in a dynamic and user-friendly interface.

## 🌐 Live Website

[Job Crafter Frontend](https://job-crafter-frontend.vercel.app/)

## 📂 Repository

[Frontend Repository](https://github.com/mdferdausalam19/job-crafter-frontend)

## 📊 Key Features

### 🌟 Global Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **User Authentication**: Secure login and registration powered by Firebase Authentication.
- **Private Routes**: Protected access to job posting, bidding, and job management.
- **Toast Notifications**: Instant feedback for user actions using `react-hot-toast`.

### 🏠 Home Page

- **Banner**: A visually engaging introduction to the platform.
- **Browse Jobs by Categories**: Explore job listings in categories like Web Development, Graphic Design, and Digital Marketing, with dynamic tabs implemented using React Tabs.

### ➕ Add Job Page

- **Post New Jobs**: Submit job postings with details like title, description, budget, and deadlines.
- **Form Validation**: Ensures all inputs are accurate using `react-hook-form`.

### 🔍 All Jobs Page

- **Job Listings**: View all available jobs with detailed information.
- **Sort & Filter**: Enhanced job search experience with sorting and filtering options.

### 🤝 My Posted Jobs Page

- **Manage Jobs**: View all jobs posted by the logged-in user with options to update or delete them.

### 💼 Bidding System

- **Bid Requests**: View all incoming bids for posted jobs.
- **My Bids**: Track the status of bids placed by the user.

### 📄 Job Details Page

- **Job Information**: Displays job details with options to place bids.
- **Category Highlights**: View related job categories for easy navigation.

### 🔄 Update Job Page

- **Edit Job Postings**: Modify existing job details and keep listings up to date.

### 🔆 Additional Features

- **Loading Spinner**: Visual indicator for data loading states.
- **Social Sign-In**: Quick login options using Google or other providers.
- **404 Page**: A well-designed error page for invalid routes.

## 🛠️ Technologies Used

### ⚡ Frameworks & Libraries:

- **React**: For building the dynamic frontend UI.
- **React Router**: For seamless client-side routing and navigation.
- **Tailwind CSS & DaisyUI**: For responsive, modern, and customizable styling.

### ➕ Additional Dependencies:

- **@tanstack/react-query**: For fetching, caching, and managing server state.
- **axios**: For handling HTTP requests.
- **firebase**: For backend as a service (authentication, hosting, etc.).
- **react-hook-form**: For handling form validation and submission.
- **react-hot-toast**: For elegant toast notifications.
- **react-icons**: For a comprehensive set of customizable icons.
- **react-tabs**: For creating tab-based navigation or sections.
- **sweetalert2**: For modern and customizable alert dialogs.
- **swiper**: For responsive sliders and carousels.

## 🗂️ Project Structure

```plaintext
job-crafter-frontend/
├── public/
│   └── images
│       └── favicon.png
├── src/
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── Banner.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Header.jsx
│   │   └── ui/
│   │       ├── LoadingSpinner.jsx
│   │       └── SocialSignIn.jsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── useAuth.js
│   │   ├── bids/
│   │   │   ├── BidRequests.jsx
│   │   │   └── MyBids.jsx
│   │   ├── jobCategories/
│   │   │   ├── JobCategories.jsx
│   │   │   ├── JobCategoryCard.jsx
│   │   │   └── JobDetails.jsx
│   │   └── jobs/
│   │       ├── AddJob.jsx
│   │       ├── AllJobs.jsx
│   │       ├── MyPostedJobs.jsx
│   │       └── UpdateJob.jsx
│   ├── firebase/
│   │   └── firebase.config.js
│   ├── hooks/
│   │   └── useAxiosSecure.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── providers/
│   │   └── AuthProvider.jsx
│   ├── routes/
│   │   ├── AppRouter.jsx
│   │   └── PrivateRoute.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

## 🚀 Getting Started

To run the project locally, follow these steps:

### Prerequisites

Ensure that you have **Node.js** and **npm** installed on your system.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/mdferdausalam19/job-crafter-frontend.git

   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd job-crafter-frontend
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Firebase**:

   - Create a `.env.local` file and add the following environment variables:

   ```bash
   VITE_APIKEY=your_api_key
   VITE_AUTHDOMAIN=your_auth_domain
   VITE_PROJECTID=your_project_id
   VITE_STORAGEBUCKET=your_storage_bucket
   VITE_MESSAGINGSENDERID=your_messaging_sender_id
   VITE_APPID=your_app_id
   VITE_API_URL=your_api_url
   ```

5. **Run the Development Server**:

   ```bash
   npm run dev
   ```

6. **Access the Application**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📚 Resources

### **Frameworks & Libraries**

- **React Ecosystem**:
  - [React](https://react.dev)
  - [React Router](https://reactrouter.com)
  - [react-hook-form](https://react-hook-form.com)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com)
  - [DaisyUI](https://daisyui.com)
  - [Swiper](https://swiperjs.com)

### **State Management & Utilities**

- [Tanstack Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com)

### **Packages**

- [react-icons](https://react-icons.github.io/react-icons)
- [react-hot-toast](https://react-hot-toast.com)
- [sweetalert2](https://sweetalert2.github.io)

### **Firebase**

- [Firebase Documentation](https://firebase.google.com/docs)
