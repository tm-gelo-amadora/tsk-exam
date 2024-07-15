import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { SidebarContextProvider } from "./contexts/Sidebar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import { ProviderPage } from "./pages/ProviderPage";

const MainLayout: React.FC = () => {
  return (
    <>
      <SidebarContextProvider>
        <Sidebar />
        <Outlet />
      </SidebarContextProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:domain/:id",
        element: <ProviderPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider {...{ router }} />;
}

export default App;
