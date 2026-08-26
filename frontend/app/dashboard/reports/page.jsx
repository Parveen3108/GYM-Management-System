"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  FiUsers,
  FiUserCheck,
  FiCreditCard,
  FiPackage,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiDownload,
  FiRefreshCw,
  FiBarChart2,
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiBox,
} from "react-icons/fi";

export default function ReportsPage() {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [bills, setBills] = useState([]);
  const [supplements, setSupplements] = useState([]);

  const [loading, setLoading] = useState(true);

  const [reportType, setReportType] =
    useState("overview");


  /* =====================================================
     LOAD ALL DATA
  ===================================================== */

  useEffect(() => {
    loadReportData();
  }, []);


  const loadReportData = () => {
    try {
      const storedMembers =
        localStorage.getItem(
          "gym_members"
        );

      const storedTrainers =
        localStorage.getItem(
          "gym_trainers"
        );

      const storedAttendance =
        localStorage.getItem(
          "gym_attendance"
        );

      const storedBills =
        localStorage.getItem(
          "gym_bills"
        );

      const storedSupplements =
        localStorage.getItem(
          "gym_supplements"
        );


      setMembers(
        parseStorage(
          storedMembers
        )
      );

      setTrainers(
        parseStorage(
          storedTrainers
        )
      );

      setAttendance(
        parseStorage(
          storedAttendance
        )
      );

      setBills(
        parseStorage(
          storedBills
        )
      );

      setSupplements(
        parseStorage(
          storedSupplements
        )
      );

    } catch (error) {

      console.error(
        "Report loading error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  /* =====================================================
     MEMBER REPORT
  ===================================================== */

  const activeMembers =
    members.filter(
      (member) =>
        String(
          member.status || ""
        ).toLowerCase() ===
          "active" ||
        !member.status
    );


  const inactiveMembers =
    members.filter(
      (member) =>
        String(
          member.status || ""
        ).toLowerCase() ===
        "inactive"
    );


  /* =====================================================
     BILLING REPORT
  ===================================================== */

  const paidBills =
    bills.filter(
      (bill) =>
        String(
          bill.status || ""
        ).toLowerCase() ===
        "paid"
    );


  const pendingBills =
    bills.filter(
      (bill) =>
        String(
          bill.status || ""
        ).toLowerCase() ===
        "pending"
    );


  const totalRevenue =
    paidBills.reduce(
      (total, bill) =>
        total +
        Number(
          bill.amount || 0
        ),
      0
    );


  const pendingAmount =
    pendingBills.reduce(
      (total, bill) =>
        total +
        Number(
          bill.amount || 0
        ),
      0
    );


  const totalBilling =
    bills.reduce(
      (total, bill) =>
        total +
        Number(
          bill.amount || 0
        ),
      0
    );


  /* =====================================================
     SUPPLEMENT REPORT
  ===================================================== */

  const totalStock =
    supplements.reduce(
      (total, item) =>
        total +
        Number(
          item.stock || 0
        ),
      0
    );


  const inventoryValue =
    supplements.reduce(
      (total, item) =>
        total +
        Number(
          item.price || 0
        ) *
        Number(
          item.stock || 0
        ),
      0
    );


  const lowStockProducts =
    supplements.filter(
      (item) => {

        const stock =
          Number(
            item.stock || 0
          );

        return (
          stock > 0 &&
          stock <= 10
        );
      }
    );


  const outOfStockProducts =
    supplements.filter(
      (item) =>
        Number(
          item.stock || 0
        ) <= 0
    );


  /* =====================================================
     ATTENDANCE REPORT
  ===================================================== */

  const presentRecords =
    attendance.filter(
      (item) =>
        String(
          item.status || ""
        ).toLowerCase() ===
          "present" ||
        String(
          item.status || ""
        ).toLowerCase() ===
          "checked-in"
    );


  const absentRecords =
    attendance.filter(
      (item) =>
        String(
          item.status || ""
        ).toLowerCase() ===
        "absent"
    );


  /* =====================================================
     ATTENDANCE PERCENTAGE
  ===================================================== */

  const attendancePercentage =
    attendance.length > 0
      ? Math.round(
          (presentRecords.length /
            attendance.length) *
            100
        )
      : 0;


  /* =====================================================
     MONTHLY REVENUE
  ===================================================== */

  const monthlyRevenue =
    useMemo(() => {

      const months = [
        {
          key: "01",
          name: "Jan",
          value: 0,
        },
        {
          key: "02",
          name: "Feb",
          value: 0,
        },
        {
          key: "03",
          name: "Mar",
          value: 0,
        },
        {
          key: "04",
          name: "Apr",
          value: 0,
        },
        {
          key: "05",
          name: "May",
          value: 0,
        },
        {
          key: "06",
          name: "Jun",
          value: 0,
        },
        {
          key: "07",
          name: "Jul",
          value: 0,
        },
        {
          key: "08",
          name: "Aug",
          value: 0,
        },
        {
          key: "09",
          name: "Sep",
          value: 0,
        },
        {
          key: "10",
          name: "Oct",
          value: 0,
        },
        {
          key: "11",
          name: "Nov",
          value: 0,
        },
        {
          key: "12",
          name: "Dec",
          value: 0,
        },
      ];


      paidBills.forEach(
        (bill) => {

          const dateValue =
            bill.billingDate ||
            bill.date ||
            bill.createdAt;

          if (!dateValue) {
            return;
          }


          const date =
            new Date(
              dateValue
            );


          if (
            Number.isNaN(
              date.getTime()
            )
          ) {
            return;
          }


          const month =
            String(
              date.getMonth() + 1
            ).padStart(2, "0");


          const found =
            months.find(
              (item) =>
                item.key ===
                month
            );


          if (found) {

            found.value +=
              Number(
                bill.amount || 0
              );

          }

        }
      );


      return months;

    }, [paidBills]);


  const maxRevenue =
    Math.max(
      ...monthlyRevenue.map(
        (item) =>
          item.value
      ),
      1
    );


  /* =====================================================
     TOP SUPPLEMENTS
  ===================================================== */

  const topSupplements =
    useMemo(() => {

      return [
        ...supplements,
      ]
        .sort(
          (a, b) =>
            Number(
              b.stock || 0
            ) -
            Number(
              a.stock || 0
            )
        )
        .slice(0, 5);

    }, [supplements]);


  /* =====================================================
     REFRESH
  ===================================================== */

  const handleRefresh = () => {

    setLoading(true);

    setTimeout(() => {
      loadReportData();
    }, 200);

  };


  /* =====================================================
     PRINT REPORT
  ===================================================== */

  const handlePrint = () => {
    window.print();
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="flex items-center gap-3 text-sm text-slate-400">

          <FiRefreshCw className="animate-spin text-green-400" />

          Generating reports...

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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between print:hidden">

        <div>

          <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">

            <Link
              href="/dashboard"
              className="hover:text-green-400"
            >
              Dashboard
            </Link>

            <span>/</span>

            <span className="text-slate-400">
              Reports
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">

            Reports & Analytics

          </h1>


          <p className="mt-1 text-sm text-slate-500">

            Complete overview of your gym performance.

          </p>

        </div>


        <div className="flex flex-wrap gap-2">


          <button
            type="button"
            onClick={
              handleRefresh
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          >

            <FiRefreshCw />

            Refresh

          </button>


          <button
            type="button"
            onClick={
              handlePrint
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
          >

            <FiDownload />

            Print Report

          </button>

        </div>

      </div>


      {/* =================================================
          REPORT FILTER
      ================================================= */}

      <div className="rounded-2xl border border-white/10 bg-[#121821] p-4 print:hidden">

        <div className="flex flex-wrap gap-2">

          <ReportTab
            active={
              reportType ===
              "overview"
            }
            onClick={() =>
              setReportType(
                "overview"
              )
            }
          >
            Overview
          </ReportTab>


          <ReportTab
            active={
              reportType ===
              "members"
            }
            onClick={() =>
              setReportType(
                "members"
              )
            }
          >
            Members
          </ReportTab>


          <ReportTab
            active={
              reportType ===
              "attendance"
            }
            onClick={() =>
              setReportType(
                "attendance"
              )
            }
          >
            Attendance
          </ReportTab>


          <ReportTab
            active={
              reportType ===
              "billing"
            }
            onClick={() =>
              setReportType(
                "billing"
              )
            }
          >
            Billing
          </ReportTab>


          <ReportTab
            active={
              reportType ===
              "supplements"
            }
            onClick={() =>
              setReportType(
                "supplements"
              )
            }
          >
            Supplements
          </ReportTab>

        </div>

      </div>


      {/* =================================================
          OVERVIEW
      ================================================= */}

      {reportType ===
        "overview" && (

        <>

          {/* MAIN STATS */}

          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">


            <ReportStat
              icon={<FiUsers />}
              label="Total Members"
              value={
                members.length
              }
              type="green"
            />


            <ReportStat
              icon={<FiUserCheck />}
              label="Active Members"
              value={
                activeMembers.length
              }
            />


            <ReportStat
              icon={<FiDollarSign />}
              label="Total Revenue"
              value={formatCurrency(
                totalRevenue
              )}
              type="green"
            />


            <ReportStat
              icon={<FiActivity />}
              label="Attendance"
              value={`${attendancePercentage}%`}
              type="yellow"
            />

          </div>


          {/* REVENUE + MEMBER */}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">


            {/* REVENUE CHART */}

            <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6 xl:col-span-2">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs text-slate-600">
                    Revenue Overview
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">

                    {formatCurrency(
                      totalRevenue
                    )}

                  </h2>

                </div>


                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

                  <FiTrendingUp />

                </div>

              </div>


              <div className="mt-8 flex h-56 items-end gap-2 sm:gap-4">

                {monthlyRevenue.map(
                  (month) => {

                    const height =
                      month.value > 0
                        ? Math.max(
                            8,
                            (
                              month.value /
                              maxRevenue
                            ) *
                              100
                          )
                        : 4;


                    return (

                      <div
                        key={
                          month.key
                        }
                        className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                      >

                        <div className="group relative flex h-full w-full items-end">

                          <div
                            style={{
                              height: `${height}%`,
                            }}
                            className="w-full rounded-t-lg bg-green-500/70 transition group-hover:bg-green-400"
                          />

                          {month.value >
                            0 && (

                            <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-2 py-1 text-[10px] text-white group-hover:block">

                              {formatCurrency(
                                month.value
                              )}

                            </div>

                          )}

                        </div>


                        <span className="text-[10px] text-slate-600">

                          {month.name}

                        </span>

                      </div>

                    );
                  }
                )}

              </div>

            </section>


            {/* MEMBER SUMMARY */}

            <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

                  <FiUsers />

                </div>


                <div>

                  <h2 className="text-sm font-semibold text-white">
                    Member Summary
                  </h2>

                  <p className="text-xs text-slate-600">
                    Current members
                  </p>

                </div>

              </div>


              <div className="mt-8 space-y-5">

                <ProgressRow
                  label="Active"
                  value={
                    activeMembers.length
                  }
                  total={
                    members.length
                  }
                  type="green"
                />


                <ProgressRow
                  label="Inactive"
                  value={
                    inactiveMembers.length
                  }
                  total={
                    members.length
                  }
                  type="yellow"
                />


                <div className="border-t border-white/10 pt-5">

                  <div className="flex items-center justify-between">

                    <span className="text-xs text-slate-600">
                      Trainers
                    </span>

                    <span className="text-sm font-semibold text-white">

                      {trainers.length}

                    </span>

                  </div>

                </div>

              </div>

            </section>

          </div>


          {/* QUICK REPORTS */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">


            <QuickReport
              icon={<FiCreditCard />}
              title="Billing"
              value={formatCurrency(
                totalRevenue
              )}
              subtitle={`${paidBills.length} paid bills`}
              type="green"
            />


            <QuickReport
              icon={<FiCalendar />}
              title="Attendance"
              value={`${attendancePercentage}%`}
              subtitle={`${presentRecords.length} present records`}
              type="yellow"
            />


            <QuickReport
              icon={<FiPackage />}
              title="Inventory"
              value={formatCurrency(
                inventoryValue
              )}
              subtitle={`${totalStock} units in stock`}
            />


            <QuickReport
              icon={<FiAlertTriangle />}
              title="Stock Alerts"
              value={
                lowStockProducts.length +
                outOfStockProducts.length
              }
              subtitle="Products need attention"
              type="red"
            />

          </div>

        </>

      )}


      {/* =================================================
          MEMBERS REPORT
      ================================================= */}

      {reportType ===
        "members" && (

        <ReportSection title="Members Report">

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            <ReportStat
              icon={<FiUsers />}
              label="Total Members"
              value={
                members.length
              }
              type="green"
            />

            <ReportStat
              icon={<FiUserCheck />}
              label="Active"
              value={
                activeMembers.length
              }
            />

            <ReportStat
              icon={<FiClock />}
              label="Inactive"
              value={
                inactiveMembers.length
              }
              type="yellow"
            />

            <ReportStat
              icon={<FiActivity />}
              label="Trainers"
              value={
                trainers.length
              }
            />

          </div>


          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead>

                <tr className="border-b border-white/5 text-left">

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Member
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Phone
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Status
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Plan
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-white/5">

                {members.length ===
                0 ? (

                  <EmptyRow
                    text="No members found."
                  />

                ) : (

                  members.map(
                    (member) => (

                      <tr
                        key={
                          member.id
                        }
                        className="hover:bg-white/[0.02]"
                      >

                        <td className="px-4 py-4">

                          <span className="text-sm font-medium text-white">

                            {member.name ||
                              member.fullName ||
                              "Unknown"}

                          </span>

                        </td>


                        <td className="px-4 py-4 text-sm text-slate-500">

                          {member.phone ||
                            member.mobile ||
                            "N/A"}

                        </td>


                        <td className="px-4 py-4">

                          <StatusBadge
                            status={
                              member.status ||
                              "Active"
                            }
                          />

                        </td>


                        <td className="px-4 py-4 text-sm text-slate-500">

                          {member.plan ||
                            member.membershipPlan ||
                            "N/A"}

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </ReportSection>

      )}


      {/* =================================================
          ATTENDANCE REPORT
      ================================================= */}

      {reportType ===
        "attendance" && (

        <ReportSection title="Attendance Report">

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            <ReportStat
              icon={<FiCalendar />}
              label="Total Records"
              value={
                attendance.length
              }
            />

            <ReportStat
              icon={<FiCheckCircle />}
              label="Present"
              value={
                presentRecords.length
              }
              type="green"
            />

            <ReportStat
              icon={<FiClock />}
              label="Absent"
              value={
                absentRecords.length
              }
              type="red"
            />

            <ReportStat
              icon={<FiActivity />}
              label="Attendance Rate"
              value={`${attendancePercentage}%`}
              type="yellow"
            />

          </div>


          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0B0F14] p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-slate-600">
                  Overall Attendance
                </p>

                <p className="mt-1 text-3xl font-bold text-white">

                  {attendancePercentage}%

                </p>

              </div>


              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-green-500/20 text-sm font-bold text-green-400">

                {attendancePercentage}%

              </div>

            </div>


            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/5">

              <div
                style={{
                  width: `${attendancePercentage}%`,
                }}
                className="h-full rounded-full bg-green-500"
              />

            </div>

          </div>

        </ReportSection>

      )}


      {/* =================================================
          BILLING REPORT
      ================================================= */}

      {reportType ===
        "billing" && (

        <ReportSection title="Billing Report">

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            <ReportStat
              icon={<FiDollarSign />}
              label="Revenue"
              value={formatCurrency(
                totalRevenue
              )}
              type="green"
            />

            <ReportStat
              icon={<FiCreditCard />}
              label="Total Bills"
              value={
                bills.length
              }
            />

            <ReportStat
              icon={<FiCheckCircle />}
              label="Paid Bills"
              value={
                paidBills.length
              }
              type="green"
            />

            <ReportStat
              icon={<FiClock />}
              label="Pending"
              value={formatCurrency(
                pendingAmount
              )}
              type="yellow"
            />

          </div>


          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[750px]">

              <thead>

                <tr className="border-b border-white/5 text-left">

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Invoice
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Member
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Plan
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Amount
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-white/5">

                {bills.length ===
                0 ? (

                  <EmptyRow
                    text="No billing records found."
                  />

                ) : (

                  bills.map(
                    (bill) => (

                      <tr
                        key={
                          bill.id
                        }
                        className="hover:bg-white/[0.02]"
                      >

                        <td className="px-4 py-4 text-sm font-medium text-white">

                          {bill.invoiceNumber ||
                            `#${bill.id}`}

                        </td>


                        <td className="px-4 py-4 text-sm text-slate-400">

                          {bill.memberName ||
                            "Unknown"}

                        </td>


                        <td className="px-4 py-4 text-sm text-slate-500">

                          {bill.plan ||
                            "N/A"}

                        </td>


                        <td className="px-4 py-4 text-sm font-semibold text-white">

                          {formatCurrency(
                            bill.amount
                          )}

                        </td>


                        <td className="px-4 py-4">

                          <StatusBadge
                            status={
                              bill.status ||
                              "Unknown"
                            }
                          />

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </ReportSection>

      )}


      {/* =================================================
          SUPPLEMENT REPORT
      ================================================= */}

      {reportType ===
        "supplements" && (

        <ReportSection title="Supplement Inventory Report">

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            <ReportStat
              icon={<FiPackage />}
              label="Products"
              value={
                supplements.length
              }
            />

            <ReportStat
              icon={<FiBox />}
              label="Stock Units"
              value={
                totalStock
              }
              type="green"
            />

            <ReportStat
              icon={<FiAlertTriangle />}
              label="Low Stock"
              value={
                lowStockProducts.length
              }
              type="yellow"
            />

            <ReportStat
              icon={<FiDollarSign />}
              label="Inventory Value"
              value={formatCurrency(
                inventoryValue
              )}
              type="green"
            />

          </div>


          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[750px]">

              <thead>

                <tr className="border-b border-white/5 text-left">

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Product
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Category
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Price
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Stock
                  </th>

                  <th className="px-4 py-4 text-xs text-slate-600">
                    Value
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-white/5">

                {supplements.length ===
                0 ? (

                  <EmptyRow
                    text="No supplements found."
                  />

                ) : (

                  topSupplements.map(
                    (item) => {

                      const stock =
                        Number(
                          item.stock || 0
                        );

                      const value =
                        Number(
                          item.price || 0
                        ) *
                        stock;


                      return (

                        <tr
                          key={
                            item.id
                          }
                          className="hover:bg-white/[0.02]"
                        >

                          <td className="px-4 py-4 text-sm font-medium text-white">

                            {item.name ||
                              "Unnamed"}

                          </td>


                          <td className="px-4 py-4 text-sm text-slate-500">

                            {item.category ||
                              "Other"}

                          </td>


                          <td className="px-4 py-4 text-sm text-slate-400">

                            {formatCurrency(
                              item.price
                            )}

                          </td>


                          <td className="px-4 py-4">

                            <StockBadge
                              stock={
                                stock
                              }
                            />

                          </td>


                          <td className="px-4 py-4 text-sm font-semibold text-white">

                            {formatCurrency(
                              value
                            )}

                          </td>

                        </tr>

                      );

                    }
                  )

                )}

              </tbody>

            </table>

          </div>

        </ReportSection>

      )}


      {/* =================================================
          PRINT FOOTER
      ================================================= */}

      <div className="hidden print:block print:pt-8">

        <p className="text-center text-xs text-gray-500">

          Gym Management System — Generated Report

        </p>

        <p className="mt-1 text-center text-xs text-gray-400">

          Generated on{" "}

          {new Date().toLocaleDateString(
            "en-IN"
          )}

        </p>

      </div>

    </div>
  );
}


/* =====================================================
   REPORT STAT
===================================================== */

function ReportStat({
  icon,
  label,
  value,
  type,
}) {

  let iconClass =
    "bg-white/[0.03] text-slate-500";


  if (type === "green") {

    iconClass =
      "bg-green-500/10 text-green-400";

  }


  if (type === "yellow") {

    iconClass =
      "bg-yellow-500/10 text-yellow-400";

  }


  if (type === "red") {

    iconClass =
      "bg-red-500/10 text-red-400";

  }


  return (
    <div className="rounded-2xl border border-white/10 bg-[#121821] p-4 sm:p-5">

      <div className="flex items-center justify-between gap-3">

        <div className="min-w-0">

          <p className="truncate text-xs text-slate-600">

            {label}

          </p>


          <p className="mt-2 truncate text-xl font-bold text-white sm:text-2xl">

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
   REPORT TAB
===================================================== */

function ReportTab({
  active,
  onClick,
  children,
}) {

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
        active
          ? "bg-green-500 text-black"
          : "bg-white/[0.03] text-slate-500 hover:text-white"
      }`}
    >

      {children}

    </button>
  );
}


/* =====================================================
   PROGRESS ROW
===================================================== */

function ProgressRow({
  label,
  value,
  total,
  type,
}) {

  const percentage =
    total > 0
      ? Math.round(
          (value / total) *
            100
        )
      : 0;


  const barClass =
    type === "green"
      ? "bg-green-500"
      : "bg-yellow-400";


  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-xs text-slate-500">
          {label}
        </span>

        <span className="text-xs font-semibold text-white">
          {value}
        </span>

      </div>


      <div className="h-2 overflow-hidden rounded-full bg-white/5">

        <div
          style={{
            width: `${percentage}%`,
          }}
          className={`h-full rounded-full ${barClass}`}
        />

      </div>

    </div>
  );
}


/* =====================================================
   QUICK REPORT
===================================================== */

function QuickReport({
  icon,
  title,
  value,
  subtitle,
  type,
}) {

  const iconClass =
    type === "green"
      ? "bg-green-500/10 text-green-400"
      : type === "yellow"
        ? "bg-yellow-500/10 text-yellow-400"
        : type === "red"
          ? "bg-red-500/10 text-red-400"
          : "bg-white/[0.03] text-slate-500";


  return (
    <div className="rounded-2xl border border-white/10 bg-[#121821] p-5">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >

          {icon}

        </div>


        <p className="text-sm font-semibold text-white">

          {title}

        </p>

      </div>


      <p className="mt-5 text-2xl font-bold text-white">

        {value}

      </p>


      <p className="mt-1 text-xs text-slate-600">

        {subtitle}

      </p>

    </div>
  );
}


/* =====================================================
   REPORT SECTION
===================================================== */

function ReportSection({
  title,
  children,
}) {

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

          <FiBarChart2 />

        </div>


        <div>

          <h2 className="text-lg font-semibold text-white">

            {title}

          </h2>


          <p className="mt-1 text-xs text-slate-600">

            Detailed performance report

          </p>

        </div>

      </div>


      {children}

    </section>
  );
}


/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({
  status,
}) {

  const value =
    String(
      status || ""
    ).toLowerCase();


  if (
    value === "paid" ||
    value === "active" ||
    value === "present"
  ) {

    return (
      <span className="inline-flex rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold capitalize text-green-400">

        {status}

      </span>
    );

  }


  if (
    value === "pending" ||
    value === "inactive"
  ) {

    return (
      <span className="inline-flex rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold capitalize text-yellow-400">

        {status}

      </span>
    );

  }


  return (
    <span className="inline-flex rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold capitalize text-red-400">

      {status}

    </span>
  );
}


/* =====================================================
   STOCK BADGE
===================================================== */

function StockBadge({
  stock,
}) {

  if (stock <= 0) {

    return (
      <span className="rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">

        Out of Stock

      </span>
    );

  }


  if (stock <= 10) {

    return (
      <span className="rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">

        Low: {stock}

      </span>
    );

  }


  return (
    <span className="rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">

      {stock}

    </span>
  );
}


/* =====================================================
   EMPTY ROW
===================================================== */

function EmptyRow({
  text,
}) {

  return (
    <tr>

      <td
        colSpan="5"
        className="px-4 py-12 text-center text-sm text-slate-600"
      >

        {text}

      </td>

    </tr>
  );
}


/* =====================================================
   STORAGE PARSER
===================================================== */

function parseStorage(
  data
) {

  if (!data) {
    return [];
  }


  try {

    const parsed =
      JSON.parse(data);


    return Array.isArray(
      parsed
    )
      ? parsed
      : [];

  } catch {

    return [];

  }
}


/* =====================================================
   CURRENCY
===================================================== */

function formatCurrency(
  amount
) {

  const number =
    Number(amount) || 0;

  return `₹${number.toLocaleString(
    "en-IN"
  )}`;
}