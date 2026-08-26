"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiAward,
  FiCreditCard,
  FiClock,
  FiUsers,
  FiActivity,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function TrainerDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const trainerId = params?.id;

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

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
          String(item.id) ===
          String(trainerId)
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
     DELETE
  ===================================================== */

  const handleDelete = () => {
    if (!trainer) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${trainer.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const storedData =
        localStorage.getItem(
          "gym_trainers"
        );

      if (!storedData) {
        return;
      }

      const trainers =
        JSON.parse(storedData);

      const updatedTrainers =
        trainers.filter(
          (item) =>
            String(item.id) !==
            String(trainerId)
        );

      localStorage.setItem(
        "gym_trainers",
        JSON.stringify(
          updatedTrainers
        )
      );

      alert(
        "Trainer deleted successfully!"
      );

      router.push(
        "/dashboard/trainers"
      );

    } catch (error) {
      console.error(
        "Delete trainer error:",
        error
      );

      alert(
        "Unable to delete trainer."
      );
    }
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

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
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">

            <FiUser className="text-2xl" />

          </div>

          <h2 className="mt-4 text-xl font-semibold text-white">
            Trainer Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            This trainer could not be found.
          </p>

          <Link
            href="/dashboard/trainers"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black"
          >

            <FiArrowLeft />

            Back to Trainers

          </Link>

        </div>

      </div>
    );
  }


  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="mx-auto max-w-7xl space-y-6">


      {/* =================================================
          BREADCRUMB
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
              href="/dashboard/trainers"
              className="hover:text-green-400"
            >
              Trainers
            </Link>

            <span>/</span>

            <span className="text-slate-400">
              {trainer.name}
            </span>

          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Trainer Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View complete trainer information.
          </p>

        </div>


        <div className="flex flex-wrap gap-2">

          <Link
            href="/dashboard/trainers"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/[0.06]"
          >

            <FiArrowLeft />

            Back

          </Link>


          <Link
            href={`/dashboard/trainers/${trainer.id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-black hover:bg-green-400"
          >

            <FiEdit />

            Edit Trainer

          </Link>

        </div>

      </div>


      {/* =================================================
          PROFILE CARD
      ================================================= */}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#121821]">

        <div className="h-28 bg-gradient-to-r from-green-500/20 via-green-500/5 to-transparent" />


        <div className="-mt-12 px-5 pb-6 sm:px-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div className="flex items-end gap-4">

              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-[#121821] bg-green-500 text-2xl font-bold text-black">

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


              <div className="pb-1">

                <h2 className="text-2xl font-bold text-white">
                  {trainer.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {trainer.specialization ||
                    "Trainer"}
                </p>

              </div>

            </div>


            <StatusBadge
              status={trainer.status}
            />

          </div>

        </div>

      </section>


      {/* =================================================
          STATS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        <StatCard
          icon={<FiUsers />}
          label="Assigned Members"
          value={trainer.members || 0}
        />

        <StatCard
          icon={<FiBriefcase />}
          label="Experience"
          value={
            trainer.experience ||
            "N/A"
          }
        />

        <StatCard
          icon={<FiActivity />}
          label="Specialization"
          value={
            trainer.specialization ||
            "N/A"
          }
        />

        <StatCard
          icon={<FiCalendar />}
          label="Joined"
          value={
            trainer.joiningDate ||
            "N/A"
          }
        />

      </div>


      {/* =================================================
          INFORMATION GRID
      ================================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">


        {/* PERSONAL */}

        <InfoSection
          icon={<FiUser />}
          title="Personal Information"
        >

          <InfoRow
            icon={<FiUser />}
            label="Full Name"
            value={trainer.name}
          />

          <InfoRow
            icon={<FiPhone />}
            label="Phone"
            value={
              trainer.phone ||
              "Not provided"
            }
          />

          <InfoRow
            icon={<FiMail />}
            label="Email"
            value={
              trainer.email ||
              "Not provided"
            }
          />

          <InfoRow
            icon={<FiUser />}
            label="Gender"
            value={
              trainer.gender ||
              "Not provided"
            }
          />

          <InfoRow
            icon={<FiCalendar />}
            label="Date of Birth"
            value={
              trainer.dob ||
              "Not provided"
            }
          />

          <InfoRow
            icon={<FiMapPin />}
            label="Address"
            value={
              trainer.address ||
              "Not provided"
            }
          />

        </InfoSection>


        {/* PROFESSIONAL */}

        <InfoSection
          icon={<FiBriefcase />}
          title="Professional Information"
        >

          <InfoRow
            icon={<FiBriefcase />}
            label="Specialization"
            value={
              trainer.specialization ||
              "Not provided"
            }
          />

          <InfoRow
            icon={<FiAward />}
            label="Experience"
            value={
              trainer.experience ||
              "Not provided"
            }
          />

          <InfoRow
            icon={<FiAward />}
            label="Qualification"
            value={
              trainer.qualification ||
              "Not provided"
            }
          />

          <InfoRow
            icon={<FiCalendar />}
            label="Joining Date"
            value={
              trainer.joiningDate ||
              "Not provided"
            }
          />

          <InfoRow
            icon={<FiClock />}
            label="Work Shift"
            value={
              trainer.shift ||
              "Not provided"
            }
          />

          <InfoRow
            icon={<FiCheckCircle />}
            label="Status"
            value={
              trainer.status ||
              "Active"
            }
          />

        </InfoSection>


        {/* EMPLOYMENT */}

        <InfoSection
          icon={<FiCreditCard />}
          title="Employment Information"
        >

          <InfoRow
            icon={<FiCreditCard />}
            label="Monthly Salary"
            value={
              trainer.salary
                ? `₹${Number(
                    trainer.salary
                  ).toLocaleString("en-IN")}`
                : "Not provided"
            }
          />

          <InfoRow
            icon={<FiClock />}
            label="Shift"
            value={
              trainer.shift ||
              "Not provided"
            }
          />

          <InfoRow
            icon={<FiCheckCircle />}
            label="Employment Status"
            value={
              trainer.status ||
              "Active"
            }
          />

        </InfoSection>


        {/* ABOUT */}

        <InfoSection
          icon={<FiAward />}
          title="About Trainer"
        >

          <div className="rounded-xl border border-white/10 bg-[#0B0F14] p-4">

            <p className="text-sm leading-7 text-slate-400">

              {trainer.bio ||
                "No description has been added for this trainer yet."}

            </p>

          </div>

        </InfoSection>

      </div>


      {/* =================================================
          DANGER ZONE
      ================================================= */}

      <section className="rounded-2xl border border-red-500/10 bg-[#121821]">

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

          <div>

            <h3 className="font-semibold text-white">
              Delete Trainer
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Remove this trainer permanently from your gym.
            </p>

          </div>


          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
          >

            <FiTrash2 />

            Delete Trainer

          </button>

        </div>

      </section>

    </div>
  );
}


/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({ status }) {

  const active =
    status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
        active
          ? "bg-green-500/10 text-green-400"
          : "bg-red-500/10 text-red-400"
      }`}
    >

      {active ? (
        <FiCheckCircle />
      ) : (
        <FiXCircle />
      )}

      {status || "Unknown"}

    </span>
  );
}


/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121821] p-5">

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-xs text-slate-500">
            {label}
          </p>

          <p className="mt-2 line-clamp-2 text-lg font-bold text-white">
            {value}
          </p>

        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
          {icon}
        </div>

      </div>

    </div>
  );
}


/* =====================================================
   INFO SECTION
===================================================== */

function InfoSection({
  icon,
  title,
  children,
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#121821]">

      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
          {icon}
        </div>

        <h2 className="text-sm font-semibold text-white">
          {title}
        </h2>

      </div>

      <div className="divide-y divide-white/5 px-5 sm:px-6">

        {children}

      </div>

    </section>
  );
}


/* =====================================================
   INFO ROW
===================================================== */

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-4 py-4">

      <div className="mt-0.5 text-slate-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs text-slate-600">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-300">
          {value}
        </p>

      </div>

    </div>
  );
}