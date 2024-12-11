import { CartProvider } from "./Context/CartContext";
import { RoleProvider } from "./Context/RoleContext";
import { Toaster } from "./components/ui/toaster";
import AppRouter from "./routes/AppRouter";
function App() {
  return (
    <CartProvider>
    <RoleProvider>
      <AppRouter />
      <Toaster />
    </RoleProvider>
    </CartProvider>
  );
}

export default App;
