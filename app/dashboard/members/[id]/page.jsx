"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  FiArrowLeft,
  FiEdit2,
  FiPrinter,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiCreditCard,
  FiCheckCircle,
  FiXCircle,
  FiActivity,
  FiTarget,
  FiDollarSign,
  FiFileText,
  FiClock,
} from "react-icons/fi";


/* =====================================================
   DUMMY MEMBER DATA
   Later we will replace this with Firebase / MongoDB
===================================================== */

const membersData = {
  1: {
    id: 1,
    name: "Aman Kumar",
    phone: "9876543210",
    email: "aman.kumar@gmail.com",
    gender: "Male",
    dob: "12 May 1998",
    age: 28,
    address: "Hansi, Haryana",
    emergencyContact: "9876501234",

    plan: "Premium",
    joinDate: "19 Aug 2026",
    expiryDate: "19 Sep 2026",
    paymentMethod: "UPI",
    amount: "₹2,500",
    status: "Active",

    attendance: {
      present: 24,
      absent: 4,
      total: 28,
      percentage: 85.7,
    },

    diet: "High Protein Diet",
    workout: "Upper Body Strength",

    notes: "Prefers morning workout sessions.",

    initials: "AK",
  },

  2: {
    id: 2,
    name: "Rahul Sharma",
    phone: "9123456780",
    email: "rahul.sharma@gmail.com",
    gender: "Male",
    dob: "20 March 1997",
    age: 29,
    address: "Hisar, Haryana",
    emergencyContact: "9876543210",

    plan: "Standard",
    joinDate: "18 Aug 2026",
    expiryDate: "18 Sep 2026",
    paymentMethod: "Cash",
    amount: "₹1,500",
    status: "Active",

    attendance: {
      present: 20,
      absent: 6,
      total: 26,
      percentage: 76.9,
    },

    diet: "Balanced Diet",
    workout: "Full Body Workout",

    notes: "Focus on weight loss.",

    initials: "RS",
  },

  3: {
    id: 3,
    name: "Vikas Singh",
    phone: "9988776655",
    email: "vikas.singh@gmail.com",
    gender: "Male",
    dob: "15 January 1999",
    age: 27,
    address: "Rohtak, Haryana",
    emergencyContact: "9988776655",

    plan: "Basic",
    joinDate: "17 Aug 2026",
    expiryDate: "17 Sep 2026",
    paymentMethod: "Card",
    amount: "₹1,000",
    status: "Active",

    attendance: {
      present: 18,
      absent: 8,
      total: 26,
      percentage: 69.2,
    },

    diet: "Normal Diet",
    workout: "Beginner Workout",

    notes: "New gym member.",

    initials: "VS",
  },

  4: {
    id: 4,
    name: "Mohit Verma",
    phone: "9900112233",
    email: "mohit.verma@gmail.com",
    gender: "Male",
    dob: "10 June 1996",
    age: 30,
    address: "Delhi",
    emergencyContact: "9900112233",

    plan: "Premium",
    joinDate: "16 Aug 2026",
    expiryDate: "16 Sep 2026",
    paymentMethod: "UPI",
    amount: "₹2,500",
    status: "Pending",

    attendance: {
      present: 10,
      absent: 5,
      total: 15,
      percentage: 66.6,
    },

    diet: "Muscle Gain Diet",
    workout: "Heavy Strength",

    notes: "Payment verification pending.",

    initials: "MV",
  },

  5: {
    id: 5,
    name: "Sahil Khan",
    phone: "9556667788",
    email: "sahil.khan@gmail.com",
    gender: "Male",
    dob: "25 July 2000",
    age: 26,
    address: "Panipat, Haryana",
    emergencyContact: "9556667788",

    plan: "Standard",
    joinDate: "15 Aug 2026",
    expiryDate: "15 Sep 2026",
    paymentMethod: "Cash",
    amount: "₹1,500",
    status: "Inactive",

    attendance: {
      present: 8,
      absent: 10,
      total: 18,
      percentage: 44.4,
    },

    diet: "Weight Loss Diet",
    workout: "Cardio",

    notes: "Member currently inactive.",

    initials: "SK",
  },
};


