"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  FiPlus,
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiRefreshCw,
  FiCoffee,
  FiUsers,
  FiCalendar,
  FiTarget,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";


// =====================================================
// DEMO DATA
// =====================================================

const demoDietPlans = [
  {
    id: "diet-1",
    name: "Weight Loss Plan",
    goal: "Weight Loss",
    duration: "30 Days",
    calories: 1800,
    meals: 5,
    members: 8,
    status: "Active",
    description:
      "Balanced calorie-controlled diet for healthy weight loss.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "diet-2",
    name: "Muscle Gain Plan",
    goal: "Muscle Gain",
    duration: "60 Days",
    calories: 2800,
    meals: 6,
    members: 12,
    status: "Active",
    description:
      "High protein diet designed for muscle growth and recovery.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "diet-3",
    name: "Lean Body Plan",
    goal: "Fat Loss",
    duration: "45 Days",
    calories: 2100,
    meals: 5,
    members: 6,
    status: "Active",
    description:
      "Clean diet plan focused on reducing body fat.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "diet-4",
    name: "Maintenance Plan",
    goal: "Maintenance",
    duration: "30 Days",
    calories: 2200,
    meals: 5,
    members: 10,
    status: "Active",
    description:
      "Balanced nutrition plan for maintaining current fitness.",
    createdAt: new Date().toISOString(),
  },
];


// =====================================================
// MAIN PAGE
// =====================================================

