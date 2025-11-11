import { Outlet } from "react-router";
import Navigation from "../Components/Navigation";

export default function Layout() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <Outlet />
    </main>
  );
}
