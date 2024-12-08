import { CartProvider } from "./Context/CartContext";
import { RoleProvider } from "./Context/RoleContext";
import AppRouter from "./routes/AppRouter";
function App() {
  return (
    <CartProvider>
    <RoleProvider>
      <AppRouter />
    </RoleProvider>
    </CartProvider>
  );
}

export default App;
