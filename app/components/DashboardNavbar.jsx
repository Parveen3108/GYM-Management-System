"use client";

import { useState } from "react";

export default function DashboardNavbar() {
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B0F14]/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div>
          <p className="hidden text-xs text-slate-500 sm:block">
            Wednesday, August 19, 2026
          </p>

          <h2 className="text-lg font-bold sm:text-xl">
            Good evening, Admin 👋
          </h2>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search */}
          <div className="hidden items-center rounded-xl border border-white/10 bg-white/[0.03] px-3 md:flex">
            <span className="text-slate-500">⌕</span>

            <input
              type="text"
              placeholder="Search..."
              className="w-40 bg-transparent px-2 py-2.5 text-sm text-white outline-none placeholder:text-slate-600"
            />
          </div>

          {/* Notification */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              🔔

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 top-14 w-72 rounded-2xl border border-white/10 bg-[#121821] p-4 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Notifications</h3>

                  <span className="rounded-full bg-red-500/10 px-2 py-1 text-xs text-red-400">
                    3 New
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl bg-white/[0.03] p-3">
                    <p className="text-sm font-medium">
                      Membership Expiring
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      5 memberships expire this week.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.03] p-3">
                    <p className="text-sm font-medium">
                      Payment Pending
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      3 payments are pending.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="hidden items-center gap-3 border-l border-white/10 pl-4 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-700 text-sm font-bold text-black">
              PS
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-semibold">
                Parveen
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}