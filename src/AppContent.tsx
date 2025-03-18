import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components/ui/Header";
import { useTheme } from "./store/ThemeStore";
import AppRoutes from "./routes/AppRoutes";

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex flex-col h-screen ${
        isDarkMode ? "bg-bg-dark" : "bg-bg-light"
      }`}
    >
      <Header />
      <div className="flex-1 overflow-auto">
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </div>
  );
};

export default AppContent;
