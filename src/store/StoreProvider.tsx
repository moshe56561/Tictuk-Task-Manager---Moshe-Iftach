import React from "react";
import { TaskStoreProvider } from ".//TaskStore";
import { ThemeProvider } from ".//ThemeStore";

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <TaskStoreProvider>{children}</TaskStoreProvider>
    </ThemeProvider>
  );
};

export default StoreProvider;
