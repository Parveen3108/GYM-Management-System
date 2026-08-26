"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiCreditCard,
  FiPackage,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiActivity,
  FiCoffee,
} from "react-icons/fi";


export default function Sidebar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);

  /* =====================================================
     MENU
  ===================================================== */

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FiHome />,
      href: "/dashboard",
    },

    {
      title: "Members",
      icon: <FiUsers />,
      href: "/dashboard/members",
    },

    {
      title: "Trainers",
      icon: <FiUserCheck />,
      href: "/dashboard/trainers",
    },

    {
      title: "Diet Plans",
      icon: <FiCoffee />,
      href: "/dashboard/diet",
    },

    {
      title: "Attendance",
      icon: <FiCalendar />,
      href: "/dashboard/attendance",
    },

    {
      title: "Billing",
      icon: <FiCreditCard />,
      href: "/dashboard/billing",
    },

    {
      title: "Supplements",
      icon: <FiPackage />,
      href: "/dashboard/supplements",
    },

    {
      title: "Reports",
      icon: <FiBarChart2 />,
      href: "/dashboard/reports",
    },
  ];

  /* =====================================================
     ACTIVE CHECK
  ===================================================== */

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  /* =====================================================
     CLOSE MOBILE SIDEBAR
  ===================================================== */

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* =================================================
          MOBILE TOP BAR
      ================================================= */}

      <div className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0B0F14] px-4 lg:hidden">
        {/* LEFT */}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
          >
            <FiMenu className="text-xl" />
          </button>

          {/* LOGO */}

          <Link
            href="/dashboard"
            onClick={closeMobileSidebar}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500 text-black">
              <FiActivity />
            </div>

            <span className="text-lg font-bold text-white">
              GYM<span className="text-green-400">PRO</span>
            </span>
          </Link>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-semibold text-white">Admin</p>

            <p className="text-[10px] text-slate-600">Gym Manager</p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-black">
            A
          </div>
        </div>
      </div>

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[270px]
          flex-col
          border-r
          border-white/10
          bg-[#0B0F14]
          transition-transform
          duration-300
          ease-in-out

          lg:translate-x-0

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/dashboard"
            onClick={closeMobileSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-black shadow-lg shadow-green-500/10">
              <FiActivity className="text-xl" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide text-white">
                GYM<span className="text-green-400">PRO</span>
              </h1>

              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Management
              </p>
            </div>
          </Link>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={closeMobileSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.05] hover:text-white lg:hidden"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* =================================================
            PROFILE
        ================================================= */}

        <div className="border-b border-white/5 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-black">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Admin</p>

              <p className="truncate text-xs text-slate-600">Gym Manager</p>
            </div>
          </div>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-700">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileSidebar}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-green-500/10 text-green-400"
                      : "text-slate-500 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                      active
                        ? "bg-green-500 text-black"
                        : "bg-white/[0.03] text-slate-500 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span className="flex-1">{item.title}</span>

                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* =================================================
              SETTINGS
          ================================================= */}

          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-700">
            System
          </p>

          <Link
            href="/dashboard/settings"
            onClick={closeMobileSidebar}
            className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
              isActive("/dashboard/settings")
                ? "bg-green-500/10 text-green-400"
                : "text-slate-500 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] group-hover:text-white">
              <FiSettings />
            </span>
            Settings
          </Link>
        </nav>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <div className="shrink-0 border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => {
              const confirmLogout = window.confirm(
                "Are you sure you want to logout?",
              );

              if (confirmLogout) {
                console.log("Logout clicked");
              }
            }}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] group-hover:bg-red-500/10">
              <FiLogOut />
            </span>
            Logout
          </button>
        </div>
      </aside>

      {/* =================================================
          DESKTOP CONTENT SPACER

          Sidebar width = 270px
      ================================================= */}

      <div className="hidden lg:block lg:w-[270px] lg:shrink-0" />
    </>
  );
}
