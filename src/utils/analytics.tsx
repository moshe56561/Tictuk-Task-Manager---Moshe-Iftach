// Centralized analytics functions
export const logPageVisit = (pageName: any) => {
  console.log(`User visited: ${pageName}`);
};

export const getPageNameFromPath = (pathname: any) => {
  const pathToPageName: any = {
    "/": "Home Page",
    "/new-task": "Task Management Page",
    "/edit-task": "Task Management Page",
  };

  return pathToPageName[pathname] || "Unknown Page";
};
