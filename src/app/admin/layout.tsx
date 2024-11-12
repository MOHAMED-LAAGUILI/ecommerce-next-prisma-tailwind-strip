import { Nav, NavLink } from "@/components/Nav";
import { ThemeProvider } from "@/context/theme-context";
import { LoadingProvider } from "../../context/loading-context";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// to tell next that we don't want  caching for admin pages we ned all the recent latest data fetched
export const dynamic = "force-dynamic";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  
  return (
    <ThemeProvider>
      <Nav>
        <NavLink href={"/admin"}>Dashboard</NavLink>
        <NavLink href={"/admin/products"}>Products</NavLink>
        <NavLink href={"/admin/users"}>Users | Customers</NavLink>
        <NavLink href={"/admin/orders"}>Orders | Sales</NavLink>
        <NavLink href={"/admin/dev"}>About | Dev</NavLink>
      </Nav>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <LoadingProvider>
        <div className={"min-h-screen bg-slate-100 dark:bg-gray-900 text-black dark:text-white"}>
          {children}
          </div>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default AdminLayout;
