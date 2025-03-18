import StoreProvider from "./store/StoreProvider";
import AppContent from "./AppContent";

const App = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
