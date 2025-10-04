import "./App.css";
import RegisterForm from "./components/registrationForm/RegisterForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/loginForm/loginForm";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/registration",
    element: <RegisterForm />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-row bg-white justify-center items-center h-screen w-screen m-0">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
