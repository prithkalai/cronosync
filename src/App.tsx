import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeProvider } from "@/components/DarkModeToggle/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
