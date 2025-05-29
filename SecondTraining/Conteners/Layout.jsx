import { Outlet } from "react-router";
import { Nave } from "./Nave";
import React from "react";
import { HookProvider } from "./Use_Context/hook";
// { children }
export function Layout() {
  return (
    <>
      <Nave />
      {/* outlet here will replace the outlet with the root that I want to display, which we will move to, treating it like childern */}
      {/* will replace it with the component he has here */}
      {/*   Add Routes Components here
       */}
      <main className="p-4 mx-7xl font-bold size-2xl">
        <HookProvider>
          <Outlet />
        </HookProvider>
      </main>
      {/* Here I add whatever I want, I don’t want to post anything I want to share in all the forums */}
    </>
  );
}
