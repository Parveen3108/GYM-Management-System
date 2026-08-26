"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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
  FiSave,
  FiX,
  FiLoader,
} from "react-icons/fi";

export default function EditTrainerPage() {
  const router = useRouter();
  const params = useParams();

  const trainerId = params?.id;

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

  const [trainer, setTrainer] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [notFound, setNotFound] = useState(false);

  const [errors, setErrors] = useState({});


  /* =====================================================
     LOAD TRAINER FROM LOCAL STORAGE
  ===================================================== */

  useEffect(() => {
    if (!trainerId) {
      return;
    }

    try {
      const storedData =
        localStorage.getItem("gym_trainers");

      if (!storedData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const trainers = JSON.parse(storedData);

      if (!Array.isArray(trainers)) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const foundTrainer = trainers.find(
        (item) =>
          String(item.id) ===
          String(trainerId)
      );

      if (!foundTrainer) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setTrainer(foundTrainer);

      setFormData({
        name: foundTrainer.name || "",

        phone: foundTrainer.phone || "",

        email: foundTrainer.email || "",

        gender: foundTrainer.gender || "",

        dob: foundTrainer.dob || "",

        address: foundTrainer.address || "",

        specialization:
          foundTrainer.specialization || "",

        experience:
          foundTrainer.experience || "",

        qualification:
          foundTrainer.qualification || "",

        joiningDate:
          foundTrainer.joiningDate || "",

        salary:
          foundTrainer.salary
            ? String(foundTrainer.salary)
            : "",

        shift:
          foundTrainer.shift || "",

        status:
          foundTrainer.status || "Active",

        bio:
          foundTrainer.bio || "",
      });

      setLoading(false);

    } catch (error) {
      console.error(
        "Error loading trainer:",
        error
      );

      setNotFound(true);
      setLoading(false);
    }
  }, [trainerId]);


  /* =====================================================
     HANDLE INPUT
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
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Name is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone is required.";
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
        "Joining date is required.";
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
      "========== UPDATE TRAINER =========="
    );

    if (!validateForm()) {
      return;
    }

    if (!trainer) {
      return;
    }

    setSaving(true);

    try {
      const storedData =
        localStorage.getItem(
          "gym_trainers"
        );

      if (!storedData) {
        throw new Error(
          "Trainer data not found."
        );
      }

      const trainers =
        JSON.parse(storedData);

      if (!Array.isArray(trainers)) {
        throw new Error(
          "Invalid trainer data."
        );
      }


      /* -----------------------------------------------
         CREATE UPDATED TRAINER
      ------------------------------------------------ */

      const updatedTrainer = {
        ...trainer,

        name:
          formData.name.trim(),

        phone:
          formData.phone.trim(),

        email:
          formData.email.trim(),

        gender:
          formData.gender,

        dob:
          formData.dob,

        address:
          formData.address.trim(),

        specialization:
          formData.specialization,

        experience:
          formData.experience,

        qualification:
          formData.qualification.trim(),

        joiningDate:
          formData.joiningDate,

        salary:
          formData.salary
            ? Number(formData.salary)
            : 0,

        shift:
          formData.shift,

        status:
          formData.status || "Active",

        bio:
          formData.bio.trim(),

        updatedAt:
          new Date().toISOString(),
      };


      /* -----------------------------------------------
         REPLACE ONLY SELECTED TRAINER
      ------------------------------------------------ */

      const updatedTrainers =
        trainers.map((item) => {

          if (
            String(item.id) ===
            String(trainerId)
          ) {
            return updatedTrainer;
          }

          return item;
        });


      /* -----------------------------------------------
         SAVE BACK TO LOCAL STORAGE
      ------------------------------------------------ */

      localStorage.setItem(
        "gym_trainers",
        JSON.stringify(
          updatedTrainers
        )
      );


      /* -----------------------------------------------
         VERIFY
      ------------------------------------------------ */

      const verifyData =
        localStorage.getItem(
          "gym_trainers"
        );

      if (!verifyData) {
        throw new Error(
          "Unable to save trainer."
        );
      }


      const verifyTrainers =
        JSON.parse(verifyData);

      const verifyTrainer =
        verifyTrainers.find(
          (item) =>
            String(item.id) ===
            String(trainerId)
        );


      if (!verifyTrainer) {
        throw new Error(
          "Trainer update verification failed."
        );
      }


      console.log(
        "TRAINER UPDATED:",
        verifyTrainer
      );


      /* -----------------------------------------------
         SUCCESS
      ------------------------------------------------ */

      alert(
        "Trainer updated successfully!"
      );


      router.push(
        "/dashboard/trainers"
      );

    } catch (error) {
      console.error(
        "UPDATE TRAINER ERROR:",
        error
      );

      setErrors({
        submit:
          error.message ||
          "Unable to update trainer.",
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

          <FiLoader className="animate-spin text-green-400" />

          Loading trainer...

        </div>

      </div>
    );
  }


  /* =====================================================
     NOT FOUND
  ===================================================== */

  if (notFound) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">

            <FiUser className="text-2xl" />

          </div>

          <h2 className="mt-4 text-lg font-semibold text-white">

            Trainer Not Found

          </h2>

          <p className="mt-2 text-sm text-slate-500">

            This trainer does not exist in Local Storage.

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
              Edit Trainer
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">

            Edit Trainer

          </h1>


          <p className="mt-1 text-sm text-slate-500">

            Update trainer information.

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
          TRAINER ID
      ================================================= */}

      <div className="rounded-xl border border-green-500/10 bg-green-500/[0.03] px-4 py-3">

        <div className="flex flex-wrap items-center gap-2 text-xs">

          <span className="text-slate-500">
            Editing Trainer:
          </span>

          <span className="font-semibold text-green-400">
            {trainer.name}
          </span>

          <span className="text-slate-600">
            •
          </span>

          <span className="text-slate-500">
            ID #{trainer.id}
          </span>

        </div>

      </div>


      {/* =================================================
          PERSONAL INFORMATION
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <SectionHeader
          icon={<FiUser />}
          title="Personal Information"
          description="Update basic trainer information"
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
          PROFESSIONAL INFORMATION
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <SectionHeader
          icon={<FiBriefcase />}
          title="Professional Information"
          description="Update trainer expertise"
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
          EMPLOYMENT INFORMATION
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <SectionHeader
          icon={<FiCreditCard />}
          title="Employment Information"
          description="Update salary and employment status"
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
          ABOUT TRAINER
      ================================================= */}

      <section className="rounded-2xl border border-white/10 bg-[#121821]">

        <SectionHeader
          icon={<FiAward />}
          title="About Trainer"
          description="Update trainer description"
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


        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {saving ? (
            <>
              <FiLoader className="animate-spin" />

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