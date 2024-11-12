import { Nav, NavLink } from "@/components/Nav";
import { ThemeProvider } from "@/context/theme-context";
import { LoadingProvider } from "../../context/loading-context";

// to tell next that we don't want  caching for admin pages we ned all the recent latest data fetched
export const dynamic = "force-dynamic";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider>
      <Nav>
        <NavLink href={"/admin"}>Dashboard</NavLink>
        <NavLink href={"/admin/products"}>Products</NavLink>
        <NavLink href={"/admin/users"}>Users|Customers</NavLink>
        <NavLink href={"/admin/orders"}>Orders|Sales</NavLink>
      </Nav>

      <LoadingProvider>
        <div>{children}</div>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default AdminLayout;
