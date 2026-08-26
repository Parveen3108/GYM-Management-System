"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FiCalendar,
  FiCheck,
  FiX,
  FiClock,
  FiSearch,
  FiSave,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiRefreshCw,
} from "react-icons/fi";

export default function AttendancePage() {
  const [members, setMembers] = useState([]);

  const [attendance, setAttendance] = useState({});

  const [selectedDate, setSelectedDate] =
    useState(getToday());

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  /* =====================================================
     LOAD MEMBERS + ATTENDANCE
  ===================================================== */

  useEffect(() => {
    loadData();
  }, [selectedDate]);


  const loadData = () => {
    try {
      /* -----------------------------------------------
         MEMBERS
      ------------------------------------------------ */

      const memberData =
        localStorage.getItem(
          "gym_members"
        );

      let loadedMembers = [];

      if (memberData) {
        try {
          const parsed =
            JSON.parse(memberData);

          if (Array.isArray(parsed)) {
            loadedMembers = parsed;
          }
        } catch (error) {
          console.error(
            "Members JSON error:",
            error
          );
        }
      }

      setMembers(loadedMembers);


      /* -----------------------------------------------
         ATTENDANCE
      ------------------------------------------------ */

      const attendanceData =
        localStorage.getItem(
          "gym_attendance"
        );

      let allAttendance = {};

      if (attendanceData) {
        try {
          const parsed =
            JSON.parse(attendanceData);

          if (
            parsed &&
            typeof parsed === "object"
          ) {
            allAttendance = parsed;
          }
        } catch (error) {
          console.error(
            "Attendance JSON error:",
            error
          );
        }
      }


      /* -----------------------------------------------
         SELECTED DATE ATTENDANCE
      ------------------------------------------------ */

      const dateAttendance =
        allAttendance[selectedDate] || {};

      setAttendance(dateAttendance);

    } catch (error) {
      console.error(
        "Attendance load error:",
        error
      );
    }

    setLoading(false);
  };


  /* =====================================================
     MEMBER ID
     
     Different member list structures ko handle karega.
  ===================================================== */

  const getMemberId = (member) => {
    return String(
      member.id ??
      member._id ??
      member.memberId ??
      member.phone ??
      ""
    );
  };


  /* =====================================================
     MEMBER NAME
  ===================================================== */

  const getMemberName = (member) => {
    return (
      member.name ||
      member.fullName ||
      member.memberName ||
      "Unknown Member"
    );
  };


  /* =====================================================
     MEMBER PHONE
  ===================================================== */

  const getMemberPhone = (member) => {
    return (
      member.phone ||
      member.mobile ||
      member.contact ||
      "No phone"
    );
  };


  /* =====================================================
     FILTER MEMBERS
  ===================================================== */

  const filteredMembers = useMemo(() => {
    let result = [...members];


    /* SEARCH */

    if (search.trim()) {
      const searchText =
        search.toLowerCase();

      result = result.filter(
        (member) => {
          const name =
            getMemberName(member)
              .toLowerCase();

          const phone =
            getMemberPhone(member)
              .toLowerCase();

          return (
            name.includes(searchText) ||
            phone.includes(searchText)
          );
        }
      );
    }


    /* STATUS FILTER */

    if (filter !== "All") {
      result = result.filter(
        (member) => {
          const id =
            getMemberId(member);

          return (
            attendance[id] ===
            filter
          );
        }
      );
    }


    return result;

  }, [
    members,
    search,
    filter,
    attendance,
  ]);


  /* =====================================================
     MARK ATTENDANCE
  ===================================================== */

  const markAttendance = (
    memberId,
    status
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [memberId]: status,
    }));
  };


  /* =====================================================
     MARK ALL PRESENT
  ===================================================== */

  const markAllPresent = () => {
    const updated = {
      ...attendance,
    };

    members.forEach((member) => {
      const id =
        getMemberId(member);

      if (id) {
        updated[id] = "Present";
      }
    });

    setAttendance(updated);
  };


  /* =====================================================
     RESET TODAY
  ===================================================== */

  const resetAttendance = () => {
    if (members.length === 0) {
      return;
    }

    const confirmed =
      window.confirm(
        "Reset attendance for this date?"
      );

    if (!confirmed) {
      return;
    }

    setAttendance({});
  };


  /* =====================================================
     SAVE ATTENDANCE
  ===================================================== */

  const saveAttendance = () => {
    setSaving(true);

    try {
      const storedData =
        localStorage.getItem(
          "gym_attendance"
        );

      let allAttendance = {};

      if (storedData) {
        try {
          const parsed =
            JSON.parse(storedData);

          if (
            parsed &&
            typeof parsed === "object"
          ) {
            allAttendance = parsed;
          }
        } catch (error) {
          console.error(
            "Old attendance error:",
            error
          );
        }
      }


      /* -----------------------------------------------
         SAVE SELECTED DATE
      ------------------------------------------------ */

      allAttendance[selectedDate] = {
        ...attendance,
        updatedAt:
          new Date().toISOString(),
      };


      localStorage.setItem(
        "gym_attendance",
        JSON.stringify(
          allAttendance
        )
      );


      /* -----------------------------------------------
         VERIFY
      ------------------------------------------------ */

      const verify =
        localStorage.getItem(
          "gym_attendance"
        );

      if (!verify) {
        throw new Error(
          "Attendance was not saved."
        );
      }


      alert(
        "Attendance saved successfully!"
      );

    } catch (error) {
      console.error(
        "Save attendance error:",
        error
      );

      alert(
        error.message ||
          "Unable to save attendance."
      );

    } finally {
      setSaving(false);
    }
  };


  /* =====================================================
     COUNTS
  ===================================================== */

  const totalMembers =
    members.length;

  const presentCount =
    members.filter(
      (member) =>
        attendance[
          getMemberId(member)
        ] === "Present"
    ).length;

  const absentCount =
    members.filter(
      (member) =>
        attendance[
          getMemberId(member)
        ] === "Absent"
    ).length;

  const leaveCount =
    members.filter(
      (member) =>
        attendance[
          getMemberId(member)
        ] === "Leave"
    ).length;

  const notMarkedCount =
    Math.max(
      0,
      totalMembers -
        presentCount -
        absentCount -
        leaveCount
    );


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="flex items-center gap-3 text-sm text-slate-400">

          <FiRefreshCw className="animate-spin text-green-400" />

          Loading attendance...

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
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">

            <span>
              Dashboard
            </span>

            <span>/</span>

            <span className="text-slate-400">
              Attendance
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Attendance
          </h1>


          <p className="mt-1 text-sm text-slate-500">
            Manage daily member attendance.
          </p>

        </div>


        {/* DATE */}

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#121821] p-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400">

            <FiCalendar />

          </div>


          <div>

            <p className="text-[10px] uppercase tracking-wider text-slate-600">
              Attendance Date
            </p>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(
                  e.target.value
                )
              }
              className="bg-transparent text-sm font-semibold text-white outline-none"
            />

          </div>

        </div>

      </div>


      {/* =================================================
          STATS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">


        <AttendanceStat
          icon={<FiUsers />}
          label="Total Members"
          value={totalMembers}
        />


        <AttendanceStat
          icon={<FiUserCheck />}
          label="Present"
          value={presentCount}
          type="present"
        />


        <AttendanceStat
          icon={<FiUserX />}
          label="Absent"
          value={absentCount}
          type="absent"
        />


        <AttendanceStat
          icon={<FiClock />}
          label="Leave"
          value={leaveCount}
          type="leave"
        />


        <AttendanceStat
          icon={<FiCalendar />}
          label="Not Marked"
          value={notMarkedCount}
        />

      </div>


      {/* =================================================
          ACTION BAR
      ================================================= */}

      <div className="rounded-2xl border border-white/10 bg-[#121821] p-4">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">


          {/* SEARCH */}

          <div className="relative w-full xl:max-w-sm">

            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search member..."
              className="w-full rounded-xl border border-white/10 bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-green-500/40"
            />

          </div>


          {/* FILTERS */}

          <div className="flex flex-wrap gap-2">

            {[
              "All",
              "Present",
              "Absent",
              "Leave",
            ].map((item) => (

              <button
                key={item}
                type="button"
                onClick={() =>
                  setFilter(item)
                }
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  filter === item
                    ? "bg-green-500 text-black"
                    : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                }`}
              >
                {item}
              </button>

            ))}

          </div>


          {/* ACTIONS */}

          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={markAllPresent}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-xs font-semibold text-green-400 transition hover:bg-green-500/20"
            >

              <FiCheck />

              Mark All Present

            </button>


            <button
              type="button"
              onClick={resetAttendance}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-semibold text-slate-400 transition hover:text-white"
            >

              <FiRefreshCw />

              Reset

            </button>

          </div>

        </div>

      </div>


      {/* =================================================
          MEMBER TABLE
      ================================================= */}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#121821]">


        {/* HEADER */}

        <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div>

            <h2 className="text-sm font-semibold text-white">
              Daily Attendance
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              {formatDate(selectedDate)}
            </p>

          </div>


          <button
            type="button"
            onClick={saveAttendance}
            disabled={saving || members.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-xs font-bold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {saving ? (
              <>
                <FiRefreshCw className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FiSave />
                Save Attendance
              </>
            )}

          </button>

        </div>


        {/* NO MEMBERS */}

        {members.length === 0 ? (

          <div className="px-6 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] text-slate-600">

              <FiUsers className="text-2xl" />

            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              No Members Found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Add members first. Once members
              are available, they will appear
              here automatically.
            </p>

          </div>

        ) : filteredMembers.length === 0 ? (

          <div className="px-6 py-16 text-center">

            <FiSearch className="mx-auto text-3xl text-slate-600" />

            <p className="mt-4 text-sm text-slate-500">
              No members found.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px]">

              <thead>

                <tr className="border-b border-white/5 text-left">

                  <th className="px-5 py-4 text-xs font-semibold text-slate-600 sm:px-6">
                    Member
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">
                    Current Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold text-slate-600 sm:px-6">
                    Mark Attendance
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-white/5">

                {filteredMembers.map(
                  (member) => {

                    const memberId =
                      getMemberId(member);

                    const status =
                      attendance[
                        memberId
                      ] || "";


                    return (
                      <tr
                        key={memberId}
                        className="transition hover:bg-white/[0.015]"
                      >


                        {/* MEMBER */}

                        <td className="px-5 py-4 sm:px-6">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-sm font-bold text-green-400">

                              {getMemberName(
                                member
                              )
                                .split(" ")
                                .map(
                                  (word) =>
                                    word[0]
                                )
                                .join("")
                                .slice(
                                  0,
                                  2
                                )
                                .toUpperCase()}

                            </div>


                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-white">

                                {getMemberName(
                                  member
                                )}

                              </p>

                              <p className="mt-1 text-xs text-slate-600">

                                ID: {memberId}

                              </p>

                            </div>

                          </div>

                        </td>


                        {/* PHONE */}

                        <td className="px-5 py-4 text-sm text-slate-400">

                          {getMemberPhone(
                            member
                          )}

                        </td>


                        {/* STATUS */}

                        <td className="px-5 py-4">

                          <StatusBadge
                            status={
                              status ||
                              "Not Marked"
                            }
                          />

                        </td>


                        {/* BUTTONS */}

                        <td className="px-5 py-4 sm:px-6">

                          <div className="flex justify-end gap-2">


                            <AttendanceButton
                              label="Present"
                              active={
                                status ===
                                "Present"
                              }
                              onClick={() =>
                                markAttendance(
                                  memberId,
                                  "Present"
                                )
                              }
                              type="present"
                            />


                            <AttendanceButton
                              label="Absent"
                              active={
                                status ===
                                "Absent"
                              }
                              onClick={() =>
                                markAttendance(
                                  memberId,
                                  "Absent"
                                )
                              }
                              type="absent"
                            />


                            <AttendanceButton
                              label="Leave"
                              active={
                                status ===
                                "Leave"
                              }
                              onClick={() =>
                                markAttendance(
                                  memberId,
                                  "Leave"
                                )
                              }
                              type="leave"
                            />

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>
  );
}


/* =====================================================
   ATTENDANCE STAT
===================================================== */

function AttendanceStat({
  icon,
  label,
  value,
  type,
}) {
  let iconClass =
    "bg-white/[0.03] text-slate-500";

  if (type === "present") {
    iconClass =
      "bg-green-500/10 text-green-400";
  }

  if (type === "absent") {
    iconClass =
      "bg-red-500/10 text-red-400";
  }

  if (type === "leave") {
    iconClass =
      "bg-yellow-500/10 text-yellow-400";
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121821] p-4 sm:p-5">

      <div className="flex items-center justify-between gap-3">

        <div>

          <p className="text-xs text-slate-600">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
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
   ATTENDANCE BUTTON
===================================================== */

function AttendanceButton({
  label,
  active,
  onClick,
  type,
}) {
  let className =
    "border-white/10 bg-white/[0.03] text-slate-500 hover:text-white";

  if (type === "present") {
    className = active
      ? "border-green-500/30 bg-green-500 text-black"
      : "border-green-500/10 bg-green-500/5 text-green-400 hover:bg-green-500/10";
  }

  if (type === "absent") {
    className = active
      ? "border-red-500/30 bg-red-500 text-white"
      : "border-red-500/10 bg-red-500/5 text-red-400 hover:bg-red-500/10";
  }

  if (type === "leave") {
    className = active
      ? "border-yellow-500/30 bg-yellow-500 text-black"
      : "border-yellow-500/10 bg-yellow-500/5 text-yellow-400 hover:bg-yellow-500/10";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${className}`}
    >
      {label}
    </button>
  );
}


/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({
  status,
}) {
  if (status === "Present") {
    return (
      <span className="inline-flex rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">
        Present
      </span>
    );
  }

  if (status === "Absent") {
    return (
      <span className="inline-flex rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">
        Absent
      </span>
    );
  }

  if (status === "Leave") {
    return (
      <span className="inline-flex rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
        Leave
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-500">
      Not Marked
    </span>
  );
}


/* =====================================================
   TODAY
===================================================== */

function getToday() {
  const date = new Date();

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const date =
    new Date(
      `${dateString}T00:00:00`
    );

  return date.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}