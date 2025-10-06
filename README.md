# GradRent

**GradRent** is a modern, user-friendly web application designed for college students to easily find, list, and rent flats/PG accommodations near their campuses. Built as a startup MVP (Minimum Viable Product), it focuses on seamless navigation between colleges (e.g., ABESEC, AKGEC, ABESIT), secure authentication, and quick flat listings. Whether you're a student searching for affordable housing or a landlord listing properties, GradRent simplifies the process with a clean, responsive interface.

This project is actively developed and open to contributions. Join us in building the go-to rental platform for the grad community!

## 🚀 Features

- **College-Specific Navigation**: Dropdown selector for targeted searches (e.g., ABESEC, AKGEC, ABESIT) to filter flats near specific campuses.
- **User  Authentication**: Secure sign-in/sign-out using Firebase Auth—easy onboarding for students and landlords.
- **Flat Management**:
  - **Add Flat**: Landlords can quickly add property details (location, rent, amenities) with a simple form.
  - **List With Us**: Browse and view available flats tailored to your college.
- **Responsive Design**: Mobile-first UI with hamburger menu for easy navigation on phones/tablets. Hero sections and scroll-based header for engaging user experience.
- **State Management**: Efficient global state handling with React Context API (StateProvider) for basket/cart-like features (e.g., saved listings).
- **Search & Filtering**: Integrated search bar for quick property discovery.
- **Performance Optimized**: Smooth scrolling, lazy loading, and CSS transitions for a fast, modern feel.

**Upcoming Features (Roadmap)**:
- Advanced search filters (budget, roommates, amenities).
- User profiles and saved favorites.
- Payment integration (e.g., Razorpay/Stripe).
- Admin dashboard for property verification.
- Mobile app (React Native) extension.

## 🛠 Tech Stack

### Frontend
- **React.js** (v18.x): Core framework for building dynamic UIs.
- **React Router**: Client-side routing for pages like Home, AddFlat, ListWithUs, and Login.
- **CSS Modules**: Custom styling with responsive breakpoints (mobile, tablet, desktop).
- **Context API**: State management for user data, authentication, and app-wide state.

### Backend & Services
- **Firebase**: Authentication, real-time database (for flat listings), and hosting.
- **No-Code Backend**: Leverages Firebase for quick MVP scaling without a full server.

### Tools & Deployment
- **Development**: Vite/Webpack for bundling, ESLint for code quality.
- **Deployment**: Firebase Hosting (or Vercel/Netlify for easy CI/CD).
- **Version Control**: Git/GitHub.

## 📋 Prerequisites

- Node.js (v16+ recommended)
- npm or yarn package manager
- Firebase account (for auth and database setup)
- Git

## 🏗 Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/GradRent.git
   cd GradRent
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # Or if using yarn: yarn install
   ```

3. **Set Up Firebase**:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
   - Enable Authentication (Email/Password) and Firestore Database.
   - Download your `firebase-config.js` (or create one) and place it in `src/`:
     ```js
     // src/firebase.js (example structure)
     import { initializeApp } from 'firebase/app';
     import { getAuth } from 'firebase/auth';
     import { getFirestore } from 'firebase/firestore';

     const firebaseConfig = {
       // Your config: apiKey, authDomain, projectId, etc.
     };

     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     export const db = getFirestore(app);
     ```
   - Install Firebase SDK if not already: `npm install firebase`.

4. **Environment Variables** (Optional for Production):
   - Create a `.env` file in the root:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     # Add other Firebase config vars
     ```

5. **Run Locally**:
   ```bash
   npm start
   # App runs on http://localhost:3000
   ```

## 🚀 Usage

1. **Start the App**: After installation, run `npm start`. The app opens in your browser.
2. **Test Authentication**: Navigate to the login page and sign in/out using Firebase.
3. **Add a Flat**: Go to `/AddFlat`, fill the form, and submit (data saves to Firestore).
4. **Browse Listings**: Use the college dropdown on the header to filter and view flats on `/ListWithUs`.
5. **Mobile Testing**: Resize your browser or use dev tools to test the hamburger menu and responsive layout.

### Example Workflow
- Student: Select college → Search flats → Contact landlord (future feature).
- Landlord: Sign in → Add flat → List it for the selected college.

For production deployment:
- Build: `npm run build`
- Deploy to Firebase: `firebase deploy` (after `firebase init`).

## 📱 Screenshots

Add screenshots here to showcase the UI (use GitHub's image upload or external links):

- **Home Page (Hero Section)**:
  ![Home Page](screenshots/home-hero.png)  
  *Yellow-themed hero with college selector and navigation.*

- **Mobile Hamburger Menu**:
  ![Mobile Menu](screenshots/mobile-dropdown.png)  
  *Responsive dropdown for nav options like "Add Flat" and "Sign In".*

- **Add Flat Form**:
  ![Add Flat](screenshots/add-flat.png)  
  *Simple form for property listings.*

## 🤝 Contributing

We welcome contributions to make GradRent better! Whether it's bug fixes, new features, or UI improvements:

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/amazing-new-feature`.
3. Commit changes: `git commit -m 'Add: Amazing new feature'`.
4. Push: `git push origin feature/amazing-new-feature`.
5. Open a Pull Request (PR) with a clear description.

## 👥 Acknowledgments

- Built with ❤️ for college students by [Udayraj Tripathi].
- Thanks to Firebase for powering the backend.
- Inspired by rental platforms like NoBroker and MagicBricks, but tailored for the grad community.
- Special shoutout to open-source contributors!

## 📞 Contact

- **Founder/Developer**: [Udayraj Tripathi]  
  Email: [udayrajtripathi534@gmail.com]  
  LinkedIn: [https://www.linkedin.com/in/udayraj-tripathi-749b8527a]  
  Website: [gradrent-97509.web.app]

For business inquiries, partnerships, or feedback: Reach out via email or GitHub Discussions.

**Let's connect and build the future of student housing together!** 🌟
