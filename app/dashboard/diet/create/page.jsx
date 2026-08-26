"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiSave,
  FiCoffee,
  FiTarget,
  FiCalendar,
  FiUsers,
  FiFileText,
  FiCheck,
} from "react-icons/fi";

export default function CreateDietPlanPage() {
  const router = useRouter();

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

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter diet plan name.");
      return;
    }

    if (!formData.calories) {
      alert("Please enter daily calories.");
      return;
    }

    setSaving(true);

    try {
      const existingData =
        localStorage.getItem("gym_diet_plans");

      let dietPlans = [];

      if (existingData) {
        try {
          const parsed = JSON.parse(existingData);

          if (Array.isArray(parsed)) {
            dietPlans = parsed;
          }
        } catch {
          dietPlans = [];
        }
      }

      const newDietPlan = {
        id: `diet-${Date.now()}`,

        name: formData.name.trim(),

        goal: formData.goal,

        duration: formData.duration,

        calories: Number(formData.calories),

        meals: Number(formData.meals),

        members: Number(formData.members),

        status: formData.status,

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

        createdAt:
          new Date().toISOString(),
      };

      const updatedPlans = [
        newDietPlan,
        ...dietPlans,
      ];

      localStorage.setItem(
        "gym_diet_plans",
        JSON.stringify(updatedPlans)
      );

      alert("Diet plan created successfully!");

      router.push("/dashboard/diet");

    } catch (error) {
      console.error(
        "Create diet plan error:",
        error
      );

      alert(
        "Something went wrong while saving the diet plan."
      );

      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* HEADER */}

      <div>

        <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">

          <Link
            href="/dashboard"
            className="hover:text-green-400"
          >
            Dashboard
          </Link>

          <span>/</span>

          <Link
            href="/dashboard/diet"
            className="hover:text-green-400"
          >
            Diet Plans
          </Link>

          <span>/</span>

          <span className="text-slate-400">
            Create
          </span>

        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Create Diet Plan
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create a nutrition plan for your gym members.
            </p>

          </div>

          <Link
            href="/dashboard/diet"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            <FiArrowLeft />

            Back to Plans
          </Link>

        </div>

      </div>


      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* BASIC INFORMATION */}

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
                Enter the basic details of your diet plan.
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
              icon={<FiTarget />}
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
              icon={<FiCalendar />}
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


        {/* MEAL PLAN */}

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
                Add recommended meals for the member.
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


        {/* DESCRIPTION */}

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
                Add additional instructions for this plan.
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


        {/* ACTIONS */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <Link
            href="/dashboard/diet"
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

                Saving...
              </>
            ) : (
              <>
                <FiSave />

                Create Diet Plan
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}


// =====================================================
// INPUT FIELD
// =====================================================

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


// =====================================================
// SELECT FIELD
// =====================================================

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  icon,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
            {icon}
          </span>
        )}

        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-xl border border-white/10 bg-[#0B0F14] py-3 pr-4 text-sm text-slate-300 outline-none focus:border-green-500/40 ${
            icon
              ? "pl-11"
              : "px-4"
          }`}
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

    </div>
  );
}


// =====================================================
// MEAL INPUT
// =====================================================

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