/* =====================================================
   PAGE
===================================================== */

export default function MemberDetailsPage() {
  const params = useParams();

  const id = params.id;

  const member = membersData[id];

  const [activeTab, setActiveTab] = useState("overview");


  /* =====================================================
     MEMBER NOT FOUND
  ===================================================== */

  if (!member) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-2xl text-red-400">
            !
          </div>

          <h1 className="mt-5 text-xl font-bold text-white">
            Member Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The member you are looking for does not exist.
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
     PRINT
  ===================================================== */

  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="mx-auto max-w-7xl space-y-6">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          {/* Breadcrumb */}

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

            <span className="text-slate-400">
              {member.name}
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Member Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage member information.
          </p>

        </div>


        {/* Header Buttons */}

        <div className="flex flex-wrap gap-2">

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
          >
            <FiPrinter />
            Print
          </button>


          <Link
            href={`/dashboard/members/${member.id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
          >
            <FiEdit2 />
            Edit Member
          </Link>


          <Link
            href="/dashboard/members"
            className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
          >
            <FiArrowLeft />
            Back to Members
          </Link>

        </div>

      </div>


      {/* =================================================
          MEMBER PROFILE CARD
      ================================================= */}

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#121821]">

        <div className="grid grid-cols-1 lg:grid-cols-2">


          {/* LEFT PROFILE */}

          <div className="p-6 sm:p-8">

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">

              {/* Avatar */}

              <div className="relative">

                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-700 text-3xl font-bold text-black shadow-xl shadow-green-500/10">
                  {member.initials}
                </div>


                {/* Online */}
                <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-[#121821] bg-green-500" />

              </div>


              {/* Basic Info */}

              <div className="text-center sm:text-left">

                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">

                  <h2 className="text-2xl font-bold text-white">
                    {member.name}
                  </h2>

                  <span className="rounded-md bg-green-500/10 px-2 py-1 text-[10px] font-semibold text-green-400">
                    ID #{member.id}
                  </span>

                </div>


                <p className="mt-1 text-sm text-slate-500">
                  Gym Member
                </p>


                <div className="mt-4">

                  <StatusBadge status={member.status} />

                </div>

              </div>

            </div>


            {/* Contact Info */}

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <InfoItem
                icon={<FiPhone />}
                label="Phone"
                value={member.phone}
              />

              <InfoItem
                icon={<FiMail />}
                label="Email"
                value={member.email}
              />

              <InfoItem
                icon={<FiUser />}
                label="Gender"
                value={member.gender}
              />

              <InfoItem
                icon={<FiCalendar />}
                label="Date of Birth"
                value={`${member.dob} (${member.age} yrs)`}
              />

              <InfoItem
                icon={<FiMapPin />}
                label="Address"
                value={member.address}
              />

              <InfoItem
                icon={<FiPhone />}
                label="Emergency"
                value={member.emergencyContact}
              />

            </div>

          </div>


          {/* RIGHT MEMBERSHIP */}

          <div className="border-t border-white/10 bg-white/[0.015] p-6 sm:p-8 lg:border-l lg:border-t-0">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <FiCreditCard />
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  Membership Information
                </h3>

                <p className="text-xs text-slate-600">
                  Plan and payment details
                </p>

              </div>

            </div>


            <div className="mt-6 space-y-4">

              <MembershipRow
                icon={<FiCreditCard />}
                label="Plan"
                value={member.plan}
              />

              <MembershipRow
                icon={<FiCalendar />}
                label="Join Date"
                value={member.joinDate}
              />

              <MembershipRow
                icon={<FiCalendar />}
                label="Expiry Date"
                value={member.expiryDate}
              />

              <MembershipRow
                icon={<FiDollarSign />}
                label="Payment Method"
                value={member.paymentMethod}
              />

              <MembershipRow
                icon={<FiDollarSign />}
                label="Amount"
                value={member.amount}
              />

              <MembershipRow
                icon={<FiActivity />}
                label="Status"
                value={<StatusBadge status={member.status} />}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          TABS
      ================================================= */}

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#121821]">

        <div className="flex min-w-max">

          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<FiActivity />}
            label="Overview"
          />

          <TabButton
            active={activeTab === "attendance"}
            onClick={() => setActiveTab("attendance")}
            icon={<FiCheckCircle />}
            label="Attendance"
          />

          <TabButton
            active={activeTab === "diet"}
            onClick={() => setActiveTab("diet")}
            icon={<FiTarget />}
            label="Diet Plan"
          />

          <TabButton
            active={activeTab === "workout"}
            onClick={() => setActiveTab("workout")}
            icon={<FiActivity />}
            label="Workout Plan"
          />

          <TabButton
            active={activeTab === "payments"}
            onClick={() => setActiveTab("payments")}
            icon={<FiDollarSign />}
            label="Payments"
          />

          <TabButton
            active={activeTab === "notes"}
            onClick={() => setActiveTab("notes")}
            icon={<FiFileText />}
            label="Notes"
          />

        </div>

      </div>


      {/* =================================================
          TAB CONTENT
      ================================================= */}

      {activeTab === "overview" && (
        <OverviewTab member={member} />
      )}

      {activeTab === "attendance" && (
        <AttendanceTab member={member} />
      )}

      {activeTab === "diet" && (
        <DietTab member={member} />
      )}

      {activeTab === "workout" && (
        <WorkoutTab member={member} />
      )}

      {activeTab === "payments" && (
        <PaymentsTab member={member} />
      )}

      {activeTab === "notes" && (
        <NotesTab member={member} />
      )}

    </div>
  );
}


/* =====================================================
   OVERVIEW TAB
===================================================== */

function OverviewTab({ member }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">


      {/* Attendance Summary */}

      <div className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Member Summary
            </p>

            <h2 className="mt-1 text-lg font-bold text-white">
              Attendance Overview
            </h2>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
            <FiActivity />
          </div>

        </div>


        <div className="mt-6 grid grid-cols-2 gap-3">

          <SummaryCard
            icon={<FiCheckCircle />}
            value={member.attendance.present}
            label="Present"
            type="green"
          />

          <SummaryCard
            icon={<FiXCircle />}
            value={member.attendance.absent}
            label="Absent"
            type="red"
          />

          <SummaryCard
            icon={<FiCalendar />}
            value={member.attendance.total}
            label="Total Sessions"
            type="blue"
          />

          <SummaryCard
            icon={<FiActivity />}
            value={`${member.attendance.percentage}%`}
            label="Attendance Rate"
            type="purple"
          />

        </div>

      </div>


      {/* Membership Progress */}

      <div className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Membership
            </p>

            <h2 className="mt-1 text-lg font-bold text-white">
              Membership Progress
            </h2>

          </div>

          <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-400">
            {member.plan}
          </span>

        </div>


        {/* Progress */}

        <div className="mt-7">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-xs text-slate-500">
              Membership validity
            </span>

            <span className="text-xs font-semibold text-green-400">
              72%
            </span>

          </div>


          <div className="h-3 overflow-hidden rounded-full bg-white/5">

            <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-green-600 to-green-400" />

          </div>

        </div>


        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-xl bg-white/[0.03] p-4">

            <p className="text-xs text-slate-600">
              Start Date
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {member.joinDate}
            </p>

          </div>


          <div className="rounded-xl bg-white/[0.03] p-4">

            <p className="text-xs text-slate-600">
              Expiry Date
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {member.expiryDate}
            </p>

          </div>

        </div>


        <div className="mt-4 flex items-center gap-3 rounded-xl border border-green-500/10 bg-green-500/5 p-4">

          <FiClock className="text-green-400" />

          <div>

            <p className="text-sm font-semibold text-green-400">
              Membership Active
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Member can access the gym.
            </p>

          </div>

        </div>

      </div>


      {/* Upcoming Workout */}

      <div className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
            <FiActivity />
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Workout
            </p>

            <h2 className="text-lg font-bold text-white">
              Current Workout Plan
            </h2>

          </div>

        </div>


        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="font-semibold text-white">
                {member.workout}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Next scheduled session
              </p>

            </div>

            <span className="rounded-lg bg-green-500/10 px-2.5 py-1 text-xs text-green-400">
              Active
            </span>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">

            <FiCalendar />

            Tomorrow

            <span>•</span>

            <FiClock />

            7:00 AM - 8:00 AM

          </div>

        </div>

      </div>


      {/* Diet */}

      <div className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <FiTarget />
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Nutrition
            </p>

            <h2 className="text-lg font-bold text-white">
              Current Diet Plan
            </h2>

          </div>

        </div>


        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">

          <p className="font-semibold text-white">
            {member.diet}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Assigned diet plan
          </p>

          <div className="mt-4 flex items-center justify-between">

            <span className="text-xs text-slate-500">
              Daily Calories
            </span>

            <span className="text-sm font-semibold text-purple-400">
              2800 kcal
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   ATTENDANCE TAB
===================================================== */

function AttendanceTab({ member }) {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <SummaryCard
          icon={<FiCheckCircle />}
          value={member.attendance.present}
          label="Present Days"
          type="green"
        />

        <SummaryCard
          icon={<FiXCircle />}
          value={member.attendance.absent}
          label="Absent Days"
          type="red"
        />

        <SummaryCard
          icon={<FiActivity />}
          value={`${member.attendance.percentage}%`}
          label="Attendance Rate"
          type="purple"
        />

      </div>


      <div className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

        <h2 className="text-lg font-bold text-white">
          Recent Attendance
        </h2>

        <div className="mt-5 space-y-3">

          {[
            ["19 Aug 2026", "07:10 AM", "Present"],
            ["18 Aug 2026", "07:25 AM", "Present"],
            ["17 Aug 2026", "-", "Absent"],
            ["16 Aug 2026", "06:55 AM", "Present"],
            ["15 Aug 2026", "07:15 AM", "Present"],
          ].map((item, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >

              <div>

                <p className="text-sm font-medium text-white">
                  {item[0]}
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Check-in: {item[1]}
                </p>

              </div>

              {item[2] === "Present" ? (

                <span className="rounded-md bg-green-500/10 px-2.5 py-1 text-xs text-green-400">
                  Present
                </span>

              ) : (

                <span className="rounded-md bg-red-500/10 px-2.5 py-1 text-xs text-red-400">
                  Absent
                </span>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   DIET TAB
===================================================== */

function DietTab({ member }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <FiTarget />
        </div>

        <div>

          <p className="text-sm text-slate-500">
            Assigned Diet
          </p>

          <h2 className="text-xl font-bold text-white">
            {member.diet}
          </h2>

        </div>

      </div>


      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <MealCard
          title="Breakfast"
          food="Oats + Eggs + Banana"
          calories="650 kcal"
        />

        <MealCard
          title="Lunch"
          food="Rice + Chicken + Salad"
          calories="850 kcal"
        />

        <MealCard
          title="Dinner"
          food="Paneer + Roti + Salad"
          calories="750 kcal"
        />

      </div>

    </div>
  );
}


/* =====================================================
   WORKOUT TAB
===================================================== */

function WorkoutTab({ member }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
          <FiActivity />
        </div>

        <div>

          <p className="text-sm text-slate-500">
            Assigned Workout
          </p>

          <h2 className="text-xl font-bold text-white">
            {member.workout}
          </h2>

        </div>

      </div>


      <div className="mt-6 space-y-3">

        <WorkoutItem
          day="Monday"
          workout="Chest + Triceps"
        />

        <WorkoutItem
          day="Tuesday"
          workout="Back + Biceps"
        />

        <WorkoutItem
          day="Wednesday"
          workout="Legs + Core"
        />

        <WorkoutItem
          day="Thursday"
          workout="Shoulders"
        />

        <WorkoutItem
          day="Friday"
          workout="Full Body"
        />

      </div>

    </div>
  );
}


/* =====================================================
   PAYMENTS TAB
===================================================== */

function PaymentsTab({ member }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            Payment History
          </p>

          <h2 className="text-xl font-bold text-white">
            Payments
          </h2>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
          <FiDollarSign />
        </div>

      </div>


      <div className="mt-5 overflow-x-auto">

        <table className="w-full min-w-[600px]">

          <thead>

            <tr className="border-b border-white/10 text-left">

              <th className="pb-3 text-xs font-medium text-slate-500">
                Invoice
              </th>

              <th className="pb-3 text-xs font-medium text-slate-500">
                Date
              </th>

              <th className="pb-3 text-xs font-medium text-slate-500">
                Method
              </th>

              <th className="pb-3 text-xs font-medium text-slate-500">
                Amount
              </th>

              <th className="pb-3 text-xs font-medium text-slate-500">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b border-white/5">

              <td className="py-4 text-sm text-white">
                INV-{member.id}001
              </td>

              <td className="py-4 text-sm text-slate-400">
                {member.joinDate}
              </td>

              <td className="py-4 text-sm text-slate-400">
                {member.paymentMethod}
              </td>

              <td className="py-4 text-sm font-semibold text-white">
                {member.amount}
              </td>

              <td className="py-4">

                <span className="rounded-md bg-green-500/10 px-2.5 py-1 text-xs text-green-400">
                  Paid
                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}


/* =====================================================
   NOTES TAB
===================================================== */

function NotesTab({ member }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <FiFileText />
        </div>

        <div>

          <p className="text-sm text-slate-500">
            Member Notes
          </p>

          <h2 className="text-xl font-bold text-white">
            Notes
          </h2>

        </div>

      </div>


      <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">

        <p className="text-sm leading-7 text-slate-400">
          {member.notes}
        </p>

      </div>

    </div>
  );
}


/* =====================================================
   INFO ITEM
===================================================== */

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[11px] uppercase tracking-wide text-slate-600">
          {label}
        </p>

        <p className="mt-1 break-words text-sm text-slate-300">
          {value}
        </p>

      </div>

    </div>
  );
}


/* =====================================================
   MEMBERSHIP ROW
===================================================== */

function MembershipRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3 last:border-0">

      <div className="flex items-center gap-3">

        <span className="text-slate-600">
          {icon}
        </span>

        <span className="text-sm text-slate-500">
          {label}
        </span>

      </div>

      <div className="text-right text-sm font-medium text-white">
        {value}
      </div>

    </div>
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
        "border-white/10 bg-white/5 text-slate-400"
      }`}
    >
      {status}
    </span>
  );
}


