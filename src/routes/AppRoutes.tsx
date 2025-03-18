import { Routes, Route } from "react-router-dom";
import { Homepage } from "../screens/HomePage";
import { TaskManagement } from "../screens/TaskManagementPage/TaskManagement";
import RouteTracker from "./RouteTracker";

const AppRoutes = () => {
  return (
    <>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/new-task" element={<TaskManagement />} />
        <Route path="/edit-task" element={<TaskManagement />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
