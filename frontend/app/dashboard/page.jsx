"use client";

import Link from "next/link";

const stats = [
  {
    title: "Total Members",
    value: "1,248",
    change: "+12.5%",
    description: "vs last month",
    icon: "♙",
    color: "green",
  },
  {
    title: "Active Members",
    value: "1,086",
    change: "+8.2%",
    description: "vs last month",
    icon: "✓",
    color: "blue",
  },
  {
    title: "Total Trainers",
    value: "24",
    change: "+2",
    description: "new this month",
    icon: "♟",
    color: "purple",
  },
  {
    title: "Monthly Revenue",
    value: "₹4.82L",
    change: "+18.4%",
    description: "vs last month",
    icon: "₹",
    color: "orange",
  },
];

const members = [
  {
    name: "Aman Kumar",
    plan: "Premium",
    date: "Today, 09:32 AM",
    status: "Active",
    initials: "AK",
  },
  {
    name: "Rahul Sharma",
    plan: "Standard",
    date: "Today, 08:45 AM",
    status: "Active",
    initials: "RS",
  },
  {
    name: "Vikas Singh",
    plan: "Basic",
    date: "Yesterday",
    status: "Active",
    initials: "VS",
  },
  {
    name: "Mohit Verma",
    plan: "Premium",
    date: "Yesterday",
    status: "Pending",
    initials: "MV",
  },
];

const expiringMembers = [
  {
    name: "Rohit Kumar",
    plan: "Premium",
    days: "2 days",
    initials: "RK",
  },
  {
    name: "Sahil",
    plan: "Standard",
    days: "4 days",
    initials: "S",
  },
  {
    name: "Deepak",
    plan: "Premium",
    days: "6 days",
    initials: "D",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151D27] via-[#111821] to-[#0D131A] p-6 sm:p-8">
        
        {/* Glow */}
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-20 left-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Gym is operating normally
          </div>

          <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            Manage your gym.
            <br />
            <span className="text-green-400">
              Build stronger members.
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Track members, attendance, payments and gym performance
            from one powerful dashboard.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/members/add"
              className="rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
            >
              + Add Member
            </Link>

            <Link
              href="/dashboard/reports"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Reports →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Revenue Chart */}
        <div className="rounded-3xl border border-white/10 bg-[#121821] p-5 sm:p-6 xl:col-span-2">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-slate-500">
                Revenue Overview
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                ₹4,82,500
              </h2>

              <p className="mt-1 text-xs text-green-400">
                +18.4% compared to last month
              </p>
            </div>

            <select className="rounded-xl border border-white/10 bg-[#0B0F14] px-3 py-2 text-xs text-slate-300 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 6 months</option>
            </select>
          </div>

          {/* Fake Chart */}
          <div className="mt-8">
            <div className="flex h-64 items-end gap-2 sm:gap-4">
              {[35, 50, 42, 68, 54, 75, 62, 88, 72, 95, 80, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className="group flex flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-green-600/30 to-green-400 transition-all duration-300 group-hover:from-green-500/50 group-hover:to-green-300"
                      style={{ height: `${height}%` }}
                    />

                    <span className="text-[9px] text-slate-600">
                      {index + 1}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div className="rounded-3xl border border-white/10 bg-[#121821] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Today's Attendance
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                186
                <span className="ml-2 text-sm font-normal text-slate-500">
                  members
                </span>
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-xl text-green-400">
              ✓
            </div>
          </div>

          {/* Progress */}
          <div className="mt-8">
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-slate-500">
                Attendance rate
              </span>

              <span className="font-semibold text-green-400">
                86%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-green-600 to-green-400" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Present
              </p>

              <p className="mt-1 text-xl font-bold text-green-400">
                186
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Absent
              </p>

              <p className="mt-1 text-xl font-bold text-red-400">
                31
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/attendance"
            className="mt-5 block text-center text-sm font-medium text-green-400 hover:text-green-300"
          >
            View attendance →
          </Link>
        </div>
      </section>

      {/* Bottom Grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Recent Members */}
        <div className="rounded-3xl border border-white/10 bg-[#121821] p-5 sm:p-6 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Member Management
              </p>

              <h2 className="text-xl font-bold">
                Recent Members
              </h2>
            </div>

            <Link
              href="/dashboard/members"
              className="text-sm font-medium text-green-400 hover:text-green-300"
            >
              View all →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-slate-500">
                  <th className="pb-3 font-medium">
                    Member
                  </th>

                  <th className="pb-3 font-medium">
                    Plan
                  </th>

                  <th className="pb-3 font-medium">
                    Joined
                  </th>

                  <th className="pb-3 font-medium">
                    Status
                  </th>

                  <th className="pb-3 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.name}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold">
                          {member.initials}
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {member.name}
                          </p>

                          <p className="text-xs text-slate-600">
                            Member
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 text-sm text-slate-400">
                      {member.plan}
                    </td>

                    <td className="py-4 text-xs text-slate-500">
                      {member.date}
                    </td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          member.status === "Active"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <Link
                        href="/dashboard/members"
                        className="text-xs font-medium text-slate-400 hover:text-white"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expiring */}
        <div className="rounded-3xl border border-white/10 bg-[#121821] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Membership
              </p>

              <h2 className="text-xl font-bold">
                Expiring Soon
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
              !
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {expiringMembers.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-xs font-bold text-orange-400">
                  {member.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {member.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {member.plan}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-semibold text-orange-400">
                    {member.days}
                  </p>

                  <p className="text-[10px] text-slate-600">
                    remaining
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/members"
            className="mt-5 block text-center text-sm font-medium text-orange-400 hover:text-orange-300"
          >
            Manage memberships →
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="rounded-3xl border border-white/10 bg-[#121821] p-5 sm:p-6">
        <div className="mb-5">
          <p className="text-sm text-slate-500">
            Quick Access
          </p>

          <h2 className="text-xl font-bold">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <QuickAction
            href="/dashboard/members/add"
            icon="+"
            title="Add Member"
          />

          <QuickAction
            href="/dashboard/trainers/add"
            icon="♟"
            title="Add Trainer"
          />

          <QuickAction
            href="/dashboard/attendance"
            icon="✓"
            title="Attendance"
          />

          <QuickAction
            href="/dashboard/payments"
            icon="₹"
            title="Payment Billing"
          />

          <QuickAction
            href="/dashboard/diet-plans"
            icon="◉"
            title="Diet Plan"
          />

          <QuickAction
            href="/dashboard/reports"
            icon="▥"
            title="Reports"
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  description,
  icon,
  color,
}) {
  const colorClasses = {
    green: "bg-green-500/10 text-green-400",
    blue: "bg-blue-500/10 text-blue-400",
    purple: "bg-purple-500/10 text-purple-400",
    orange: "bg-orange-500/10 text-orange-400",
  };

  return (
    <div className="group rounded-3xl border border-white/10 bg-[#121821] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#151D27]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${colorClasses[color]}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span className="rounded-full bg-green-500/10 px-2 py-1 text-[11px] font-semibold text-green-400">
          {change}
        </span>

        <span className="text-xs text-slate-600">
          {description}
        </span>
      </div>
    </div>
  );
}

function QuickAction({ href, icon, title }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-green-500/20 hover:bg-green-500/5"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-green-400 transition group-hover:bg-green-500/10">
        {icon}
      </div>

      <p className="mt-3 text-xs font-medium text-slate-300 group-hover:text-white">
        {title}
      </p>
    </Link>
  );
}