import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx";
import PublicRoute from "../components/PublicRoute/PublicRoute.jsx";
import Terms from "../components/Footer/Terms.jsx";
import QuestionAndAnswer from "../pages/QuestionAndAnswer/QuestionAndAnswer.jsx";
import AskQuestion from "../pages/Question/AskQuestion/AskQuestion.jsx";
import ForgotPassword from "../pages/ForgotPassword/Forgotpassword.jsx";
import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy.jsx";
import Home from "../pages/Home/Home.jsx";
import AuthLayout from "../pages/AuthLayout/AuthLayout.jsx";
import HowItWorks from "../pages/HowItWorks/HowItWorks.jsx";

function AppRouter() {
  return (
    <Routes>
      {/* PROTECTED ROUTES: Only visible if logged in */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ask"
        element={
          <ProtectedRoute>
            <AskQuestion />
          </ProtectedRoute>
        }
      />

      <Route
        path="/question/:questionId"
        element={
          <ProtectedRoute>
            <QuestionAndAnswer />
          </ProtectedRoute>
        }
      />

      {/* PUBLIC ROUTES: Anyone can see these */}
      <Route path="/howitworks" element={<HowItWorks />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      <Route path="/forgetPass" element={<ForgotPassword />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRouter;
