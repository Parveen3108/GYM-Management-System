"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiAward,
  FiCreditCard,
  FiCamera,
  FiUploadCloud,
  FiSave,
  FiX,
} from "react-icons/fi";

export default function CreateTrainerPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    specialization: "",
    experience: "",
    qualification: "",
    joiningDate: "",
    salary: "",
    shift: "",
    status: "Active",
    bio: "",
  });

  const [preview, setPreview] = useState("");

  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =====================================================
     PHOTO
  ===================================================== */

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        photo: "Please select an image.",
      }));

      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        photo: "Image must be smaller than 2MB.",
      }));

      return;
    }

    setErrors((prev) => ({
      ...prev,
      photo: "",
    }));

    setPreview(URL.createObjectURL(file));
  };

  /* =====================================================
     VALIDATE
     
     ONLY THESE ARE REQUIRED:
     name
     phone
     specialization
     experience
     joiningDate
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (
      !/^[0-9]{10}$/.test(
        formData.phone.trim()
      )
    ) {
      newErrors.phone =
        "Enter a valid 10 digit phone number.";
    }

    if (!formData.specialization) {
      newErrors.specialization =
        "Select specialization.";
    }

    if (!formData.experience) {
      newErrors.experience =
        "Select experience.";
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate =
        "Select joining date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     SAVE TRAINER

     IMPORTANT:
     This function is called DIRECTLY by button.
  ===================================================== */

  const handleSaveTrainer = () => {
    console.log(
      "========== SAVE TRAINER =========="
    );

    /* -----------------------------------------------
       VALIDATION
    ------------------------------------------------ */

    if (!validateForm()) {
      console.log(
        "Validation failed:",
        formData
      );

      return;
    }

    setSaving(true);

    try {
      /* -----------------------------------------------
         BROWSER CHECK
      ------------------------------------------------ */

      if (typeof window === "undefined") {
        throw new Error(
          "Browser storage is not available."
        );
      }

      /* -----------------------------------------------
         GET EXISTING TRAINERS
      ------------------------------------------------ */

      let existingTrainers = [];

      const existingData =
        window.localStorage.getItem(
          "gym_trainers"
        );

      console.log(
        "Existing data:",
        existingData
      );

      if (existingData) {
        try {
          const parsed =
            JSON.parse(existingData);

          if (Array.isArray(parsed)) {
            existingTrainers = parsed;
          }
        } catch (error) {
          console.error(
            "Old storage JSON error:",
            error
          );

          existingTrainers = [];
        }
      }

      /* -----------------------------------------------
         UNIQUE ID
      ------------------------------------------------ */

      const newId =
        Date.now().toString();

      /* -----------------------------------------------
         AVATAR
      ------------------------------------------------ */

      const avatar =
        formData.name
          .trim()
          .split(/\s+/)
          .map((word) =>
            word.charAt(0)
          )
          .join("")
          .slice(0, 2)
          .toUpperCase() || "TR";

      /* -----------------------------------------------
         NEW TRAINER

         EXACT FIELDS USED BY TRAINER LIST
      ------------------------------------------------ */

      const newTrainer = {
        id: newId,

        name:
          formData.name.trim(),

        phone:
          formData.phone.trim(),

        email:
          formData.email.trim(),

        specialization:
          formData.specialization,

        experience:
          formData.experience,

        members: 0,

        joiningDate:
          formData.joiningDate,

        status:
          formData.status || "Active",

        avatar,

        /* Extra details */

        gender:
          formData.gender,

        dob:
          formData.dob,

        address:
          formData.address.trim(),

        qualification:
          formData.qualification.trim(),

        salary:
          formData.salary
            ? Number(formData.salary)
            : 0,

        shift:
          formData.shift,

        bio:
          formData.bio.trim(),

        createdAt:
          new Date().toISOString(),
      };

      console.log(
        "New trainer:",
        newTrainer
      );

      /* -----------------------------------------------
         ADD NEW TRAINER TO EXISTING ARRAY
      ------------------------------------------------ */

      const finalTrainers = [
        ...existingTrainers,
        newTrainer,
      ];

      console.log(
        "Final trainers:",
        finalTrainers
      );

      /* -----------------------------------------------
         SAVE TO LOCAL STORAGE
      ------------------------------------------------ */

      window.localStorage.setItem(
        "gym_trainers",
        JSON.stringify(finalTrainers)
      );

      /* -----------------------------------------------
         IMMEDIATELY CHECK STORAGE
      ------------------------------------------------ */

      const savedData =
        window.localStorage.getItem(
          "gym_trainers"
        );

      console.log(
        "AFTER SAVE:",
        savedData
      );

      if (!savedData) {
        throw new Error(
          "Data was not written to Local Storage."
        );
      }

      /* -----------------------------------------------
         CHECK PARSED DATA
      ------------------------------------------------ */

      const checkData =
        JSON.parse(savedData);

      if (
        !Array.isArray(checkData) ||
        !checkData.some(
          (trainer) =>
            String(trainer.id) ===
            String(newId)
        )
      ) {
        throw new Error(
          "Trainer verification failed."
        );
      }

      console.log(
        "TRAINER SAVED SUCCESSFULLY"
      );

      /* -----------------------------------------------
         SUCCESS
      ------------------------------------------------ */

      alert(
        "Trainer added successfully!"
      );

      /* -----------------------------------------------
         GO TO LIST
      ------------------------------------------------ */

      router.push(
        "/dashboard/trainers"
      );

    } catch (error) {
      console.error(
        "SAVE TRAINER ERROR:",
        error
      );

      setErrors({
        submit:
          error.message ||
          "Unable to save trainer.",
      });

      setSaving(false);
    }
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

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
              Add Trainer
            </span>

          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Add Trainer
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Add a new trainer to your gym.
          </p>

        </div>

        <Link
          href="/dashboard/trainers"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >
          <FiArrowLeft />

          Back to Trainers

        </Link>

      </div>


      {/* =================================================
          PERSONAL INFORMATION
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <SectionHeader
          icon={<FiUser />}
          title="Personal Information"
          description="Basic information about the trainer"
        />

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">

          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter trainer name"
            required
            error={errors.name}
          />

          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10 digit phone number"
            type="tel"
            icon={<FiPhone />}
            required
            error={errors.phone}
          />

          <InputField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            type="email"
            icon={<FiMail />}
          />

          <SelectField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
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

          <InputField
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            type="date"
            icon={<FiCalendar />}
          />

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Address
            </label>

            <div className="relative">

              <FiMapPin className="absolute left-3 top-3 text-slate-600" />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter trainer address"
                className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-green-500/40"
              />

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          PROFILE PHOTO
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <SectionHeader
          icon={<FiCamera />}
          title="Profile Photo"
          description="Upload trainer profile photo"
        />

        <div className="p-5 sm:p-6">

          <div className="flex flex-col items-center gap-6 sm:flex-row">

            <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-green-500/20 bg-white/[0.03]">

              {preview ? (
                <img
                  src={preview}
                  alt="Trainer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiUser className="text-4xl text-slate-600" />
              )}

            </div>

            <label className="flex w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-8 transition hover:border-green-500/40">

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <FiUploadCloud className="text-3xl text-slate-500" />

              <p className="mt-3 text-sm font-medium text-slate-300">
                Click to upload photo
              </p>

              <p className="mt-1 text-xs text-slate-600">
                JPG or PNG up to 2MB
              </p>

            </label>

          </div>

          {errors.photo && (
            <p className="mt-3 text-xs text-red-400">
              {errors.photo}
            </p>
          )}

        </div>

      </section>


      {/* =================================================
          PROFESSIONAL INFORMATION
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <SectionHeader
          icon={<FiBriefcase />}
          title="Professional Information"
          description="Trainer experience and expertise"
        />

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-3">

          <SelectField
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            error={errors.specialization}
          >

            <option value="">
              Select specialization
            </option>

            <option value="Strength Training">
              Strength Training
            </option>

            <option value="Cardio">
              Cardio
            </option>

            <option value="CrossFit">
              CrossFit
            </option>

            <option value="Weight Loss">
              Weight Loss
            </option>

            <option value="Yoga">
              Yoga
            </option>

            <option value="Bodybuilding">
              Bodybuilding
            </option>

            <option value="Personal Training">
              Personal Training
            </option>

          </SelectField>


          <SelectField
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            error={errors.experience}
          >

            <option value="">
              Select experience
            </option>

            <option value="1 Year">
              1 Year
            </option>

            <option value="2 Years">
              2 Years
            </option>

            <option value="3 Years">
              3 Years
            </option>

            <option value="4 Years">
              4 Years
            </option>

            <option value="5 Years">
              5 Years
            </option>

            <option value="6 Years">
              6 Years
            </option>

            <option value="7+ Years">
              7+ Years
            </option>

          </SelectField>


          <InputField
            label="Qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="e.g. B.P.Ed, ACE Certified"
            icon={<FiAward />}
          />


          <InputField
            label="Joining Date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            type="date"
            icon={<FiCalendar />}
            required
            error={errors.joiningDate}
          />

        </div>

      </section>


      {/* =================================================
          EMPLOYMENT
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <SectionHeader
          icon={<FiCreditCard />}
          title="Employment Information"
          description="Salary, shift and employment status"
        />

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-3">

          <InputField
            label="Monthly Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter monthly salary"
            type="number"
          />

          <SelectField
            label="Work Shift"
            name="shift"
            value={formData.shift}
            onChange={handleChange}
          >

            <option value="">
              Select shift
            </option>

            <option value="Morning">
              Morning
            </option>

            <option value="Afternoon">
              Afternoon
            </option>

            <option value="Evening">
              Evening
            </option>

            <option value="Full Day">
              Full Day
            </option>

          </SelectField>


          <SelectField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </SelectField>

        </div>

      </section>


      {/* =================================================
          ABOUT
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <SectionHeader
          icon={<FiAward />}
          title="About Trainer"
          description="Add a short description"
        />

        <div className="p-5 sm:p-6">

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="5"
            placeholder="Write something about the trainer..."
            className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-green-500/40"
          />

        </div>

      </section>


      {/* =================================================
          ERROR
      ================================================= */}

      {errors.submit && (

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">

          {errors.submit}

        </div>

      )}


      {/* =================================================
          BUTTONS
      ================================================= */}

      <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">

        <Link
          href="/dashboard/trainers"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >

          <FiX />

          Cancel

        </Link>


        {/* IMPORTANT:
            type="button"
            direct onClick
        */}

        <button
          type="button"
          onClick={handleSaveTrainer}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {saving ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />

              Saving...
            </>
          ) : (
            <>
              <FiSave />

              Save Trainer
            </>
          )}

        </button>

      </div>

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
   INPUT
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
   SELECT
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