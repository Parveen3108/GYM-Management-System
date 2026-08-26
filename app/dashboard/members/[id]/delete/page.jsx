"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiTrash2,
  FiAlertTriangle,
  FiUser,
  FiPhone,
  FiMail,
  FiCreditCard,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";


/* =====================================================
   MEMBER DATA
===================================================== */

const membersData = {
  1: {
    id: 1,
    name: "Aman Kumar",
    phone: "9876543210",
    email: "aman.kumar@gmail.com",
    plan: "Premium",
    joinDate: "19 Aug 2026",
    status: "Active",
    initials: "AK",
  },

  2: {
    id: 2,
    name: "Rahul Sharma",
    phone: "9123456780",
    email: "rahul.sharma@gmail.com",
    plan: "Standard",
    joinDate: "18 Aug 2026",
    status: "Active",
    initials: "RS",
  },

  3: {
    id: 3,
    name: "Vikas Singh",
    phone: "9988776655",
    email: "vikas.singh@gmail.com",
    plan: "Basic",
    joinDate: "17 Aug 2026",
    status: "Active",
    initials: "VS",
  },

  4: {
    id: 4,
    name: "Mohit Verma",
    phone: "9900112233",
    email: "mohit.verma@gmail.com",
    plan: "Premium",
    joinDate: "16 Aug 2026",
    status: "Pending",
    initials: "MV",
  },

  5: {
    id: 5,
    name: "Sahil Khan",
    phone: "9556667788",
    email: "sahil.khan@gmail.com",
    plan: "Standard",
    joinDate: "15 Aug 2026",
    status: "Inactive",
    initials: "SK",
  },
};


/* =====================================================
   PAGE
===================================================== */

export default function DeleteMemberPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const member = membersData[id];

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);


  /* =====================================================
     MEMBER NOT FOUND
  ===================================================== */

  if (!member) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-2xl font-bold text-red-400">
            !
          </div>

          <h1 className="mt-5 text-xl font-bold text-white">
            Member Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Member ID #{id} does not exist.
          </p>

          <Link
            href="/dashboard/members"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black"
          >
            <FiArrowLeft />
            Back to Members
          </Link>

        </div>

      </div>
    );
  }


  /* =====================================================
     DELETE FUNCTION
  ===================================================== */

 const handleDelete = () => {
  const savedMembers = localStorage.getItem("gym_members");

  if (savedMembers) {
    const members = JSON.parse(savedMembers);

    const updatedMembers = members.filter(
      (item) => String(item.id) !== String(id)
    );

    localStorage.setItem(
      "gym_members",
      JSON.stringify(updatedMembers)
    );
  }

  router.push("/dashboard/members");
};


  /* =====================================================
     SUCCESS SCREEN
  ===================================================== */

  if (deleted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">

        <div className="w-full max-w-md rounded-3xl border border-green-500/20 bg-[#121821] p-8 text-center shadow-2xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">

            <FiCheckCircle className="text-4xl text-green-400" />

          </div>


          <h1 className="mt-6 text-2xl font-bold text-white">
            Member Deleted
          </h1>


          <p className="mt-2 text-sm leading-6 text-slate-500">
            <span className="font-medium text-white">
              {member.name}
            </span>{" "}
            has been removed successfully.
          </p>


          <button
            type="button"
            onClick={() => router.push("/dashboard/members")}
            className="mt-7 w-full rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
          >
            Back to Members
          </button>

        </div>

      </div>
    );
  }


  /* =====================================================
     DELETE PAGE
  ===================================================== */

  return (
    <div className="mx-auto max-w-5xl space-y-6">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">

            <Link
              href="/dashboard"
              className="hover:text-green-400"
            >
              Dashboard
            </Link>

            <span>/</span>

            <Link
              href="/dashboard/members"
              className="hover:text-green-400"
            >
              Members
            </Link>

            <span>/</span>

            <span className="text-red-400">
              Delete Member
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Delete Member
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review the member before deleting.
          </p>

        </div>


        <Link
          href="/dashboard/members"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 hover:bg-white/[0.06]"
        >
          <FiArrowLeft />
          Back to Members
        </Link>

      </div>


      {/* =================================================
          MEMBER CARD
      ================================================= */}

      <section className="rounded-3xl border border-white/10 bg-[#121821] p-5 sm:p-7">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

          {/* Avatar */}

          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-700 text-2xl font-bold text-black">
            {member.initials}
          </div>


          {/* Name */}

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <h2 className="text-2xl font-bold text-white">
                {member.name}
              </h2>

              <span className="rounded-md bg-green-500/10 px-2 py-1 text-[10px] font-semibold text-green-400">
                {member.status}
              </span>

            </div>

            <p className="mt-1 text-sm text-slate-600">
              Member ID #{member.id}
            </p>


            <div className="mt-4 flex flex-wrap gap-2">

              <span className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-slate-400">
                {member.plan}
              </span>

              <span className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-slate-400">
                Joined {member.joinDate}
              </span>

            </div>

          </div>

        </div>


        {/* Details */}

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          <Info
            icon={<FiPhone />}
            label="Phone"
            value={member.phone}
          />

          <Info
            icon={<FiMail />}
            label="Email"
            value={member.email}
          />

          <Info
            icon={<FiCreditCard />}
            label="Membership"
            value={member.plan}
          />

          <Info
            icon={<FiCalendar />}
            label="Join Date"
            value={member.joinDate}
          />

          <Info
            icon={<FiUser />}
            label="Member ID"
            value={`#${member.id}`}
          />

        </div>

      </section>


      {/* =================================================
          WARNING
      ================================================= */}

      <section className="rounded-3xl border border-red-500/20 bg-red-500/[0.03] p-5 sm:p-7">

        <div className="flex gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-xl text-red-400">
            <FiAlertTriangle />
          </div>


          <div>

            <h2 className="text-lg font-bold text-red-400">
              Are you sure?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              You are about to delete{" "}
              <span className="font-semibold text-white">
                {member.name}
              </span>{" "}
              from your gym management system.
            </p>

          </div>

        </div>


        <div className="mt-5 rounded-xl border border-red-500/10 bg-red-500/5 p-4">

          <p className="text-sm font-semibold text-red-400">
            ⚠ This action cannot be undone.
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Member information, attendance, payments,
            diet and workout records may be removed when
            the database is connected.
          </p>

        </div>

      </section>


      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">

        <Link
          href={`/dashboard/members/${id}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >
          <FiArrowLeft />
          Cancel
        </Link>


        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/10 transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {isDeleting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Deleting...
            </>
          ) : (
            <>
              <FiTrash2 />
              Delete Member
            </>
          )}

        </button>

      </div>

    </div>
  );
}


/* =====================================================
   INFO COMPONENT
===================================================== */

function Info({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] uppercase tracking-wide text-slate-600">
          {label}
        </p>

        <p className="mt-1 truncate text-sm text-slate-300">
          {value}
        </p>

      </div>

    </div>
  );
}