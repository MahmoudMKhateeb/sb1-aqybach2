import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LandingPage } from './components/home/LandingPage';
import { HomePage } from './components/home/HomePage';
import { QuizSummary } from './components/quiz/QuizSummary';
import { QuizPage } from './components/quiz/QuizPage';
import { ChatPage } from './components/chat/ChatPage';
import { RewardsPage } from './components/rewards/RewardsPage';
import { Navigation } from './components/layout/Navigation';
import { AuthForms } from './components/auth/AuthForms';
import { SettingsPage } from './components/settings/SettingsPage';
import { SubscriptionPage } from './components/subscription/SubscriptionPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/" />;
}

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <div className="pb-20">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <LandingPage />} />
          <Route path="/auth" element={<AuthForms />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <PrivateRoute>
                <QuizSummary />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <QuizPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/rewards"
            element={
              <PrivateRoute>
                <RewardsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/subscription"
            element={
              <PrivateRoute>
                <SubscriptionPage />
              </PrivateRoute>
            }
          />
        </Routes>
        {user && <Navigation />}
      </div>
    </Router>
  );
}