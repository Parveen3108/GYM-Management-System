/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  FiPlus,
  FiSearch,
  FiCreditCard,
  FiDollarSign,
  FiClock,
  FiFileText,
  FiEye,
  FiTrash2,
  FiFilter,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function BillingPage() {
  const [bills, setBills] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);


  /* =====================================================
     LOAD BILLS
  ===================================================== */

  useEffect(() => {
    loadBills();
  }, []);


  const loadBills = () => {
    try {
      const storedData =
        localStorage.getItem(
          "gym_bills"
        );

      if (!storedData) {
        setBills([]);
        setLoading(false);
        return;
      }

      const parsed =
        JSON.parse(storedData);

      if (Array.isArray(parsed)) {
        setBills(parsed);
      } else {
        setBills([]);
      }

    } catch (error) {
      console.error(
        "Billing load error:",
        error
      );

      setBills([]);

    } finally {
      setLoading(false);
    }
  };


  /* =====================================================
     SEARCH + FILTER
  ===================================================== */

  const filteredBills = useMemo(() => {
    let result = [...bills];


    if (search.trim()) {
      const text =
        search.toLowerCase();

      result = result.filter(
        (bill) => {

          const memberName =
            String(
              bill.memberName || ""
            ).toLowerCase();

          const billId =
            String(
              bill.id || ""
            ).toLowerCase();

          const plan =
            String(
              bill.plan || ""
            ).toLowerCase();

          return (
            memberName.includes(text) ||
            billId.includes(text) ||
            plan.includes(text)
          );
        }
      );
    }


    if (statusFilter !== "All") {
      result = result.filter(
        (bill) =>
          bill.status ===
          statusFilter
      );
    }


    return result;

  }, [
    bills,
    search,
    statusFilter,
  ]);


  /* =====================================================
     BILL TOTALS
  ===================================================== */

  const totalBills =
    bills.length;


  const paidBills =
    bills.filter(
      (bill) =>
        bill.status === "Paid"
    );


  const pendingBills =
    bills.filter(
      (bill) =>
        bill.status === "Pending"
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


  const totalAmount =
    bills.reduce(
      (total, bill) =>
        total +
        Number(
          bill.amount || 0
        ),
      0
    );


  /* =====================================================
     DELETE BILL
  ===================================================== */

  const handleDelete = (billId) => {

    const bill =
      bills.find(
        (item) =>
          String(item.id) ===
          String(billId)
      );

    if (!bill) {
      return;
    }


    const confirmed =
      window.confirm(
        `Delete bill for ${bill.memberName || "this member"}?`
      );


    if (!confirmed) {
      return;
    }


    try {

      const updatedBills =
        bills.filter(
          (item) =>
            String(item.id) !==
            String(billId)
        );


      localStorage.setItem(
        "gym_bills",
        JSON.stringify(
          updatedBills
        )
      );


      setBills(updatedBills);


      alert(
        "Bill deleted successfully!"
      );

    } catch (error) {

      console.error(
        "Delete bill error:",
        error
      );

      alert(
        "Unable to delete bill."
      );
    }
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="flex items-center gap-3 text-sm text-slate-400">

          <FiRefreshCw className="animate-spin text-green-400" />

          Loading billing...

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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">

            <span>
              Dashboard
            </span>

            <span>/</span>

            <span className="text-slate-400">
              Billing
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Billing
          </h1>


          <p className="mt-1 text-sm text-slate-500">
            Manage gym payments and invoices.
          </p>

        </div>


        <Link
          href="/dashboard/billing/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400"
        >

          <FiPlus />

          Create Bill

        </Link>

      </div>


      {/* =================================================
          STATS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">


        <BillingStat
          icon={<FiDollarSign />}
          label="Total Revenue"
          value={formatCurrency(
            totalRevenue
          )}
          type="green"
        />


        <BillingStat
          icon={<FiCreditCard />}
          label="Total Bills"
          value={totalBills}
        />


        <BillingStat
          icon={<FiCheckCircle />}
          label="Paid Amount"
          value={formatCurrency(
            totalRevenue
          )}
          type="green"
        />


        <BillingStat
          icon={<FiClock />}
          label="Pending Amount"
          value={formatCurrency(
            pendingAmount
          )}
          type="yellow"
        />

      </div>


      {/* =================================================
          COLLECTION SUMMARY
      ================================================= */}

      <div className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">


          <div>

            <p className="text-xs text-slate-600">
              Total Billing Value
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {formatCurrency(
                totalAmount
              )}
            </p>

          </div>


          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">

            <SummaryItem
              label="Paid Bills"
              value={
                paidBills.length
              }
              type="green"
            />

            <SummaryItem
              label="Pending Bills"
              value={
                pendingBills.length
              }
              type="yellow"
            />

            <SummaryItem
              label="Total"
              value={totalBills}
            />

          </div>

        </div>

      </div>


      {/* =================================================
          FILTER BAR
      ================================================= */}

      <div className="rounded-2xl border border-white/10 bg-[#121821] p-4">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">


          {/* SEARCH */}

          <div className="relative w-full lg:max-w-md">

            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search member, bill ID or plan..."
              className="w-full rounded-xl border border-white/10 bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-green-500/40"
            />

          </div>


          {/* FILTER */}

          <div className="flex flex-wrap items-center gap-2">

            <div className="flex items-center gap-2 text-xs text-slate-600">

              <FiFilter />

              Status

            </div>


            {[
              "All",
              "Paid",
              "Pending",
            ].map((status) => (

              <button
                key={status}
                type="button"
                onClick={() =>
                  setStatusFilter(
                    status
                  )
                }
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  statusFilter ===
                  status
                    ? "bg-green-500 text-black"
                    : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                }`}
              >

                {status}

              </button>

            ))}

          </div>

        </div>

      </div>


      {/* =================================================
          BILL TABLE
      ================================================= */}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#121821]">


        {/* HEADER */}

        <div className="border-b border-white/10 px-5 py-4 sm:px-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-sm font-semibold text-white">
                Recent Bills
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                {filteredBills.length} bills found
              </p>

            </div>

          </div>

        </div>


        {/* EMPTY */}

        {filteredBills.length === 0 ? (

          <div className="px-6 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] text-slate-600">

              <FiFileText className="text-2xl" />

            </div>


            <h3 className="mt-5 text-lg font-semibold text-white">
              No Bills Found
            </h3>


            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">

              {bills.length === 0
                ? "Create your first bill to start managing gym payments."
                : "No bills match your current search or filter."}

            </p>


            {bills.length === 0 && (

              <Link
                href="/dashboard/billing/create"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black"
              >

                <FiPlus />

                Create First Bill

              </Link>

            )}

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">


              <thead>

                <tr className="border-b border-white/5 text-left">

                  <th className="px-5 py-4 text-xs font-semibold text-slate-600 sm:px-6">
                    Bill
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">
                    Member
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">
                    Plan
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">
                    Date
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold text-slate-600 sm:px-6">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-white/5">

                {filteredBills.map(
                  (bill) => (

                    <tr
                      key={bill.id}
                      className="transition hover:bg-white/[0.015]"
                    >


                      {/* BILL */}

                      <td className="px-5 py-4 sm:px-6">

                        <div>

                          <p className="text-sm font-semibold text-white">

                            #{String(
                              bill.id
                            ).slice(-6)}

                          </p>

                          <p className="mt-1 text-xs text-slate-600">

                            {bill.invoiceNumber ||
                              "Invoice"}

                          </p>

                        </div>

                      </td>


                      {/* MEMBER */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-xs font-bold text-green-400">

                            {getInitials(
                              bill.memberName
                            )}

                          </div>


                          <div>

                            <p className="text-sm font-medium text-white">

                              {bill.memberName ||
                                "Unknown Member"}

                            </p>

                            <p className="mt-1 text-xs text-slate-600">

                              {bill.phone ||
                                "No phone"}

                            </p>

                          </div>

                        </div>

                      </td>


                      {/* PLAN */}

                      <td className="px-5 py-4">

                        <span className="text-sm text-slate-400">

                          {bill.plan ||
                            "Gym Membership"}

                        </span>

                      </td>


                      {/* DATE */}

                      <td className="px-5 py-4">

                        <span className="text-sm text-slate-400">

                          {bill.date ||
                            bill.createdAt
                              ?.slice(
                                0,
                                10
                              ) ||
                            "N/A"}

                        </span>

                      </td>


                      {/* AMOUNT */}

                      <td className="px-5 py-4">

                        <span className="text-sm font-semibold text-white">

                          {formatCurrency(
                            bill.amount
                          )}

                        </span>

                      </td>


                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <BillStatus
                          status={
                            bill.status
                          }
                        />

                      </td>


                      {/* ACTION */}

                      <td className="px-5 py-4 sm:px-6">

                        <div className="flex justify-end gap-2">


                          <Link
                            href={`/dashboard/billing/${bill.id}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] text-slate-500 transition hover:bg-green-500/10 hover:text-green-400"
                            title="View Bill"
                          >

                            <FiEye />

                          </Link>


                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                bill.id
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                            title="Delete Bill"
                          >

                            <FiTrash2 />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
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
   BILLING STAT
===================================================== */

function BillingStat({
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
   SUMMARY ITEM
===================================================== */

function SummaryItem({
  label,
  value,
  type,
}) {

  const textClass =
    type === "green"
      ? "text-green-400"
      : type === "yellow"
        ? "text-yellow-400"
        : "text-white";

  return (
    <div>

      <p className="text-xs text-slate-600">
        {label}
      </p>

      <p
        className={`mt-1 text-lg font-bold ${textClass}`}
      >
        {value}
      </p>

    </div>
  );
}


/* =====================================================
   BILL STATUS
===================================================== */

function BillStatus({
  status,
}) {

  if (status === "Paid") {

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">

        <FiCheckCircle />

        Paid

      </span>
    );

  }


  if (status === "Pending") {

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">

        <FiAlertCircle />

        Pending

      </span>
    );

  }


  return (
    <span className="inline-flex rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-500">

      {status || "Unknown"}

    </span>
  );
}


/* =====================================================
   CURRENCY
===================================================== */

function formatCurrency(amount) {

  const number =
    Number(amount) || 0;

  return `₹${number.toLocaleString(
    "en-IN"
  )}`;
}


/* =====================================================
   INITIALS
===================================================== */

function getInitials(name) {

  if (!name) {
    return "MB";
  }

  return name
    .split(" ")
    .map(
      (word) =>
        word[0]
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();
}