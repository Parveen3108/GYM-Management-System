import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-white">
      <DashboardSidebar />

      <div className="lg:pl-72">
        <DashboardNavbar />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}