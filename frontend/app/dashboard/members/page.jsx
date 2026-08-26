"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiDownload,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

/* =====================================================
   DEFAULT MEMBERS DATA
===================================================== */

const defaultMembersData = [
  {
    id: 1,
    name: "Aman Kumar",
    phone: "9876543210",
    plan: "Premium",
    joinDate: "19 Aug 2026",
    status: "Active",
    avatar: "AK",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    phone: "9123456780",
    plan: "Standard",
    joinDate: "18 Aug 2026",
    status: "Active",
    avatar: "RS",
  },
  {
    id: 3,
    name: "Vikas Singh",
    phone: "9988776655",
    plan: "Basic",
    joinDate: "17 Aug 2026",
    status: "Active",
    avatar: "VS",
  },
  {
    id: 4,
    name: "Mohit Verma",
    phone: "9900112233",
    plan: "Premium",
    joinDate: "16 Aug 2026",
    status: "Pending",
    avatar: "MV",
  },
  {
    id: 5,
    name: "Sahil Khan",
    phone: "9556667788",
    plan: "Standard",
    joinDate: "15 Aug 2026",
    status: "Inactive",
    avatar: "SK",
  },
];


/* =====================================================
   GET MEMBERS FROM LOCAL STORAGE
===================================================== */

const getInitialMembers = () => {
  if (typeof window === "undefined") {
    return defaultMembersData;
  }

  try {
    const savedMembers = localStorage.getItem("gym_members");

    if (savedMembers) {
      return JSON.parse(savedMembers);
    }

    localStorage.setItem(
      "gym_members",
      JSON.stringify(defaultMembersData)
    );

    return defaultMembersData;
  } catch (error) {
    console.error(
      "Error loading members:",
      error
    );

    return defaultMembersData;
  }
};


/* =====================================================
   MEMBERS PAGE
===================================================== */

