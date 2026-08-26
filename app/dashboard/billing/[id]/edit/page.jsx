/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiUser,
  FiCreditCard,
  FiCalendar,
  FiDollarSign,
  FiPercent,
  FiSave,
  FiX,
  FiRefreshCw,
  FiFileText,
} from "react-icons/fi";

export default function EditBillPage() {
  const params = useParams();
  const router = useRouter();

  const billId = params?.id;

  const [bill, setBill] = useState(null);

  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    memberId: "",
    plan: "",
    billingDate: "",
    dueDate: "",
    amount: "",
    discount: "",
    paymentMethod: "Cash",
    status: "Paid",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({});


  /* =====================================================
     LOAD BILL + MEMBERS
  ===================================================== */

  useEffect(() => {
    if (!billId) {
      return;
    }

    loadData();
  }, [billId]);


  const loadData = () => {
    try {

      /* -----------------------------------------------
         LOAD MEMBERS
      ------------------------------------------------ */

      const memberData =
        localStorage.getItem(
          "gym_members"
        );

      if (memberData) {
        const parsedMembers =
          JSON.parse(memberData);

        if (Array.isArray(parsedMembers)) {
          setMembers(parsedMembers);
        }
      }


      /* -----------------------------------------------
         LOAD BILLS
      ------------------------------------------------ */

      const billData =
        localStorage.getItem(
          "gym_bills"
        );

      if (!billData) {
        setLoading(false);
        return;
      }

      const bills =
        JSON.parse(billData);

      if (!Array.isArray(bills)) {
        setLoading(false);
        return;
      }


      /* -----------------------------------------------
         FIND BILL
      ------------------------------------------------ */

      const foundBill =
        bills.find(
          (item) =>
            String(item.id) ===
            String(billId)
        );


      if (!foundBill) {
        setLoading(false);
        return;
      }


      setBill(foundBill);


      /* -----------------------------------------------
         FILL FORM
      ------------------------------------------------ */

      setFormData({
        memberId:
          foundBill.memberId || "",

        plan:
          foundBill.plan || "",

        billingDate:
          foundBill.billingDate ||
          foundBill.date ||
          "",

        dueDate:
          foundBill.dueDate || "",

        amount:
          foundBill.baseAmount ??
          foundBill.amount ??
          "",

        discount:
          foundBill.discount ??
          "",

        paymentMethod:
          foundBill.paymentMethod ||
          "Cash",

        status:
          foundBill.status ||
          "Paid",

        notes:
          foundBill.notes ||
          "",
      });


    } catch (error) {

      console.error(
        "Load bill error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  /* =====================================================
     MEMBER HELPERS
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


  const getMemberName = (member) => {
    return (
      member.name ||
      member.fullName ||
      member.memberName ||
      "Unknown Member"
    );
  };


  const getMemberPhone = (member) => {
    return (
      member.phone ||
      member.mobile ||
      member.contact ||
      ""
    );
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

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };


  /* =====================================================
     SELECTED MEMBER
  ===================================================== */

  const selectedMember =
    members.find(
      (member) =>
        String(
          getMemberId(member)
        ) ===
        String(
          formData.memberId
        )
    );


  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const baseAmount =
    Number(
      formData.amount
    ) || 0;


  const discountPercent =
    Number(
      formData.discount
    ) || 0;


  const discountAmount =
    (baseAmount *
      discountPercent) /
    100;


  const finalAmount =
    Math.max(
      0,
      baseAmount -
        discountAmount
    );


  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};


    if (!formData.memberId) {
      newErrors.memberId =
        "Please select a member.";
    }


    if (!formData.plan) {
      newErrors.plan =
        "Please select a membership plan.";
    }


    if (!formData.billingDate) {
      newErrors.billingDate =
        "Billing date is required.";
    }


    if (!formData.amount) {
      newErrors.amount =
        "Amount is required.";
    } else if (
      Number(formData.amount) <= 0
    ) {
      newErrors.amount =
        "Amount must be greater than 0.";
    }


    if (
      formData.discount &&
      (
        Number(formData.discount) < 0 ||
        Number(formData.discount) > 100
      )
    ) {
      newErrors.discount =
        "Discount must be between 0 and 100.";
    }


    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  /* =====================================================
     SAVE CHANGES
  ===================================================== */

  const handleSave = () => {

    console.log(
      "========== UPDATE BILL =========="
    );


    if (!validateForm()) {
      return;
    }


    if (!bill) {
      return;
    }


    if (!selectedMember) {
      setErrors({
        memberId:
          "Selected member not found.",
      });

      return;
    }


    setSaving(true);


    try {

      /* -----------------------------------------------
         GET EXISTING BILLS
      ------------------------------------------------ */

      const storedData =
        localStorage.getItem(
          "gym_bills"
        );


      if (!storedData) {
        throw new Error(
          "Billing data not found."
        );
      }


      const bills =
        JSON.parse(storedData);


      if (!Array.isArray(bills)) {
        throw new Error(
          "Invalid billing data."
        );
      }


      /* -----------------------------------------------
         UPDATED BILL
      ------------------------------------------------ */

      const updatedBill = {

        ...bill,

        /* Keep original ID */

        id:
          bill.id,

        invoiceNumber:
          bill.invoiceNumber ||
          `INV-${bill.id}`,

        memberId:
          getMemberId(
            selectedMember
          ),

        memberName:
          getMemberName(
            selectedMember
          ),

        phone:
          getMemberPhone(
            selectedMember
          ),

        plan:
          formData.plan,

        date:
          formData.billingDate,

        billingDate:
          formData.billingDate,

        dueDate:
          formData.dueDate,

        baseAmount:
          baseAmount,

        discount:
          discountPercent,

        discountAmount:
          discountAmount,

        amount:
          finalAmount,

        paymentMethod:
          formData.paymentMethod,

        status:
          formData.status,

        notes:
          formData.notes.trim(),

        updatedAt:
          new Date().toISOString(),

      };


      console.log(
        "Updated Bill:",
        updatedBill
      );


      /* -----------------------------------------------
         UPDATE ONLY SELECTED BILL
      ------------------------------------------------ */

      const updatedBills =
        bills.map(
          (item) => {

            if (
              String(item.id) ===
              String(billId)
            ) {
              return updatedBill;
            }

            return item;
          }
        );


      /* -----------------------------------------------
         SAVE
      ------------------------------------------------ */

      localStorage.setItem(
        "gym_bills",
        JSON.stringify(
          updatedBills
        )
      );


      /* -----------------------------------------------
         VERIFY
      ------------------------------------------------ */

      const verifyData =
        localStorage.getItem(
          "gym_bills"
        );


      if (!verifyData) {
        throw new Error(
          "Bill was not saved."
        );
      }


      const verifyBills =
        JSON.parse(
          verifyData
        );


      const verifyBill =
        verifyBills.find(
          (item) =>
            String(item.id) ===
            String(billId)
        );


      if (!verifyBill) {
        throw new Error(
          "Bill update verification failed."
        );
      }


      console.log(
        "BILL UPDATED SUCCESSFULLY:",
        verifyBill
      );


      /* -----------------------------------------------
         SUCCESS
      ------------------------------------------------ */

      alert(
        "Bill updated successfully!"
      );


      router.push(
        "/dashboard/billing"
      );


    } catch (error) {

      console.error(
        "UPDATE BILL ERROR:",
        error
      );


      setErrors({
        submit:
          error.message ||
          "Unable to update bill.",
      });


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

          <FiRefreshCw className="animate-spin text-green-400" />

          Loading bill...

        </div>

      </div>
    );

  }


  /* =====================================================
     BILL NOT FOUND
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

            This bill does not exist in Local Storage.

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
     PAGE
  ===================================================== */

  return (
    <div className="mx-auto max-w-6xl space-y-6">


      {/* =================================================
          HEADER
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
              href="/dashboard/billing"
              className="hover:text-green-400"
            >
              Billing
            </Link>

            <span>/</span>

            <span className="text-slate-400">
              Edit Bill
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">

            Edit Bill

          </h1>


          <p className="mt-1 text-sm text-slate-500">

            Update billing and payment information.

          </p>

        </div>


        <Link
          href="/dashboard/billing"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >

          <FiArrowLeft />

          Back to Billing

        </Link>

      </div>


      {/* =================================================
          BILL INFO
      ================================================= */}

      <div className="rounded-xl border border-green-500/10 bg-green-500/[0.03] px-4 py-3">

        <div className="flex flex-wrap items-center gap-2 text-xs">

          <span className="text-slate-500">
            Editing Invoice:
          </span>

          <span className="font-semibold text-green-400">

            {bill.invoiceNumber ||
              `#${bill.id}`}

          </span>

          <span className="text-slate-600">
            •
          </span>

          <span className="text-slate-500">

            {bill.memberName ||
              "Unknown Member"}

          </span>

        </div>

      </div>


      {/* =================================================
          BILL FORM
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">


        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

            <FiFileText />

          </div>


          <div>

            <h2 className="text-sm font-semibold text-white">

              Bill Information

            </h2>


            <p className="mt-0.5 text-xs text-slate-600">

              Update payment and membership details.

            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">


          {/* MEMBER */}

          <SelectField
            label="Select Member"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            required
            error={errors.memberId}
          >

            <option value="">
              Select member
            </option>

            {members.map(
              (member) => (

                <option
                  key={getMemberId(
                    member
                  )}
                  value={getMemberId(
                    member
                  )}
                >

                  {getMemberName(
                    member
                  )}

                  {getMemberPhone(
                    member
                  )
                    ? ` - ${getMemberPhone(
                        member
                      )}`
                    : ""}

                </option>

              )
            )}

          </SelectField>


          {/* PLAN */}

          <SelectField
            label="Membership Plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            required
            error={errors.plan}
          >

            <option value="">
              Select plan
            </option>

            <option value="Monthly">
              Monthly
            </option>

            <option value="Quarterly">
              Quarterly
            </option>

            <option value="Half Yearly">
              Half Yearly
            </option>

            <option value="Yearly">
              Yearly
            </option>

            <option value="Personal Training">
              Personal Training
            </option>

            <option value="Custom">
              Custom
            </option>

          </SelectField>


          {/* BILLING DATE */}

          <InputField
            label="Billing Date"
            name="billingDate"
            value={
              formData.billingDate
            }
            onChange={handleChange}
            type="date"
            icon={<FiCalendar />}
            required
            error={
              errors.billingDate
            }
          />


          {/* DUE DATE */}

          <InputField
            label="Due Date"
            name="dueDate"
            value={
              formData.dueDate
            }
            onChange={handleChange}
            type="date"
            icon={<FiCalendar />}
          />


          {/* AMOUNT */}

          <InputField
            label="Amount"
            name="amount"
            value={
              formData.amount
            }
            onChange={handleChange}
            type="number"
            placeholder="Enter amount"
            icon={<FiDollarSign />}
            required
            error={errors.amount}
          />


          {/* DISCOUNT */}

          <InputField
            label="Discount"
            name="discount"
            value={
              formData.discount
            }
            onChange={handleChange}
            type="number"
            placeholder="0"
            icon={<FiPercent />}
            error={
              errors.discount
            }
          />


          {/* PAYMENT METHOD */}

          <SelectField
            label="Payment Method"
            name="paymentMethod"
            value={
              formData.paymentMethod
            }
            onChange={handleChange}
          >

            <option value="Cash">
              Cash
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="Card">
              Card
            </option>

            <option value="Bank Transfer">
              Bank Transfer
            </option>

            <option value="Other">
              Other
            </option>

          </SelectField>


          {/* STATUS */}

          <SelectField
            label="Payment Status"
            name="status"
            value={
              formData.status
            }
            onChange={handleChange}
          >

            <option value="Paid">
              Paid
            </option>

            <option value="Pending">
              Pending
            </option>

          </SelectField>

        </div>

      </section>


      {/* =================================================
          SELECTED MEMBER
      ================================================= */}

      {selectedMember && (

        <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-sm font-bold text-green-400">

              {getInitials(
                getMemberName(
                  selectedMember
                )
              )}

            </div>


            <div className="min-w-0">

              <p className="text-xs text-slate-600">
                Selected Member
              </p>

              <h3 className="mt-1 truncate text-base font-semibold text-white">

                {getMemberName(
                  selectedMember
                )}

              </h3>

              <p className="mt-1 text-xs text-slate-500">

                {getMemberPhone(
                  selectedMember
                ) ||
                  "No phone number"}

              </p>

            </div>

          </div>

        </section>

      )}


      {/* =================================================
          BILL SUMMARY
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">


        <div className="border-b border-white/10 px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

              <FiCreditCard />

            </div>


            <div>

              <h2 className="text-sm font-semibold text-white">
                Updated Bill Summary
              </h2>

              <p className="mt-0.5 text-xs text-slate-600">
                Review the updated amount.
              </p>

            </div>

          </div>

        </div>


        <div className="p-5 sm:p-6">

          <div className="space-y-4">


            <SummaryRow
              label="Membership Plan"
              value={
                formData.plan ||
                "Not selected"
              }
            />


            <SummaryRow
              label="Base Amount"
              value={formatCurrency(
                baseAmount
              )}
            />


            <SummaryRow
              label={`Discount (${discountPercent}%)`}
              value={`- ${formatCurrency(
                discountAmount
              )}`}
            />


            <div className="border-t border-white/10 pt-4">

              <div className="flex items-center justify-between gap-4">

                <span className="text-sm font-semibold text-white">

                  Total Amount

                </span>


                <span className="text-2xl font-bold text-green-400">

                  {formatCurrency(
                    finalAmount
                  )}

                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          NOTES
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

        <label className="mb-2 block text-sm font-medium text-slate-300">

          Notes

        </label>


        <textarea
          name="notes"
          value={
            formData.notes
          }
          onChange={
            handleChange
          }
          rows="4"
          placeholder="Add notes about this payment..."
          className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-green-500/40"
        />

      </section>


      {/* =================================================
          ERROR
      ================================================= */}

      {errors.submit && (

        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] px-4 py-3 text-sm text-red-400">

          {errors.submit}

        </div>

      )}


      {/* =================================================
          BUTTONS
      ================================================= */}

      <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">


        <Link
          href="/dashboard/billing"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >

          <FiX />

          Cancel

        </Link>


        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {saving ? (
            <>
              <FiRefreshCw className="animate-spin" />

              Saving...
            </>
          ) : (
            <>
              <FiSave />

              Save Changes
            </>
          )}

        </button>

      </div>

    </div>
  );
}


/* =====================================================
   INPUT FIELD
===================================================== */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon,
  error,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-slate-300">

        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}

      </label>


      <div className="relative">

        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">

            {icon}

          </span>
        )}


        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border ${
            error
              ? "border-red-500/50"
              : "border-white/10"
          } bg-[#0B0F14] ${
            icon
              ? "pl-10"
              : "px-4"
          } py-3 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-green-500/40`}
        />

      </div>


      {error && (
        <p className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}

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
  children,
  required = false,
  error,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-slate-300">

        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}

      </label>


      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border ${
          error
            ? "border-red-500/50"
            : "border-white/10"
        } bg-[#0B0F14] px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-green-500/40`}
      >

        {children}

      </select>


      {error && (
        <p className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}

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
    <div className="flex items-center justify-between gap-4">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-medium text-slate-300">
        {value}
      </span>

    </div>
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