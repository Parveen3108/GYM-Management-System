"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiSave,
  FiCoffee,
  FiTarget,
  FiCalendar,
  FiUsers,
  FiFileText,
  FiEdit2,
  FiAlertCircle,
} from "react-icons/fi";

export default function EditDietPlanPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    goal: "Weight Loss",
    duration: "30 Days",
    calories: "",
    meals: "5",
    members: "0",
    status: "Active",
    description: "",
    breakfast: "",
    midMorning: "",
    lunch: "",
    evening: "",
    dinner: "",
  });

  /* =====================================================
     LOAD EXISTING DIET PLAN
  ===================================================== */

  useEffect(() => {
    if (params?.id) {
      loadDietPlan();
    }
  }, [params?.id]);

  const loadDietPlan = () => {
    try {
      const storedData =
        localStorage.getItem("gym_diet_plans");

      if (!storedData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const dietPlans = JSON.parse(storedData);

      if (!Array.isArray(dietPlans)) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const selectedPlan = dietPlans.find(
        (plan) =>
          String(plan.id) === String(params.id)
      );

      if (!selectedPlan) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const meals =
        selectedPlan.mealsDetails || {};

      setFormData({
        name: selectedPlan.name || "",
        goal:
          selectedPlan.goal ||
          "Weight Loss",
        duration:
          selectedPlan.duration ||
          "30 Days",
        calories:
          selectedPlan.calories ?? "",
        meals:
          selectedPlan.meals ?? "5",
        members:
          selectedPlan.members ?? "0",
        status:
          selectedPlan.status ||
          "Active",
        description:
          selectedPlan.description ||
          "",
        breakfast:
          meals.breakfast || "",
        midMorning:
          meals.midMorning || "",
        lunch:
          meals.lunch || "",
        evening:
          meals.evening || "",
        dinner:
          meals.dinner || "",
      });

      setLoading(false);

    } catch (error) {
      console.error(
        "Load diet plan error:",
        error
      );

      setNotFound(true);
      setLoading(false);
    }
  };

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     UPDATE DIET PLAN
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert(
        "Please enter diet plan name."
      );
      return;
    }

    if (!formData.calories) {
      alert(
        "Please enter daily calories."
      );
      return;
    }

    setSaving(true);

    try {
      const storedData =
        localStorage.getItem(
          "gym_diet_plans"
        );

      if (!storedData) {
        alert(
          "Diet plan data not found."
        );
        setSaving(false);
        return;
      }

      const dietPlans =
        JSON.parse(storedData);

      if (!Array.isArray(dietPlans)) {
        alert(
          "Invalid diet plan data."
        );
        setSaving(false);
        return;
      }

      const planExists =
        dietPlans.some(
          (plan) =>
            String(plan.id) ===
            String(params.id)
        );

      if (!planExists) {
        alert(
          "Diet plan not found."
        );
        setSaving(false);
        return;
      }

      const updatedPlans =
        dietPlans.map((plan) => {

          if (
            String(plan.id) !==
            String(params.id)
          ) {
            return plan;
          }

          return {
            ...plan,

            name:
              formData.name.trim(),

            goal:
              formData.goal,

            duration:
              formData.duration,

            calories:
              Number(
                formData.calories
              ),

            meals:
              Number(
                formData.meals
              ),

            members:
              Number(
                formData.members
              ),

            status:
              formData.status,

            description:
              formData.description.trim(),

            mealsDetails: {
              breakfast:
                formData.breakfast.trim(),

              midMorning:
                formData.midMorning.trim(),

              lunch:
                formData.lunch.trim(),

              evening:
                formData.evening.trim(),

              dinner:
                formData.dinner.trim(),
            },

            updatedAt:
              new Date().toISOString(),
          };
        });

      /* ================================================
         SAVE UPDATED DATA
      ================================================ */

      localStorage.setItem(
        "gym_diet_plans",
        JSON.stringify(
          updatedPlans
        )
      );

      /* ================================================
         VERIFY SAVE
      ================================================ */

      const verifyData =
        localStorage.getItem(
          "gym_diet_plans"
        );

      if (!verifyData) {
        throw new Error(
          "Data could not be saved."
        );
      }

      const verifyPlans =
        JSON.parse(verifyData);

      const updatedPlan =
        verifyPlans.find(
          (plan) =>
            String(plan.id) ===
            String(params.id)
        );

      if (!updatedPlan) {
        throw new Error(
          "Updated plan could not be verified."
        );
      }

      console.log(
        "Diet plan updated:",
        updatedPlan
      );

      alert(
        "Diet plan updated successfully!"
      );

      router.push(
        `/dashboard/diet/${params.id}`
      );

    } catch (error) {
      console.error(
        "Update diet plan error:",
        error
      );

      alert(
        "Something went wrong while updating the diet plan."
      );

      setSaving(false);
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

  if (notFound) {
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

            The diet plan you are trying to edit does not exist.

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
     PAGE
  ===================================================== */

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div>

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
            Edit
          </span>

        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

              <FiEdit2 className="text-xl" />

            </div>

            <div>

              <h1 className="text-2xl font-bold text-white sm:text-3xl">

                Edit Diet Plan

              </h1>

              <p className="mt-1 text-sm text-slate-500">

                Update the details of your diet plan.

              </p>

            </div>

          </div>

          <div className="flex gap-2">

            <Link
              href={`/dashboard/diet/${params.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
            >

              <FiArrowLeft />

              Back

            </Link>

          </div>

        </div>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

              <FiCoffee />

            </div>

            <div>

              <h2 className="text-base font-semibold text-white">

                Basic Information

              </h2>

              <p className="text-xs text-slate-600">

                Update the basic details of this diet plan.

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* PLAN NAME */}

            <InputField
              label="Diet Plan Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Weight Loss Plan"
              required
            />

            {/* GOAL */}

            <SelectField
              label="Fitness Goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              options={[
                "Weight Loss",
                "Muscle Gain",
                "Fat Loss",
                "Maintenance",
                "General Fitness",
              ]}
            />

            {/* DURATION */}

            <SelectField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              options={[
                "7 Days",
                "15 Days",
                "30 Days",
                "45 Days",
                "60 Days",
                "90 Days",
              ]}
            />

            {/* CALORIES */}

            <InputField
              label="Daily Calories"
              name="calories"
              type="number"
              value={formData.calories}
              onChange={handleChange}
              placeholder="e.g. 2200"
              required
            />

            {/* MEALS */}

            <InputField
              label="Meals Per Day"
              name="meals"
              type="number"
              min="1"
              max="10"
              value={formData.meals}
              onChange={handleChange}
              placeholder="e.g. 5"
            />

            {/* MEMBERS */}

            <InputField
              label="Assigned Members"
              name="members"
              type="number"
              min="0"
              value={formData.members}
              onChange={handleChange}
              placeholder="e.g. 10"
            />

            {/* STATUS */}

            <SelectField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                "Active",
                "Inactive",
              ]}
            />

          </div>

        </section>

        {/* =================================================
            MEAL PLAN
        ================================================= */}

        <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

              <FiCalendar />

            </div>

            <div>

              <h2 className="text-base font-semibold text-white">

                Daily Meal Plan

              </h2>

              <p className="text-xs text-slate-600">

                Update recommended meals for this plan.

              </p>

            </div>

          </div>

          <div className="space-y-5">

            <MealInput
              label="Breakfast"
              name="breakfast"
              value={formData.breakfast}
              onChange={handleChange}
              placeholder="e.g. Oats, eggs, banana"
            />

            <MealInput
              label="Mid Morning"
              name="midMorning"
              value={formData.midMorning}
              onChange={handleChange}
              placeholder="e.g. Apple, almonds"
            />

            <MealInput
              label="Lunch"
              name="lunch"
              value={formData.lunch}
              onChange={handleChange}
              placeholder="e.g. Rice, chicken, salad"
            />

            <MealInput
              label="Evening Snack"
              name="evening"
              value={formData.evening}
              onChange={handleChange}
              placeholder="e.g. Protein shake, fruits"
            />

            <MealInput
              label="Dinner"
              name="dinner"
              value={formData.dinner}
              onChange={handleChange}
              placeholder="e.g. Roti, paneer, vegetables"
            />

          </div>

        </section>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

              <FiFileText />

            </div>

            <div>

              <h2 className="text-base font-semibold text-white">

                Description

              </h2>

              <p className="text-xs text-slate-600">

                Update additional instructions.

              </p>

            </div>

          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Write diet plan instructions..."
            className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-green-500/40"
          />

        </section>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">

          <Link
            href={`/dashboard/diet/${params.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          >

            Cancel

          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />

                Updating...
              </>
            ) : (
              <>
                <FiSave />

                Update Diet Plan
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}


/* =====================================================
   INPUT FIELD
===================================================== */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-slate-400">

        {label}

        {required && (
          <span className="ml-1 text-green-400">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className="w-full rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-green-500/40"
      />

    </div>
  );
}


/* =====================================================
   SELECT FIELD
===================================================== */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-slate-400">

        {label}

      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-green-500/40"
      >

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}

      </select>

    </div>
  );
}


/* =====================================================
   MEAL INPUT
===================================================== */

function MealInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-slate-400">

        {label}

      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-green-500/40"
      />

    </div>
  );
}