export default function MembersPage() {

  const [members, setMembers] = useState(
    getInitialMembers
  );

  const [search, setSearch] = useState("");

  const [planFilter, setPlanFilter] =
    useState("All Plans");

  const [statusFilter, setStatusFilter] =
    useState("All Status");


  /* =====================================================
     FILTER MEMBERS
  ===================================================== */

  const filteredMembers = members.filter(
    (member) => {

      const searchValue =
        search.toLowerCase().trim();


      const matchSearch =
        member.name
          .toLowerCase()
          .includes(searchValue) ||
        member.phone.includes(searchValue);


      const matchPlan =
        planFilter === "All Plans" ||
        member.plan === planFilter;


      const matchStatus =
        statusFilter === "All Status" ||
        member.status === statusFilter;


      return (
        matchSearch &&
        matchPlan &&
        matchStatus
      );
    }
  );


  /* =====================================================
     DELETE MEMBER
     
     Extra safety:
     Delete directly from list if needed.
  ===================================================== */

  const handleDeleteFromList = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this member?"
      );

    if (!confirmDelete) {
      return;
    }


    const updatedMembers =
      members.filter(
        (member) =>
          String(member.id) !== String(id)
      );


    setMembers(updatedMembers);


    localStorage.setItem(
      "gym_members",
      JSON.stringify(updatedMembers)
    );
  };


  /* =====================================================
     EXPORT MEMBERS
  ===================================================== */

  const handleExport = () => {

    if (members.length === 0) {
      return;
    }


    const headers = [
      "ID",
      "Name",
      "Phone",
      "Plan",
      "Join Date",
      "Status",
    ];


    const rows = members.map(
      (member) => [
        member.id,
        member.name,
        member.phone,
        member.plan,
        member.joinDate,
        member.status,
      ]
    );


    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");


    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "gym-members.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };


  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="space-y-6">


      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          {/* Breadcrumb */}

          <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">

            <Link
              href="/dashboard"
              className="hover:text-green-400"
            >
              Dashboard
            </Link>

            <span>/</span>

            <span className="text-slate-400">
              Members
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Members
          </h1>


          <p className="mt-1 text-sm text-slate-500">
            Manage all gym members from here.
          </p>

        </div>


        {/* Create Member */}

        <Link
          href="/dashboard/members/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400"
        >
          <FiPlus className="text-lg" />
          Create Member
        </Link>

      </div>


      {/* =================================================
          FILTER BOX
      ================================================= */}

      <div className="rounded-2xl border border-white/10 bg-[#121821] p-4">

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">


          {/* Search */}

          <div className="relative md:col-span-1">

            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by name or phone..."
              className="w-full rounded-xl border border-white/10 bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-green-500/40"
            />

          </div>


          {/* Plan Filter */}

          <select
            value={planFilter}
            onChange={(e) =>
              setPlanFilter(e.target.value)
            }
            className="rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-slate-300 outline-none focus:border-green-500/40"
          >

            <option>All Plans</option>

            <option>Premium</option>

            <option>Standard</option>

            <option>Basic</option>

          </select>


          {/* Status Filter */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-slate-300 outline-none focus:border-green-500/40"
          >

            <option>All Status</option>

            <option>Active</option>

            <option>Pending</option>

            <option>Inactive</option>

          </select>


          {/* Export */}

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
          >
            <FiDownload />
            Export
          </button>

        </div>

      </div>


      {/* =================================================
          MEMBERS TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121821]">


        {/* Table Header */}

        <div className="border-b border-white/10 px-5 py-4">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-base font-semibold text-white">
                All Members
              </h2>


              <p className="mt-1 text-xs text-slate-500">
                {filteredMembers.length} members found
              </p>

            </div>


            <div className="hidden items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-xs text-slate-500 sm:flex">

              <FiFilter />

              Filters applied

            </div>

          </div>

        </div>


        {/* =================================================
            DESKTOP TABLE
        ================================================= */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="border-b border-white/10 bg-white/[0.02]">

                <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Member
                </th>

                <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Phone
                </th>

                <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Plan
                </th>

                <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Join Date
                </th>

                <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredMembers.length > 0 ? (

                filteredMembers.map(
                  (member) => (

                    <tr
                      key={member.id}
                      className="border-b border-white/5 transition hover:bg-white/[0.02]"
                    >


                      {/* Member */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-xs font-bold text-white">

                            {member.avatar}

                          </div>


                          <div>

                            <p className="text-sm font-semibold text-white">
                              {member.name}
                            </p>


                            <p className="mt-0.5 text-xs text-slate-600">
                              Member ID #{member.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* Phone */}

                      <td className="px-5 py-4 text-sm text-slate-400">
                        {member.phone}
                      </td>


                      {/* Plan */}

                      <td className="px-5 py-4">
                        <PlanBadge
                          plan={member.plan}
                        />
                      </td>


                      {/* Date */}

                      <td className="px-5 py-4 text-sm text-slate-400">
                        {member.joinDate}
                      </td>


                      {/* Status */}

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={member.status}
                        />
                      </td>


                      {/* Actions */}

                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-2">


                          {/* View */}

                          <Link
                            href={`/dashboard/members/${member.id}`}
                            title="View Member"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                          >
                            <FiEye />
                          </Link>


                          {/* Edit */}

                          <Link
                            href={`/dashboard/members/${member.id}/edit`}
                            title="Edit Member"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-yellow-500/20 hover:bg-yellow-500/10 hover:text-yellow-400"
                          >
                            <FiEdit2 />
                          </Link>


                          {/* Delete */}

                          <Link
                            href={`/dashboard/members/${member.id}/delete`}
                            title="Delete Member"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5 text-red-400 transition hover:bg-red-500/10"
                          >
                            <FiTrash2 className="text-sm" />
                          </Link>


                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="px-5 py-16 text-center"
                  >

                    <div className="mx-auto flex max-w-sm flex-col items-center">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-2xl text-slate-600">

                        <FiSearch />

                      </div>


                      <h3 className="mt-4 text-sm font-semibold text-white">
                        No members found
                      </h3>


                      <p className="mt-1 text-xs text-slate-600">
                        Try changing your search or filters.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            MOBILE CARDS
        ================================================= */}

        <div className="divide-y divide-white/5 md:hidden">

          {filteredMembers.length > 0 ? (

            filteredMembers.map(
              (member) => (

                <div
                  key={member.id}
                  className="p-4 transition hover:bg-white/[0.02]"
                >

                  <div className="flex items-start gap-3">


                    {/* Avatar */}

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-xs font-bold text-white">

                      {member.avatar}

                    </div>


                    <div className="min-w-0 flex-1">


                      <div className="flex items-start justify-between gap-2">

                        <div>

                          <h3 className="truncate text-sm font-semibold text-white">
                            {member.name}
                          </h3>


                          <p className="mt-1 text-xs text-slate-600">
                            #{member.id} · {member.phone}
                          </p>

                        </div>


                        <StatusBadge
                          status={member.status}
                        />

                      </div>


                      <div className="mt-3 flex flex-wrap items-center gap-2">

                        <PlanBadge
                          plan={member.plan}
                        />

                        <span className="text-xs text-slate-600">
                          Joined {member.joinDate}
                        </span>

                      </div>


                      {/* Mobile Actions */}

                      <div className="mt-4 flex gap-2">


                        <Link
                          href={`/dashboard/members/${member.id}`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-2 text-xs text-slate-300"
                        >
                          <FiEye />
                          View
                        </Link>


                        <Link
                          href={`/dashboard/members/${member.id}/edit`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-2 text-xs text-slate-300"
                        >
                          <FiEdit2 />
                          Edit
                        </Link>


                        <Link
                          href={`/dashboard/members/${member.id}/delete`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5 text-red-400 transition hover:bg-red-500/10"
                          title="Delete Member"
                        >
                          <FiTrash2 className="text-sm" />
                        </Link>


                      </div>

                    </div>

                  </div>

                </div>

              )
            )

          ) : (

            <div className="px-5 py-16 text-center">

              <FiSearch className="mx-auto text-2xl text-slate-600" />


              <h3 className="mt-3 text-sm font-semibold text-white">
                No members found
              </h3>


              <p className="mt-1 text-xs text-slate-600">
                Try changing your search or filters.
              </p>

            </div>

          )}

        </div>


        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-600">

            Showing{" "}

            <span className="text-slate-400">
              {filteredMembers.length}
            </span>{" "}

            of{" "}

            <span className="text-slate-400">
              {members.length}
            </span>{" "}

            members

          </p>


          <div className="flex items-center gap-2">


            <button
              type="button"
              disabled
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-600 disabled:cursor-not-allowed"
            >
              <FiChevronLeft />
            </button>


            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500 text-sm font-bold text-black"
            >
              1
            </button>


            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              2
            </button>


            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <FiChevronRight />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   PLAN BADGE
===================================================== */

function PlanBadge({ plan }) {

  const styles = {

    Premium:
      "bg-green-500/10 text-green-400 border-green-500/10",

    Standard:
      "bg-blue-500/10 text-blue-400 border-blue-500/10",

    Basic:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/10",
  };


  return (

    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-[11px] font-medium ${
        styles[plan] ||
        "bg-white/5 text-slate-400 border-white/10"
      }`}
    >
      {plan}
    </span>

  );
}


/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({ status }) {

  const styles = {

    Active:
      "bg-green-500/10 text-green-400 border-green-500/10",

    Pending:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/10",

    Inactive:
      "bg-red-500/10 text-red-400 border-red-500/10",
  };


  return (

    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-[11px] font-medium ${
        styles[status] ||
        "bg-white/5 text-slate-400 border-white/10"
      }`}
    >
      {status}
    </span>

  );
}