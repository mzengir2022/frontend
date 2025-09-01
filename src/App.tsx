import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { SignupPage } from "./components/SignupPage";
import { LoginPage } from "./components/LoginPage";
import { AdminPanel } from "./components/AdminPanel";

type Page = "landing" | "signup" | "login" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const token = localStorage.getItem('authToken');
    return token ? 'admin' : 'landing';
  });

  const handleGetStarted = () => {
    setCurrentPage("signup");
  };

  const handleSignIn = () => {
    setCurrentPage("login");
  };

  const handleBackToLanding = () => {
    setCurrentPage("landing");
  };

  const handleSignupComplete = () => {
    setCurrentPage("admin");
  };

  const handleLoginComplete = () => {
    setCurrentPage("admin");
  };

  const handleSwitchToSignup = () => {
    setCurrentPage("signup");
  };

  const handleSwitchToLogin = () => {
    setCurrentPage("login");
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setCurrentPage("landing");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
      case "signup":
        return (
          <SignupPage 
            onBack={handleBackToLanding} 
            onSignup={handleSignupComplete}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      case "login":
        return (
          <LoginPage 
            onBack={handleBackToLanding} 
            onLogin={handleLoginComplete}
            onSwitchToSignup={handleSwitchToSignup}
          />
        );
      case "admin":
        return <AdminPanel onLogout={handleLogout} />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
    }
  };

  return renderPage();
}