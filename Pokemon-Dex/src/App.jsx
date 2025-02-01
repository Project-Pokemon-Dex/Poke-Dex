import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSideBar from "./components/AppSideBar";

function App() {
  return (
    <>
      <SidebarProvider>
        <AppSideBar />

        <Outlet />
      </SidebarProvider>
    </>
  );
}

export default App;
