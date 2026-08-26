"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiUser,
  FiCamera,
  FiUploadCloud,
  FiCreditCard,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiShield,
  FiSave,
  FiX,
} from "react-icons/fi";

export default function CreateMemberPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    emergencyContact: "",
    plan: "Premium",
    joinDate: new Date().toISOString().split("T")[0],
    paymentMethod: "",
    notes: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10 digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact =
        "Emergency contact is required";
    }

    if (!formData.plan) {
      newErrors.plan = "Please select membership plan";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod =
        "Please select payment method";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    /*
      Abhi frontend demo hai.

      Future me yahan:
      Firebase / MongoDB / API
      ke andar member save karenge.
    */

    console.log("Member Data:", formData);
    console.log("Member Photo:", photo);

    alert("Member created successfully!");

    router.push("/dashboard/members");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          {/* Breadcrumb */}
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">

            <Link
              href="/dashboard"
              className="transition hover:text-green-400"
            >
              Dashboard
            </Link>

            <span>/</span>

            <Link
              href="/dashboard/members"
              className="transition hover:text-green-400"
            >
              Members
            </Link>

            <span>/</span>

            <span className="text-slate-400">
              Create Member
            </span>

          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Create New Member
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Add a new member to your gym.
          </p>

        </div>

        <Link
          href="/dashboard/members"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >
          <FiArrowLeft />
          Back to Members
        </Link>

      </div>


      {/* ================= FORM ================= */}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ================= PERSONAL INFORMATION ================= */}

        <section className="rounded-2xl border border-white/10 bg-[#121821]">

          <SectionHeader
            icon={<FiUser />}
            title="Personal Information"
            description="Basic information about the gym member"
          />

          <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">

            {/* Full Name */}
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              error={errors.name}
            />

            {/* Phone */}
            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10 digit phone number"
              required
              type="tel"
              icon={<FiPhone />}
              error={errors.phone}
            />

            {/* Email */}
            <InputField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              type="email"
              icon={<FiMail />}
              error={errors.email}
            />

            {/* Gender */}
            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              error={errors.gender}
            >
              <option value="">
                Select gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </SelectField>

            {/* Date of Birth */}
            <InputField
              label="Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              type="date"
              icon={<FiCalendar />}
              error={errors.dob}
            />

          </div>

        </section>


        {/* ================= PROFILE PHOTO ================= */}

        <section className="rounded-2xl border border-white/10 bg-[#121821]">

          <SectionHeader
            icon={<FiCamera />}
            title="Profile Photo"
            description="Upload a profile photo for this member"
          />

          <div className="p-5 sm:p-6">

            <div className="flex flex-col items-center gap-6 sm:flex-row">

              {/* Upload Box */}
              <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] transition hover:border-green-500/40 hover:bg-green-500/[0.02] sm:w-72">

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handlePhotoChange}
                  className="hidden"
                />

                <FiUploadCloud className="text-4xl text-slate-500" />

                <p className="mt-3 text-sm font-medium text-slate-300">
                  Click to upload photo
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  PNG, JPG up to 2MB
                </p>

              </label>


              {/* Preview */}
              <div className="flex flex-col items-center gap-3">

                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-green-500/20 bg-white/[0.03]">

                  {preview ? (
                    <img
                      src={preview}
                      alt="Member preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-5xl text-slate-600" />
                  )}

                </div>

                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null);
                      setPreview(null);
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove Photo
                  </button>
                )}

              </div>

            </div>

          </div>

        </section>


        {/* ================= MEMBERSHIP ================= */}

        <section className="rounded-2xl border border-white/10 bg-[#121821]">

          <SectionHeader
            icon={<FiCreditCard />}
            title="Membership Information"
            description="Membership and payment details"
          />

          <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-3">

            {/* Plan */}
            <SelectField
              label="Membership Plan"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              required
              error={errors.plan}
            >
              <option value="Premium">
                Premium - ₹2500
              </option>

              <option value="Standard">
                Standard - ₹1500
              </option>

              <option value="Basic">
                Basic - ₹1000
              </option>
            </SelectField>


            {/* Join Date */}
            <InputField
              label="Join Date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              required
              type="date"
              icon={<FiCalendar />}
            />


            {/* Payment */}
            <SelectField
              label="Payment Method"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              error={errors.paymentMethod}
            >
              <option value="">
                Select payment method
              </option>

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
            </SelectField>

          </div>

        </section>


        {/* ================= ADDITIONAL INFORMATION ================= */}

        <section className="rounded-2xl border border-white/10 bg-[#121821]">

          <SectionHeader
            icon={<FiShield />}
            title="Additional Information"
            description="More details about the member"
          />

          <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-3">

            {/* Address */}
            <div className="lg:col-span-1">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Address
                <span className="ml-1 text-red-400">*</span>
              </label>

              <div className="relative">

                <FiMapPin className="absolute left-3 top-3 text-slate-600" />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter full address"
                  className={`w-full resize-none rounded-xl border ${
                    errors.address
                      ? "border-red-500/50"
                      : "border-white/10"
                  } bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-green-500/40`}
                />

              </div>

              {errors.address && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.address}
                </p>
              )}

            </div>


            {/* Emergency Contact */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Emergency Contact
                <span className="ml-1 text-red-400">*</span>
              </label>

              <InputField
                label=""
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Emergency contact number"
                type="tel"
                error={errors.emergencyContact}
              />

            </div>


            {/* Notes */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Additional notes about member..."
                className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-green-500/40"
              />

            </div>

          </div>

        </section>


        {/* ================= ACTIONS ================= */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <Link
            href="/dashboard/members"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
          >
            <FiX />
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400"
          >
            <FiSave />
            Save Member
          </button>

        </div>

      </form>

    </div>
  );
}


/* =====================================================
   SECTION HEADER
===================================================== */

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
        {icon}
      </div>

      <div>

        <h2 className="text-sm font-semibold text-white">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-slate-600">
          {description}
        </p>

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

      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-300">

          {label}

          {required && (
            <span className="ml-1 text-red-400">
              *
            </span>
          )}

        </label>
      )}

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
            icon ? "pl-10" : "px-4"
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