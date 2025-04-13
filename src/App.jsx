import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
import Logout from './components/Auth/Logout';
import HomePage from './components/HomePage/HomePage';
import DiscoverPage from './components/DiscoverPage/DiscoverPage';
import FollowUser from './components/UserFeed/FollowUser';
import UnfollowUser from './components/UserFeed/UnfollowUser';
import PersonalFeed from './components/UserFeed/PersonalFeed';
import OtherUserFeed from './components/UserFeed/OtherUserFeed';
import DeleteChirp from './components/common/DeleteChirp';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteUser from './components/common/DeleteUser';
import EditChirp from './components/common/EditChirp';
import MainAdminPage from './components/Admin/MainAdminPage';
import NotFound from './components/common/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div id="main">
      <Header />

      <HashRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/index.html" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute >
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discover"
            element={
              <ProtectedRoute >
                <DiscoverPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute >
                <PersonalFeed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <ProtectedRoute >
                <OtherUserFeed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/follow/:id"
            element={
              <ProtectedRoute >
                <FollowUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/unfollow/:id"
            element={
              <ProtectedRoute >
                <UnfollowUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editChirp/:id"
            element={
              <ProtectedRoute >
                <EditChirp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deleteChirp/:id"
            element={
              <ProtectedRoute >
                <DeleteChirp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deleteUser/:id"
            element={
              <ProtectedRoute >
                <DeleteUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute >
                <MainAdminPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>

      <ToastContainer autoClose={2500} />
      <Footer />
    </div>
  );
}

export default App;