/* =====================================================
   TAB BUTTON
===================================================== */

function TabButton({
  active,
  onClick,
  icon,
  label,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition ${
        active
          ? "border-green-500 bg-green-500/5 text-green-400"
          : "border-transparent text-slate-500 hover:bg-white/[0.02] hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}


/* =====================================================
   SUMMARY CARD
===================================================== */

function SummaryCard({
  icon,
  value,
  label,
  type,
}) {
  const styles = {
    green: "bg-green-500/10 text-green-400",
    red: "bg-red-500/10 text-red-400",
    blue: "bg-blue-500/10 text-blue-400",
    purple: "bg-purple-500/10 text-purple-400",
  };

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${styles[type]}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-600">
        {label}
      </p>

    </div>
  );
}


/* =====================================================
   MEAL CARD
===================================================== */

function MealCard({
  title,
  food,
  calories,
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">

      <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">
        {title}
      </p>

      <p className="mt-3 text-sm font-medium text-white">
        {food}
      </p>

      <p className="mt-2 text-xs text-slate-600">
        {calories}
      </p>

    </div>
  );
}


/* =====================================================
   WORKOUT ITEM
===================================================== */

function WorkoutItem({
  day,
  workout,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">

      <div>

        <p className="text-xs text-slate-600">
          {day}
        </p>

        <p className="mt-1 text-sm font-semibold text-white">
          {workout}
        </p>

      </div>

      <span className="rounded-md bg-green-500/10 px-2.5 py-1 text-xs text-green-400">
        Scheduled
      </span>

    </div>
  );
}