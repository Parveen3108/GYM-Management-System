"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiTrash2,
  FiUser,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

export default function DeleteTrainerPage() {
  const params = useParams();
  const router = useRouter();

  const trainerId = params?.id;

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  /* =====================================================
     LOAD TRAINER
  ===================================================== */

  useEffect(() => {
    if (!trainerId) return;

    try {
      const storedData =
        localStorage.getItem("gym_trainers");

      if (!storedData) {
        setLoading(false);
        return;
      }

      const trainers = JSON.parse(storedData);

      if (!Array.isArray(trainers)) {
        setLoading(false);
        return;
      }

      const foundTrainer = trainers.find(
        (item) =>
          String(item.id) === String(trainerId)
      );

      setTrainer(foundTrainer || null);
    } catch (error) {
      console.error(
        "Error loading trainer:",
        error
      );

      setTrainer(null);
    }

    setLoading(false);
  }, [trainerId]);


  /* =====================================================
     DELETE TRAINER
  ===================================================== */

  const handleDelete = () => {
    if (!trainer) return;

    setDeleting(true);

    try {
      const storedData =
        localStorage.getItem("gym_trainers");

      if (!storedData) {
        throw new Error(
          "Trainer data not found."
        );
      }

      const trainers = JSON.parse(storedData);

      if (!Array.isArray(trainers)) {
        throw new Error(
          "Invalid trainer data."
        );
      }

      /* Remove selected trainer only */

      const updatedTrainers =
        trainers.filter(
          (item) =>
            String(item.id) !==
            String(trainerId)
        );

      /* Save updated array */

      localStorage.setItem(
        "gym_trainers",
        JSON.stringify(updatedTrainers)
      );

      /* Verify */

      const verifyData =
        localStorage.getItem(
          "gym_trainers"
        );

      const verifyTrainers =
        JSON.parse(verifyData);

      const stillExists =
        verifyTrainers.some(
          (item) =>
            String(item.id) ===
            String(trainerId)
        );

      if (stillExists) {
        throw new Error(
          "Trainer was not deleted."
        );
      }

      alert(
        "Trainer deleted successfully!"
      );

      router.push(
        "/dashboard/trainers"
      );

    } catch (error) {
      console.error(
        "DELETE TRAINER ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to delete trainer."
      );

      setDeleting(false);
    }
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="flex min-h-[450px] items-center justify-center">

        <div className="text-sm text-slate-400">
          Loading trainer...
        </div>

      </div>
    );
  }


  /* =====================================================
     NOT FOUND
  ===================================================== */

  if (!trainer) {
    return (
      <div className="flex min-h-[450px] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">

            <FiUser className="text-2xl" />

          </div>

          <h1 className="mt-5 text-xl font-bold text-white">
            Trainer Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This trainer could not be found in Local Storage.
          </p>

          <Link
            href="/dashboard/trainers"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
          >
            <FiArrowLeft />
            Back to Trainers
          </Link>

        </div>

      </div>
    );
  }


  /* =====================================================
     DELETE PAGE
  ===================================================== */

  return (
    <div className="mx-auto max-w-3xl space-y-6">

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
            href="/dashboard/trainers"
            className="transition hover:text-green-400"
          >
            Trainers
          </Link>

          <span>/</span>

          <span className="text-slate-400">
            Delete Trainer
          </span>

        </div>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Delete Trainer
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review the trainer before permanently deleting.
        </p>

      </div>


      {/* =================================================
          WARNING
      ================================================= */}

      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5 sm:p-6">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">

            <FiAlertTriangle className="text-xl" />

          </div>

          <div>

            <h2 className="font-semibold text-red-400">
              This action cannot be undone
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Deleting this trainer will permanently
              remove their information from your
              gym management system.
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          TRAINER CARD
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <div className="border-b border-white/10 px-5 py-4 sm:px-6">

          <h2 className="text-sm font-semibold text-white">
            Trainer Information
          </h2>

        </div>


        <div className="p-5 sm:p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* AVATAR */}

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-500 text-xl font-bold text-black">

              {trainer.avatar ||
                trainer.name
                  ?.split(" ")
                  .map(
                    (word) =>
                      word[0]
                  )
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}

            </div>


            {/* NAME */}

            <div className="min-w-0">

              <h3 className="text-xl font-bold text-white">
                {trainer.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {trainer.specialization ||
                  "Trainer"}
              </p>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  trainer.status === "Active"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {trainer.status || "Unknown"}
              </span>

            </div>

          </div>


          {/* DETAILS */}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <DetailItem
              icon={<FiPhone />}
              label="Phone"
              value={
                trainer.phone ||
                "Not provided"
              }
            />

            <DetailItem
              icon={<FiBriefcase />}
              label="Experience"
              value={
                trainer.experience ||
                "Not provided"
              }
            />

            <DetailItem
              icon={<FiCalendar />}
              label="Joining Date"
              value={
                trainer.joiningDate ||
                "Not provided"
              }
            />

            <DetailItem
              icon={<FiUser />}
              label="Assigned Members"
              value={
                trainer.members || 0
              }
            />

          </div>

        </div>

      </section>


      {/* =================================================
          CONFIRMATION
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <div className="p-5 sm:p-6">

          <p className="text-sm leading-6 text-slate-400">

            Are you sure you want to permanently
            delete{" "}

            <span className="font-semibold text-white">
              {trainer.name}
            </span>

            ?

          </p>


          {/* BUTTONS */}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href={`/dashboard/trainers/${trainer.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
            >

              <FiX />

              Cancel

            </Link>


            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {deleting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Deleting...
                </>
              ) : (
                <>
                  <FiTrash2 />

                  Yes, Delete Trainer
                </>
              )}

            </button>

          </div>

        </div>

      </section>


    </div>
  );
}


/* =====================================================
   DETAIL ITEM
===================================================== */

function DetailItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0B0F14] p-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-500">

        {icon}

      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-600">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-slate-300">
          {value}
        </p>

      </div>

    </div>
  );
}