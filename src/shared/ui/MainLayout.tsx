import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <main className="w-full sm:max-w-xl md:max-w-2xl min-h-screen bg-white shadow-xl shadow-slate-200/50 md:my-4 md:rounded-[40px] overflow-hidden flex flex-col border-x border-slate-100/50">
        <div className="p-4 md:p-8 flex-1">
          <Outlet />
        </div>
        <div className="h-10" />
      </main>
    </div>
  );
};
