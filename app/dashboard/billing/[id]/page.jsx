/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiEdit,
  FiPrinter,
  FiDownload,
  FiFileText,
  FiUser,
  FiPhone,
  FiCalendar,
  FiCreditCard,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiDollarSign,
} from "react-icons/fi";

export default function ViewBillPage() {
  const params = useParams();
  const router = useRouter();

  const billId = params?.id;

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     LOAD BILL
  ===================================================== */

  useEffect(() => {
    if (!billId) {
      return;
    }

    loadBill();
  }, [billId]);


  const loadBill = () => {
    try {
      const storedData =
        localStorage.getItem(
          "gym_bills"
        );

      if (!storedData) {
        setLoading(false);
        return;
      }

      const bills =
        JSON.parse(storedData);

      if (!Array.isArray(bills)) {
        setLoading(false);
        return;
      }

      const foundBill =
        bills.find(
          (item) =>
            String(item.id) ===
            String(billId)
        );

      setBill(
        foundBill || null
      );

    } catch (error) {
      console.error(
        "View bill error:",
        error
      );

      setBill(null);

    } finally {
      setLoading(false);
    }
  };


  /* =====================================================
     PRINT
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

          Loading invoice...

        </div>

      </div>
    );
  }


  /* =====================================================
     NOT FOUND
  ===================================================== */

  if (!bill) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">

            <FiFileText className="text-2xl" />

          </div>


          <h2 className="mt-5 text-xl font-bold text-white">

            Bill Not Found

          </h2>


          <p className="mt-2 text-sm text-slate-500">

            This invoice does not exist in Local Storage.

          </p>


          <Link
            href="/dashboard/billing"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black"
          >

            <FiArrowLeft />

            Back to Billing

          </Link>

        </div>

      </div>
    );
  }


  /* =====================================================
     AMOUNT
  ===================================================== */

  const baseAmount =
    Number(
      bill.baseAmount ??
      bill.amount ??
      0
    );


  const discount =
    Number(
      bill.discount ??
      0
    );


  const discountAmount =
    Number(
      bill.discountAmount ??
      (
        baseAmount *
        discount
      ) /
      100
    );


  const finalAmount =
    Number(
      bill.amount ??
      Math.max(
        0,
        baseAmount -
        discountAmount
      )
    );


  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="mx-auto max-w-5xl space-y-6">


      {/* =================================================
          TOP HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">

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
              href="/dashboard/billing"
              className="hover:text-green-400"
            >
              Billing
            </Link>

            <span>/</span>

            <span className="text-slate-400">
              Invoice
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">

            Invoice

          </h1>


          <p className="mt-1 text-sm text-slate-500">

            View billing and payment details.

          </p>

        </div>


        {/* ACTIONS */}

        <div className="flex flex-wrap gap-2">


          <Link
            href="/dashboard/billing"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
          >

            <FiArrowLeft />

            Back

          </Link>


          <Link
            href={`/dashboard/billing/${bill.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
          >

            <FiEdit />

            Edit

          </Link>


          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
          >

            <FiPrinter />

            Print

          </button>

        </div>

      </div>


      {/* =================================================
          INVOICE
      ================================================= */}

      <section
        id="invoice"
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#121821] print:rounded-none print:border-0 print:bg-white"
      >


        {/* =================================================
            INVOICE HEADER
        ================================================= */}

        <div className="border-b border-white/10 p-6 sm:p-8 print:border-b-2 print:border-gray-200">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">


            {/* GYM */}

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-black print:bg-black print:text-white">

                  <FiDollarSign className="text-xl" />

                </div>


                <div>

                  <h2 className="text-xl font-bold text-white print:text-black">

                    GYM
                    <span className="text-green-400 print:text-black">
                      PRO
                    </span>

                  </h2>

                  <p className="text-xs text-slate-600 print:text-gray-500">

                    Gym Management System

                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-1 text-xs text-slate-500 print:text-gray-500">

                <p>
                  Gym Management & Fitness Center
                </p>

                <p>
                  Phone: +91 98765 43210
                </p>

                <p>
                  Email: gympro@example.com
                </p>

              </div>

            </div>


            {/* INVOICE */}

            <div className="sm:text-right">

              <p className="text-xs uppercase tracking-[0.15em] text-slate-600 print:text-gray-500">

                Invoice

              </p>


              <h3 className="mt-1 text-2xl font-bold text-white print:text-black">

                {bill.invoiceNumber ||
                  `#${bill.id}`}

              </h3>


              <p className="mt-2 text-xs text-slate-500 print:text-gray-500">

                Date:{" "}

                {formatDate(
                  bill.billingDate ||
                  bill.date
                )}

              </p>


              <div className="mt-3">

                <BillStatus
                  status={
                    bill.status
                  }
                />

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            CUSTOMER INFORMATION
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 border-b border-white/10 p-6 sm:grid-cols-2 sm:p-8 print:border-gray-200">


          <div>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600 print:text-gray-500">

              Billed To

            </p>


            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400 print:bg-gray-100 print:text-black">

                <FiUser />

              </div>


              <div>

                <h4 className="font-semibold text-white print:text-black">

                  {bill.memberName ||
                    "Unknown Member"}

                </h4>


                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 print:text-gray-500">

                  <FiPhone />

                  {bill.phone ||
                    "No phone number"}

                </p>


                <p className="mt-1 text-xs text-slate-600 print:text-gray-500">

                  Member ID:{" "}

                  {bill.memberId ||
                    "N/A"}

                </p>

              </div>

            </div>

          </div>


          <div className="sm:text-right">

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600 print:text-gray-500">

              Payment Information

            </p>


            <div className="space-y-2 text-xs">

              <div className="flex justify-between gap-4 sm:justify-end">

                <span className="text-slate-600 print:text-gray-500">
                  Payment Method:
                </span>

                <span className="font-semibold text-slate-300 print:text-black">

                  {bill.paymentMethod ||
                    "Cash"}

                </span>

              </div>


              <div className="flex justify-between gap-4 sm:justify-end">

                <span className="text-slate-600 print:text-gray-500">
                  Payment Status:
                </span>

                <span className="font-semibold text-slate-300 print:text-black">

                  {bill.status ||
                    "Unknown"}

                </span>

              </div>


              {bill.dueDate && (

                <div className="flex justify-between gap-4 sm:justify-end">

                  <span className="text-slate-600 print:text-gray-500">
                    Due Date:
                  </span>

                  <span className="font-semibold text-slate-300 print:text-black">

                    {formatDate(
                      bill.dueDate
                    )}

                  </span>

                </div>

              )}

            </div>

          </div>

        </div>


        {/* =================================================
            BILL TABLE
        ================================================= */}

        <div className="p-6 sm:p-8">

          <div className="overflow-hidden rounded-xl border border-white/10 print:border-gray-200">

            <table className="w-full">

              <thead>

                <tr className="bg-white/[0.03] print:bg-gray-100">

                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 print:text-gray-600">

                    Description

                  </th>

                  <th className="px-4 py-4 text-right text-xs font-semibold text-slate-500 print:text-gray-600">

                    Amount

                  </th>

                </tr>

              </thead>


              <tbody>

                <tr className="border-t border-white/5 print:border-gray-200">

                  <td className="px-4 py-5">

                    <p className="font-semibold text-white print:text-black">

                      {bill.plan ||
                        "Gym Membership"}

                    </p>

                    <p className="mt-1 text-xs text-slate-600 print:text-gray-500">

                      Gym membership payment

                    </p>

                  </td>


                  <td className="px-4 py-5 text-right font-semibold text-white print:text-black">

                    {formatCurrency(
                      baseAmount
                    )}

                  </td>

                </tr>

              </tbody>

            </table>

          </div>


          {/* =================================================
              TOTAL
          ================================================= */}

          <div className="mt-6 flex justify-end">

            <div className="w-full max-w-sm space-y-3">


              <InvoiceRow
                label="Subtotal"
                value={formatCurrency(
                  baseAmount
                )}
              />


              {discount > 0 && (

                <InvoiceRow
                  label={`Discount (${discount}%)`}
                  value={`- ${formatCurrency(
                    discountAmount
                  )}`}
                />

              )}


              <div className="border-t border-white/10 pt-4 print:border-gray-200">

                <div className="flex items-center justify-between gap-4">

                  <span className="text-sm font-semibold text-white print:text-black">

                    Total

                  </span>


                  <span className="text-2xl font-bold text-green-400 print:text-black">

                    {formatCurrency(
                      finalAmount
                    )}

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            NOTES
        ================================================= */}

        {bill.notes && (

          <div className="border-t border-white/10 px-6 py-5 sm:px-8 print:border-gray-200">

            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600 print:text-gray-500">

              Notes

            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400 print:text-gray-700">

              {bill.notes}

            </p>

          </div>

        )}


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="border-t border-white/10 bg-white/[0.02] px-6 py-5 text-center sm:px-8 print:border-gray-200 print:bg-white">

          <p className="text-xs font-medium text-slate-500 print:text-gray-600">

            Thank you for choosing GYMPRO.

          </p>

          <p className="mt-1 text-[10px] text-slate-700 print:text-gray-500">

            This is a computer generated invoice.

          </p>

        </div>

      </section>


      {/* =================================================
          QUICK INFO
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 print:hidden">


        <QuickInfo
          icon={<FiCalendar />}
          label="Billing Date"
          value={formatDate(
            bill.billingDate ||
            bill.date
          )}
        />


        <QuickInfo
          icon={<FiCreditCard />}
          label="Payment Method"
          value={
            bill.paymentMethod ||
            "Cash"
          }
        />


        <QuickInfo
          icon={<FiDollarSign />}
          label="Amount Paid"
          value={formatCurrency(
            finalAmount
          )}
        />

      </div>

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
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400 print:bg-gray-100 print:text-black">

        <FiCheckCircle />

        Paid

      </span>
    );

  }


  if (status === "Pending") {

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400 print:bg-gray-100 print:text-black">

        <FiClock />

        Pending

      </span>
    );

  }


  return (
    <span className="inline-flex rounded-full bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-500 print:bg-gray-100 print:text-black">

      {status || "Unknown"}

    </span>
  );
}


/* =====================================================
   INVOICE ROW
===================================================== */

function InvoiceRow({
  label,
  value,
}) {

  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-sm text-slate-500 print:text-gray-600">

        {label}

      </span>


      <span className="text-sm font-medium text-slate-300 print:text-black">

        {value}

      </span>

    </div>
  );
}


/* =====================================================
   QUICK INFO
===================================================== */

function QuickInfo({
  icon,
  label,
  value,
}) {

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121821] p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

          {icon}

        </div>


        <div className="min-w-0">

          <p className="text-[10px] uppercase tracking-wider text-slate-600">

            {label}

          </p>


          <p className="mt-1 truncate text-sm font-semibold text-slate-300">

            {value}

          </p>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(
  dateString
) {

  if (!dateString) {
    return "N/A";
  }


  const date =
    new Date(
      `${dateString}T00:00:00`
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return dateString;
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