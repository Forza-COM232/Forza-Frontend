import { Outlet } from "react-router";
import { AppNavbar } from "./AppNavbar";

export const AppLayout = () => {
  return (
    <div className="relative min-h-svh bg-cream font-figtree">
      {/* dark band behind the navbar that the first row of cards overlaps */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[300px] bg-cocoa" />
      <div className="relative">
        <AppNavbar />
        <main className="mx-auto w-full max-w-[1348px] px-6 pb-28">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