export default function DietPlansPage() {
  const [dietPlans, setDietPlans] = useState([]);

  const [search, setSearch] =
    useState("");

  const [goalFilter, setGoalFilter] =
    useState("All Goals");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [loading, setLoading] =
    useState(true);

  const [deleteId, setDeleteId] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 6;


  // ===================================================
  // LOAD DATA
  // ===================================================

  useEffect(() => {
    loadDietPlans();
  }, []);


  const loadDietPlans = () => {
    try {
      const stored =
        localStorage.getItem(
          "gym_diet_plans"
        );


      if (stored) {
        const parsed =
          JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setDietPlans(parsed);
        } else {
          localStorage.setItem(
            "gym_diet_plans",
            JSON.stringify(
              demoDietPlans
            )
          );

          setDietPlans(
            demoDietPlans
          );
        }
      } else {
        localStorage.setItem(
          "gym_diet_plans",
          JSON.stringify(
            demoDietPlans
          )
        );

        setDietPlans(
          demoDietPlans
        );
      }

    } catch (error) {
      console.error(
        "Diet plan loading error:",
        error
      );

      setDietPlans([]);
    } finally {
      setLoading(false);
    }
  };


  // ===================================================
  // FILTER
  // ===================================================

  const filteredPlans =
    useMemo(() => {
      return dietPlans.filter(
        (plan) => {

          const searchText =
            search
              .toLowerCase()
              .trim();


          const matchesSearch =
            !searchText ||
            plan.name
              ?.toLowerCase()
              .includes(searchText) ||
            plan.goal
              ?.toLowerCase()
              .includes(searchText);


          const matchesGoal =
            goalFilter ===
              "All Goals" ||
            plan.goal ===
              goalFilter;


          const matchesStatus =
            statusFilter ===
              "All Status" ||
            plan.status ===
              statusFilter;


          return (
            matchesSearch &&
            matchesGoal &&
            matchesStatus
          );
        }
      );
    }, [
      dietPlans,
      search,
      goalFilter,
      statusFilter,
    ]);


  // ===================================================
  // PAGINATION
  // ===================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredPlans.length /
          itemsPerPage
      )
    );


  const startIndex =
    (currentPage - 1) *
    itemsPerPage;


  const currentPlans =
    filteredPlans.slice(
      startIndex,
      startIndex +
        itemsPerPage
    );


  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete = (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this diet plan?"
      );


    if (!confirmed) {
      return;
    }


    try {
      const updated =
        dietPlans.filter(
          (plan) =>
            String(plan.id) !==
            String(id)
        );


      localStorage.setItem(
        "gym_diet_plans",
        JSON.stringify(updated)
      );


      setDietPlans(updated);

      setDeleteId(null);

    } catch (error) {
      console.error(
        "Delete diet plan error:",
        error
      );

      alert(
        "Unable to delete diet plan."
      );
    }
  };


  // ===================================================
  // REFRESH
  // ===================================================

  const handleRefresh = () => {
    setLoading(true);

    setTimeout(() => {
      loadDietPlans();
    }, 200);
  };


  // ===================================================
  // SEARCH RESET PAGE
  // ===================================================

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };


  // ===================================================
  // GOAL FILTER
  // ===================================================

  const handleGoalFilter = (
    value
  ) => {
    setGoalFilter(value);
    setCurrentPage(1);
  };


  // ===================================================
  // STATUS FILTER
  // ===================================================

  const handleStatusFilter = (
    value
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="flex items-center gap-3 text-sm text-slate-400">

          <FiRefreshCw className="animate-spin text-green-400" />

          Loading diet plans...

        </div>

      </div>
    );
  }


  // ===================================================
  // PAGE
  // ===================================================

  return (
    <div className="mx-auto max-w-7xl space-y-6">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          {/* BREADCRUMB */}

          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">

            <Link
              href="/dashboard"
              className="transition hover:text-green-400"
            >
              Dashboard
            </Link>

            <span>/</span>

            <span className="text-slate-400">
              Diet Plans
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">

            Diet Plans

          </h1>


          <p className="mt-1 text-sm text-slate-500">

            Manage nutrition plans for your gym members.

          </p>

        </div>


        <div className="flex gap-2">


          {/* REFRESH */}

          <button
            type="button"
            onClick={
              handleRefresh
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          >

            <FiRefreshCw />

            <span className="hidden sm:inline">
              Refresh
            </span>

          </button>


          {/* ADD */}

          <Link
            href="/dashboard/diet/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
          >

            <FiPlus />

            Create Diet Plan

          </Link>

        </div>

      </div>


      {/* =================================================
          STATS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">


        <StatCard
          icon={<FiCoffee />}
          label="Total Plans"
          value={
            dietPlans.length
          }
          type="green"
        />


        <StatCard
          icon={<FiTarget />}
          label="Active Plans"
          value={
            dietPlans.filter(
              (plan) =>
                plan.status ===
                "Active"
            ).length
          }
        />


        <StatCard
          icon={<FiUsers />}
          label="Assigned Members"
          value={
            dietPlans.reduce(
              (
                total,
                plan
              ) =>
                total +
                Number(
                  plan.members ||
                    0
                ),
              0
            )
          }
          type="yellow"
        />


        <StatCard
          icon={<FiCalendar />}
          label="Avg. Duration"
          value={
            getAverageDuration(
              dietPlans
            )
          }
        />

      </div>


      {/* =================================================
          FILTER BAR
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821] p-4">

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_190px_190px]">


          {/* SEARCH */}

          <div className="relative">

            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearch(
                  e.target.value
                )
              }
              placeholder="Search diet plan..."
              className="w-full rounded-xl border border-white/10 bg-[#0B0F14] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-green-500/40"
            />

          </div>


          {/* GOAL */}

          <div className="relative">

            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />

            <select
              value={
                goalFilter
              }
              onChange={(e) =>
                handleGoalFilter(
                  e.target.value
                )
              }
              className="w-full appearance-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 pl-11 text-sm text-slate-300 outline-none focus:border-green-500/40"
            >

              <option>
                All Goals
              </option>

              <option>
                Weight Loss
              </option>

              <option>
                Muscle Gain
              </option>

              <option>
                Fat Loss
              </option>

              <option>
                Maintenance
              </option>

              <option>
                General Fitness
              </option>

            </select>

          </div>


          {/* STATUS */}

          <select
            value={
              statusFilter
            }
            onChange={(e) =>
              handleStatusFilter(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-slate-300 outline-none focus:border-green-500/40"
          >

            <option>
              All Status
            </option>

            <option>
              Active
            </option>

            <option>
              Inactive
            </option>

          </select>

        </div>

      </section>


      {/* =================================================
          PLAN CARDS
      ================================================= */}

      <section>

        {currentPlans.length ===
        0 ? (

          <EmptyState />

        ) : (

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {currentPlans.map(
              (plan) => (

                <DietPlanCard
                  key={
                    plan.id
                  }
                  plan={plan}
                  onDelete={
                    handleDelete
                  }
                />

              )
            )}

          </div>

        )}

      </section>


      {/* =================================================
          FOOTER / PAGINATION
      ================================================= */}

      <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-xs text-slate-600">

          Showing{" "}

          <span className="text-slate-400">

            {filteredPlans.length ===
            0
              ? 0
              : startIndex + 1}

          </span>

          {" "}to{" "}

          <span className="text-slate-400">

            {Math.min(
              startIndex +
                itemsPerPage,
              filteredPlans.length
            )}

          </span>

          {" "}of{" "}

          <span className="text-slate-400">

            {filteredPlans.length}

          </span>

          {" "}diet plans

        </p>


        <div className="flex items-center gap-2">


          <button
            type="button"
            disabled={
              currentPage ===
              1
            }
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.max(
                    1,
                    page - 1
                  )
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >

            <FiChevronLeft />

          </button>


          <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-green-500 px-3 text-xs font-bold text-black">

            {currentPage}

          </div>


          <button
            type="button"
            disabled={
              currentPage >=
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.min(
                    totalPages,
                    page + 1
                  )
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >

            <FiChevronRight />

          </button>

        </div>

      </div>


    </div>
  );
}


// =====================================================
// DIET PLAN CARD
// =====================================================

function DietPlanCard({
  plan,
  onDelete,
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121821] transition hover:border-green-500/20">


      {/* TOP */}

      <div className="border-b border-white/5 p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

              <FiCoffee className="text-xl" />

            </div>


            <div className="min-w-0">

              <h3 className="truncate text-base font-bold text-white">

                {plan.name ||
                  "Unnamed Plan"}

              </h3>


              <p className="mt-1 text-xs text-slate-600">

                {plan.goal ||
                  "General Fitness"}

              </p>

            </div>

          </div>


          <StatusBadge
            status={
              plan.status ||
              "Active"
            }
          />

        </div>

      </div>


      {/* DETAILS */}

      <div className="grid grid-cols-2 gap-px border-b border-white/5 bg-white/5">

        <InfoBox
          label="Calories"
          value={`${plan.calories || 0} kcal`}
        />

        <InfoBox
          label="Meals"
          value={`${plan.meals || 0} meals`}
        />

        <InfoBox
          label="Duration"
          value={
            plan.duration ||
            "N/A"
          }
        />

        <InfoBox
          label="Members"
          value={
            plan.members || 0
          }
        />

      </div>


      {/* DESCRIPTION */}

      <div className="p-5">

        <p className="min-h-[42px] text-xs leading-5 text-slate-500">

          {plan.description ||
            "No description available for this diet plan."}

        </p>


        {/* ACTIONS */}

        <div className="mt-5 flex gap-2">


          <Link
            href={`/dashboard/diet/${plan.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-2.5 text-xs font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          >

            <FiEye />

            View

          </Link>


          <Link
            href={`/dashboard/diet/${plan.id}/edit`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
          >

            <FiEdit2 />

          </Link>


          <button
            type="button"
            onClick={() =>
              onDelete(
                plan.id
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/[0.03] text-red-400 transition hover:bg-red-500/10"
          >

            <FiTrash2 />

          </button>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// INFO BOX
// =====================================================

function InfoBox({
  label,
  value,
}) {
  return (
    <div className="bg-[#121821] p-4">

      <p className="text-[10px] uppercase tracking-wide text-slate-600">

        {label}

      </p>


      <p className="mt-1 text-sm font-semibold text-white">

        {value}

      </p>

    </div>
  );
}


// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon,
  label,
  value,
  type,
}) {
  const iconClass =
    type === "green"
      ? "bg-green-500/10 text-green-400"
      : type === "yellow"
        ? "bg-yellow-500/10 text-yellow-400"
        : "bg-white/[0.03] text-slate-500";


  return (
    <div className="rounded-2xl border border-white/10 bg-[#121821] p-4 sm:p-5">

      <div className="flex items-center justify-between gap-3">

        <div className="min-w-0">

          <p className="truncate text-xs text-slate-600">
            {label}
          </p>


          <p className="mt-2 text-xl font-bold text-white sm:text-2xl">

            {value}

          </p>

        </div>


        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >

          {icon}

        </div>

      </div>

    </div>
  );
}


// =====================================================
// STATUS BADGE
// =====================================================

function StatusBadge({
  status,
}) {
  const active =
    String(
      status || ""
    ).toLowerCase() ===
    "active";


  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        active
          ? "bg-green-500/10 text-green-400"
          : "bg-yellow-500/10 text-yellow-400"
      }`}
    >

      {status}

    </span>
  );
}


// =====================================================
// EMPTY STATE
// =====================================================

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-[#121821] px-6 py-16 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] text-2xl text-slate-600">

        <FiCoffee />

      </div>


      <h3 className="mt-4 text-base font-semibold text-white">

        No diet plans found

      </h3>


      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">

        Try changing your search or filters, or create a new diet plan.

      </p>


      <Link
        href="/dashboard/diet/create"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
      >

        <FiPlus />

        Create Diet Plan

      </Link>

    </div>
  );
}


// =====================================================
// AVERAGE DURATION
// =====================================================

function getAverageDuration(
  plans
) {
  if (!plans.length) {
    return "0 Days";
  }


  const total =
    plans.reduce(
      (sum, plan) => {

        const number =
          parseInt(
            plan.duration,
            10
          );


        return (
          sum +
          (Number.isNaN(
            number
          )
            ? 0
            : number)
        );

      },
      0
    );


  const average =
    Math.round(
      total / plans.length
    );


  return `${average} Days`;
}