/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
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
  FiUsers,
  FiAward,
} from "react-icons/fi";


/* =====================================================
   TRAINERS PAGE
   DATA SOURCE:
   localStorage -> gym_trainers
===================================================== */

export default function TrainersPage() {

  const [trainers, setTrainers] = useState([]);

  const [search, setSearch] = useState("");

  const [specializationFilter, setSpecializationFilter] =
    useState("All Specializations");

  const [statusFilter, setStatusFilter] =
    useState("All Status");


  /* =====================================================
     LOAD TRAINERS FROM LOCAL STORAGE
  ===================================================== */

  useEffect(() => {

    try {

      const savedTrainers =
        localStorage.getItem("gym_trainers");


      if (!savedTrainers) {

        setTrainers([]);

        return;
      }


      const parsedTrainers =
        JSON.parse(savedTrainers);


      if (Array.isArray(parsedTrainers)) {

        setTrainers(parsedTrainers);

      } else {

        setTrainers([]);

      }

    } catch (error) {

      console.error(
        "Error loading trainers:",
        error
      );

      setTrainers([]);

    }

  }, []);


  /* =====================================================
     FILTER TRAINERS
  ===================================================== */

  const filteredTrainers =
    trainers.filter((trainer) => {

      const searchValue =
        search.toLowerCase().trim();


      const trainerName =
        String(
          trainer.name || ""
        ).toLowerCase();


      const trainerPhone =
        String(
          trainer.phone || ""
        );


      const trainerSpecialization =
        String(
          trainer.specialization || ""
        ).toLowerCase();


      const matchesSearch =
        trainerName.includes(
          searchValue
        ) ||

        trainerPhone.includes(
          searchValue
        ) ||

        trainerSpecialization.includes(
          searchValue
        );


      const matchesSpecialization =
        specializationFilter ===
          "All Specializations" ||

        trainer.specialization ===
          specializationFilter;


      const matchesStatus =
        statusFilter ===
          "All Status" ||

        trainer.status ===
          statusFilter;


      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesStatus
      );

    });


  /* =====================================================
     ACTIVE TRAINERS
  ===================================================== */

  const activeTrainers =
    trainers.filter(
      (trainer) =>
        trainer.status === "Active"
    ).length;


  /* =====================================================
     TOTAL ASSIGNED MEMBERS
  ===================================================== */

  const totalAssignedMembers =
    trainers.reduce(
      (total, trainer) => {

        return (
          total +
          Number(
            trainer.members || 0
          )
        );

      },
      0
    );


  /* =====================================================
     EXPORT TRAINERS
  ===================================================== */

  const handleExport = () => {

    if (trainers.length === 0) {

      alert(
        "No trainers available to export."
      );

      return;
    }


    const headers = [
      "ID",
      "Name",
      "Phone",
      "Email",
      "Specialization",
      "Experience",
      "Members",
      "Joining Date",
      "Salary",
      "Shift",
      "Status",
    ];


    const rows =
      trainers.map((trainer) => [

        trainer.id ?? "",

        trainer.name ?? "",

        trainer.phone ?? "",

        trainer.email ?? "",

        trainer.specialization ?? "",

        trainer.experience ?? "",

        trainer.members ?? 0,

        trainer.joiningDate ?? "",

        trainer.salary ?? "",

        trainer.shift ?? "",

        trainer.status ?? "",

      ]);


    const csvContent = [

      headers,

      ...rows,

    ]

      .map((row) =>

        row
          .map(
            (value) =>
              `"${String(value).replaceAll(
                '"',
                '""'
              )}"`
          )
          .join(",")

      )

      .join("\n");


    const blob = new Blob(
      [csvContent],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href = url;

    link.download =
      "gym-trainers.csv";


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
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          {/* Breadcrumb */}

          <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">

            <Link
              href="/dashboard"
              className="transition hover:text-green-400"
            >
              Dashboard
            </Link>

            <span>/</span>

            <span className="text-slate-400">
              Trainers
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Trainers
          </h1>


          <p className="mt-1 text-sm text-slate-500">
            Manage your gym trainers and their assignments.
          </p>

        </div>


        {/* Add Trainer */}

        <Link
          href="/dashboard/trainers/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400"
        >

          <FiPlus className="text-lg" />

          Add Trainer

        </Link>

      </div>


      {/* =================================================
          STATS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">


        {/* Total Trainers */}

        <div className="rounded-2xl border border-white/10 bg-[#121821] p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Total Trainers
              </p>


              <p className="mt-2 text-2xl font-bold text-white">
                {trainers.length}
              </p>

            </div>


            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

              <FiUsers className="text-xl" />

            </div>

          </div>

        </div>


        {/* Active Trainers */}

        <div className="rounded-2xl border border-white/10 bg-[#121821] p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Active Trainers
              </p>


              <p className="mt-2 text-2xl font-bold text-white">
                {activeTrainers}
              </p>

            </div>


            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

              <FiAward className="text-xl" />

            </div>

          </div>

        </div>


        {/* Assigned Members */}

        <div className="rounded-2xl border border-white/10 bg-[#121821] p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Assigned Members
              </p>


              <p className="mt-2 text-2xl font-bold text-white">
                {totalAssignedMembers}
              </p>

            </div>


            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">

              <FiUsers className="text-xl" />

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          FILTER BOX
      ================================================= */}

      <div className="rounded-2xl border border-white/10 bg-[#121821] p-4">

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">


          {/* Search */}

          <div className="relative">

            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />


            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search trainer..."
              className="w-full rounded-xl border border-white/10 bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-green-500/40"
            />

          </div>


          {/* Specialization */}

          <select
            value={
              specializationFilter
            }
            onChange={(e) =>
              setSpecializationFilter(
                e.target.value
              )
            }
            className="rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-slate-300 outline-none focus:border-green-500/40"
          >

            <option>
              All Specializations
            </option>

            <option>
              Strength Training
            </option>

            <option>
              Cardio
            </option>

            <option>
              CrossFit
            </option>

            <option>
              Weight Loss
            </option>

            <option>
              Yoga
            </option>

            <option>
              Bodybuilding
            </option>

            <option>
              Personal Training
            </option>

          </select>


          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-slate-300 outline-none focus:border-green-500/40"
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
          TRAINERS TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121821]">


        {/* Table Heading */}

        <div className="border-b border-white/10 px-5 py-4">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-base font-semibold text-white">
                All Trainers
              </h2>


              <p className="mt-1 text-xs text-slate-500">
                {filteredTrainers.length} trainers found
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

          <table className="w-full min-w-[950px]">

            <thead>

              <tr className="border-b border-white/10 bg-white/[0.02]">


                <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Trainer
                </th>


                <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Specialization
                </th>


                <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Experience
                </th>


                <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Members
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

              {filteredTrainers.length > 0 ? (

                filteredTrainers.map(
                  (trainer) => (

                    <tr
                      key={trainer.id}
                      className="border-b border-white/5 transition hover:bg-white/[0.02]"
                    >


                      {/* Trainer */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">


                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-xs font-bold text-white">

                            {trainer.avatar ||
                              getInitials(
                                trainer.name
                              )}

                          </div>


                          <div>

                            <p className="text-sm font-semibold text-white">

                              {trainer.name ||
                                "Unnamed Trainer"}

                            </p>


                            <p className="mt-0.5 text-xs text-slate-600">

                              ID #{trainer.id}

                            </p>

                          </div>

                        </div>

                      </td>


                      {/* Specialization */}

                      <td className="px-5 py-4">

                        <span className="inline-flex rounded-md border border-green-500/10 bg-green-500/10 px-2.5 py-1 text-[11px] font-medium text-green-400">

                          {trainer.specialization ||
                            "Not specified"}

                        </span>

                      </td>


                      {/* Experience */}

                      <td className="px-5 py-4 text-sm text-slate-400">

                        {trainer.experience ||
                          "Not specified"}

                      </td>


                      {/* Members */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <FiUsers className="text-slate-600" />

                          <span className="text-sm text-slate-300">

                            {trainer.members ||
                              0}

                          </span>

                        </div>

                      </td>


                      {/* Join Date */}

                      <td className="px-5 py-4 text-sm text-slate-400">

                        {formatDate(
                          trainer.joiningDate
                        )}

                      </td>


                      {/* Status */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={
                            trainer.status ||
                            "Active"
                          }
                        />

                      </td>


                      {/* Actions */}

                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-2">


                          {/* View */}

                          <Link
                            href={`/dashboard/trainers/${trainer.id}`}
                            title="View Trainer"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                          >

                            <FiEye />

                          </Link>


                          {/* Edit */}

                          <Link
                            href={`/dashboard/trainers/${trainer.id}/edit`}
                            title="Edit Trainer"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-yellow-500/20 hover:bg-yellow-500/10 hover:text-yellow-400"
                          >

                            <FiEdit2 />

                          </Link>


                          {/* Delete */}

                          <Link
                            href={`/dashboard/trainers/${trainer.id}/delete`}
                            title="Delete Trainer"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5 text-red-400 transition hover:bg-red-500/10"
                          >

                            <FiTrash2 />

                          </Link>

                        </div>

                      </td>

                    </tr>

                  )

                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="px-5 py-16 text-center"
                  >

                    <FiUsers className="mx-auto text-3xl text-slate-600" />


                    <h3 className="mt-4 text-sm font-semibold text-white">
                      No trainers found
                    </h3>


                    <p className="mt-1 text-xs text-slate-600">
                      Add your first trainer to get started.
                    </p>


                    <Link
                      href="/dashboard/trainers/create"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-xs font-semibold text-black"
                    >

                      <FiPlus />

                      Add Trainer

                    </Link>

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

          {filteredTrainers.length > 0 ? (

            filteredTrainers.map(
              (trainer) => (

                <div
                  key={trainer.id}
                  className="p-4 transition hover:bg-white/[0.02]"
                >

                  <div className="flex items-start gap-3">


                    {/* Avatar */}

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-xs font-bold text-white">

                      {trainer.avatar ||
                        getInitials(
                          trainer.name
                        )}

                    </div>


                    <div className="min-w-0 flex-1">


                      <div className="flex items-start justify-between gap-2">


                        <div>

                          <h3 className="truncate text-sm font-semibold text-white">

                            {trainer.name ||
                              "Unnamed Trainer"}

                          </h3>


                          <p className="mt-1 text-xs text-slate-600">

                            #{trainer.id} ·{" "}

                            {trainer.phone ||
                              "No phone"}

                          </p>

                        </div>


                        <StatusBadge
                          status={
                            trainer.status ||
                            "Active"
                          }
                        />

                      </div>


                      <div className="mt-3 flex flex-wrap items-center gap-2">


                        <span className="rounded-md border border-green-500/10 bg-green-500/10 px-2.5 py-1 text-[11px] font-medium text-green-400">

                          {trainer.specialization ||
                            "Not specified"}

                        </span>


                        <span className="text-xs text-slate-600">

                          {trainer.experience ||
                            "No experience"}

                        </span>


                        <span className="text-xs text-slate-600">

                          {trainer.members ||
                            0} members

                        </span>

                      </div>


                      {/* Mobile Actions */}

                      <div className="mt-4 flex gap-2">


                        <Link
                          href={`/dashboard/trainers/${trainer.id}`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-2 text-xs text-slate-300"
                        >

                          <FiEye />

                          View

                        </Link>


                        <Link
                          href={`/dashboard/trainers/${trainer.id}/edit`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-2 text-xs text-slate-300"
                        >

                          <FiEdit2 />

                          Edit

                        </Link>


                        <Link
                          href={`/dashboard/trainers/${trainer.id}/delete`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5 text-red-400"
                        >

                          <FiTrash2 />

                        </Link>

                      </div>

                    </div>

                  </div>

                </div>

              )

            )

          ) : (

            <div className="px-5 py-16 text-center">


              <FiUsers className="mx-auto text-3xl text-slate-600" />


              <h3 className="mt-4 text-sm font-semibold text-white">
                No trainers found
              </h3>


              <p className="mt-1 text-xs text-slate-600">
                Add your first trainer to get started.
              </p>


              <Link
                href="/dashboard/trainers/create"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-xs font-semibold text-black"
              >

                <FiPlus />

                Add Trainer

              </Link>

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
              {filteredTrainers.length}
            </span>{" "}

            of{" "}

            <span className="text-slate-400">
              {trainers.length}
            </span>{" "}

            trainers

          </p>


          <div className="flex items-center gap-2">


            <button
              type="button"
              disabled
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-600"
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
   STATUS BADGE
===================================================== */

function StatusBadge({ status }) {

  const styles = {

    Active:
      "bg-green-500/10 text-green-400 border-green-500/10",

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


/* =====================================================
   GET INITIALS
===================================================== */

function getInitials(name) {

  if (!name) {

    return "TR";

  }


  return name
    .trim()
    .split(/\s+/)
    .map(
      (word) =>
        word.charAt(0)
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();

}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(date) {

  if (!date) {

    return "-";

  }


  const parsedDate =
    new Date(date);


  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {

    return date;

  }


  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

}