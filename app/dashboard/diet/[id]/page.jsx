"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  FiArrowLeft,
  FiEdit2,
  FiCoffee,
  FiTarget,
  FiCalendar,
  FiUsers,
  FiClock,
  FiActivity,
  FiCheckCircle,
  FiFileText,
  FiSun,
  FiMoon,
  FiAlertCircle,
} from "react-icons/fi";

export default function ViewDietPlanPage() {
  const params = useParams();

  const [dietPlan, setDietPlan] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [notFound, setNotFound] =
    useState(false);


  /* =====================================================
     LOAD DIET PLAN
  ===================================================== */

  useEffect(() => {
    loadDietPlan();
  }, [params.id]);


  const loadDietPlan = () => {
    try {
      const storedData =
        localStorage.getItem(
          "gym_diet_plans"
        );


      if (!storedData) {
        setNotFound(true);
        setLoading(false);
        return;
      }


      const dietPlans =
        JSON.parse(storedData);


      if (!Array.isArray(dietPlans)) {
        setNotFound(true);
        setLoading(false);
        return;
      }


      const selectedPlan =
        dietPlans.find(
          (plan) =>
            String(plan.id) ===
            String(params.id)
        );


      if (!selectedPlan) {
        setNotFound(true);
      } else {
        setDietPlan(
          selectedPlan
        );
      }

    } catch (error) {
      console.error(
        "View diet plan error:",
        error
      );

      setNotFound(true);

    } finally {
      setLoading(false);
    }
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="flex items-center gap-3 text-sm text-slate-400">

          <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-500/30 border-t-green-400" />

          Loading diet plan...

        </div>

      </div>
    );
  }


  /* =====================================================
     NOT FOUND
  ===================================================== */

  if (notFound || !dietPlan) {
    return (
      <div className="mx-auto max-w-xl py-16">

        <div className="rounded-2xl border border-white/10 bg-[#121821] p-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl text-red-400">

            <FiAlertCircle />

          </div>


          <h1 className="mt-5 text-xl font-bold text-white">

            Diet Plan Not Found

          </h1>


          <p className="mt-2 text-sm text-slate-500">

            The diet plan you are looking for does not exist or has been deleted.

          </p>


          <Link
            href="/dashboard/diet"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
          >

            <FiArrowLeft />

            Back to Diet Plans

          </Link>

        </div>

      </div>
    );
  }


  /* =====================================================
     MEALS
  ===================================================== */

  const meals =
    dietPlan.mealsDetails ||
    {};


  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="mx-auto max-w-6xl space-y-6">


      {/* =================================================
          HEADER
      ================================================= */}

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

          <Link
            href="/dashboard/diet"
            className="transition hover:text-green-400"
          >
            Diet Plans
          </Link>

          <span>/</span>

          <span className="text-slate-400">
            View
          </span>

        </div>


        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">

              <FiCoffee className="text-2xl" />

            </div>


            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-2xl font-bold text-white sm:text-3xl">

                  {dietPlan.name ||
                    "Diet Plan"}

                </h1>


                <StatusBadge
                  status={
                    dietPlan.status ||
                    "Active"
                  }
                />

              </div>


              <p className="mt-1 text-sm text-slate-500">

                {dietPlan.goal ||
                  "General Fitness"}

              </p>

            </div>

          </div>


          <div className="flex gap-2">


            <Link
              href="/dashboard/diet"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
            >

              <FiArrowLeft />

              Back

            </Link>


            <Link
              href={`/dashboard/diet/${dietPlan.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
            >

              <FiEdit2 />

              Edit Plan

            </Link>

          </div>

        </div>

      </div>


      {/* =================================================
          OVERVIEW CARDS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">


        <OverviewCard
          icon={<FiTarget />}
          label="Fitness Goal"
          value={
            dietPlan.goal ||
            "General Fitness"
          }
          type="green"
        />


        <OverviewCard
          icon={<FiActivity />}
          label="Daily Calories"
          value={`${dietPlan.calories || 0} kcal`}
        />


        <OverviewCard
          icon={<FiCalendar />}
          label="Duration"
          value={
            dietPlan.duration ||
            "N/A"
          }
          type="yellow"
        />


        <OverviewCard
          icon={<FiUsers />}
          label="Assigned Members"
          value={
            dietPlan.members ||
            0
          }
        />

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">


        {/* =================================================
            MEAL PLAN
        ================================================= */}

        <section className="rounded-2xl border border-white/10 bg-[#121821] lg:col-span-2">

          <div className="border-b border-white/10 p-5 sm:p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

                <FiCoffee />

              </div>


              <div>

                <h2 className="text-base font-semibold text-white">

                  Daily Meal Plan

                </h2>


                <p className="mt-1 text-xs text-slate-600">

                  Recommended daily nutrition schedule.

                </p>

              </div>

            </div>

          </div>


          <div className="divide-y divide-white/5">


            <MealRow
              icon={<FiSun />}
              title="Breakfast"
              value={
                meals.breakfast
              }
            />


            <MealRow
              icon={<FiCoffee />}
              title="Mid Morning"
              value={
                meals.midMorning
              }
            />


            <MealRow
              icon={<FiSun />}
              title="Lunch"
              value={
                meals.lunch
              }
            />


            <MealRow
              icon={<FiCoffee />}
              title="Evening Snack"
              value={
                meals.evening
              }
            />


            <MealRow
              icon={<FiMoon />}
              title="Dinner"
              value={
                meals.dinner
              }
            />

          </div>

        </section>


        {/* =================================================
            PLAN SUMMARY
        ================================================= */}

        <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

              <FiCheckCircle />

            </div>


            <div>

              <h2 className="text-base font-semibold text-white">

                Plan Summary

              </h2>


              <p className="text-xs text-slate-600">

                Important details

              </p>

            </div>

          </div>


          <div className="mt-6 space-y-5">


            <SummaryRow
              label="Plan Name"
              value={
                dietPlan.name ||
                "N/A"
              }
            />


            <SummaryRow
              label="Goal"
              value={
                dietPlan.goal ||
                "N/A"
              }
            />


            <SummaryRow
              label="Duration"
              value={
                dietPlan.duration ||
                "N/A"
              }
            />


            <SummaryRow
              label="Daily Calories"
              value={`${dietPlan.calories || 0} kcal`}
            />


            <SummaryRow
              label="Meals Per Day"
              value={
                dietPlan.meals ||
                0
              }
            />


            <SummaryRow
              label="Assigned Members"
              value={
                dietPlan.members ||
                0
              }
            />


            <SummaryRow
              label="Status"
              value={
                dietPlan.status ||
                "Active"
              }
            />

          </div>

        </section>

      </div>


      {/* =================================================
          DESCRIPTION
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

            <FiFileText />

          </div>


          <div>

            <h2 className="text-base font-semibold text-white">

              Diet Plan Instructions

            </h2>


            <p className="text-xs text-slate-600">

              Additional information about this plan.

            </p>

          </div>

        </div>


        <div className="mt-5 rounded-xl border border-white/5 bg-[#0B0F14] p-5">

          <p className="whitespace-pre-line text-sm leading-7 text-slate-400">

            {dietPlan.description ||
              "No additional instructions have been added for this diet plan."}

          </p>

        </div>

      </section>


      {/* =================================================
          PLAN INFORMATION
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">


          <div>

            <p className="text-xs text-slate-600">
              Plan ID
            </p>

            <p className="mt-1 break-all text-sm font-medium text-white">
              {dietPlan.id}
            </p>

          </div>


          <div>

            <p className="text-xs text-slate-600">
              Created
            </p>

            <p className="mt-1 text-sm font-medium text-white">

              {formatDate(
                dietPlan.createdAt
              )}

            </p>

          </div>


          <div>

            <p className="text-xs text-slate-600">
              Status
            </p>

            <div className="mt-1">

              <StatusBadge
                status={
                  dietPlan.status ||
                  "Active"
                }
              />

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}


/* =====================================================
   OVERVIEW CARD
===================================================== */

function OverviewCard({
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


          <p className="mt-2 truncate text-base font-bold text-white sm:text-lg">

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


/* =====================================================
   MEAL ROW
===================================================== */

function MealRow({
  icon,
  title,
  value,
}) {
  return (
    <div className="flex gap-4 p-5 sm:p-6">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.03] text-green-400">

        {icon}

      </div>


      <div className="min-w-0 flex-1">

        <p className="text-sm font-semibold text-white">

          {title}

        </p>


        <p className="mt-1 text-sm leading-6 text-slate-500">

          {value ||
            "No meal information added."}

        </p>

      </div>

    </div>
  );
}


/* =====================================================
   SUMMARY ROW
===================================================== */

function SummaryRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">

      <span className="text-xs text-slate-600">

        {label}

      </span>


      <span className="text-right text-sm font-medium text-white">

        {value}

      </span>

    </div>
  );
}


/* =====================================================
   STATUS BADGE
===================================================== */

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
      className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold ${
        active
          ? "bg-green-500/10 text-green-400"
          : "bg-yellow-500/10 text-yellow-400"
      }`}
    >

      {status}

    </span>
  );
}


/* =====================================================
   DATE
===================================================== */

function formatDate(
  value
) {
  if (!value) {
    return "N/A";
  }


  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "N/A";
  }


  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}