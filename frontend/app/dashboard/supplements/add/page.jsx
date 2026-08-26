"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiPackage,
  FiSave,
  FiX,
  FiRefreshCw,
  FiDollarSign,
  FiBox,
  FiTag,
  FiImage,
  FiFileText,
} from "react-icons/fi";

export default function AddSupplementPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);


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
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};


    if (!formData.name.trim()) {
      newErrors.name =
        "Product name is required.";
    }


    if (!formData.brand.trim()) {
      newErrors.brand =
        "Brand name is required.";
    }


    if (!formData.category) {
      newErrors.category =
        "Please select a category.";
    }


    if (!formData.price) {
      newErrors.price =
        "Price is required.";
    } else if (
      Number(formData.price) <= 0
    ) {
      newErrors.price =
        "Price must be greater than 0.";
    }


    if (
      formData.stock === ""
    ) {
      newErrors.stock =
        "Stock quantity is required.";
    } else if (
      Number(formData.stock) < 0
    ) {
      newErrors.stock =
        "Stock cannot be negative.";
    }


    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  /* =====================================================
     SAVE SUPPLEMENT
  ===================================================== */

  const handleSave = () => {

    console.log(
      "========== ADD SUPPLEMENT =========="
    );


    if (!validateForm()) {
      return;
    }


    setSaving(true);


    try {

      /* -----------------------------------------------
         GET EXISTING DATA
      ------------------------------------------------ */

      const storedData =
        localStorage.getItem(
          "gym_supplements"
        );


      let existingSupplements = [];


      if (storedData) {

        try {

          const parsed =
            JSON.parse(
              storedData
            );

          if (
            Array.isArray(
              parsed
            )
          ) {
            existingSupplements =
              parsed;
          }

        } catch (error) {

          console.error(
            "Existing supplement JSON error:",
            error
          );

        }
      }


      /* -----------------------------------------------
         UNIQUE ID
      ------------------------------------------------ */

      const supplementId =
        Date.now().toString();


      /* -----------------------------------------------
         CREATE PRODUCT
      ------------------------------------------------ */

      const newSupplement = {

        id:
          supplementId,

        name:
          formData.name.trim(),

        brand:
          formData.brand.trim(),

        category:
          formData.category,

        price:
          Number(
            formData.price
          ),

        stock:
          Number(
            formData.stock
          ),

        image:
          formData.image.trim(),

        description:
          formData.description.trim(),

        createdAt:
          new Date().toISOString(),

      };


      console.log(
        "New Supplement:",
        newSupplement
      );


      /* -----------------------------------------------
         ADD NEW PRODUCT
      ------------------------------------------------ */

      const updatedSupplements = [
        newSupplement,
        ...existingSupplements,
      ];


      /* -----------------------------------------------
         SAVE LOCAL STORAGE
      ------------------------------------------------ */

      localStorage.setItem(
        "gym_supplements",
        JSON.stringify(
          updatedSupplements
        )
      );


      /* -----------------------------------------------
         VERIFY
      ------------------------------------------------ */

      const verifyData =
        localStorage.getItem(
          "gym_supplements"
        );


      if (!verifyData) {
        throw new Error(
          "Supplement was not saved."
        );
      }


      const verifySupplements =
        JSON.parse(
          verifyData
        );


      const savedSupplement =
        verifySupplements.find(
          (item) =>
            String(item.id) ===
            String(
              supplementId
            )
        );


      if (!savedSupplement) {
        throw new Error(
          "Supplement save verification failed."
        );
      }


      console.log(
        "SUPPLEMENT SAVED SUCCESSFULLY:",
        savedSupplement
      );


      /* -----------------------------------------------
         SUCCESS
      ------------------------------------------------ */

      alert(
        "Supplement added successfully!"
      );


      router.push(
        "/dashboard/supplements"
      );


    } catch (error) {

      console.error(
        "ADD SUPPLEMENT ERROR:",
        error
      );


      setErrors({
        submit:
          error.message ||
          "Unable to add supplement.",
      });


      setSaving(false);
    }
  };


  /* =====================================================
     RESET
  ===================================================== */

  const handleReset = () => {

    const confirmed =
      window.confirm(
        "Clear all entered information?"
      );

    if (!confirmed) {
      return;
    }


    setFormData({
      name: "",
      brand: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      description: "",
    });


    setErrors({});
  };


  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="mx-auto max-w-5xl space-y-6">


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
              href="/dashboard/supplements"
              className="transition hover:text-green-400"
            >
              Supplements
            </Link>

            <span>/</span>

            <span className="text-slate-400">
              Add Supplement
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">

            Add Supplement

          </h1>


          <p className="mt-1 text-sm text-slate-500">

            Add a new product to your gym inventory.

          </p>

        </div>


        <Link
          href="/dashboard/supplements"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >

          <FiArrowLeft />

          Back to Supplements

        </Link>

      </div>


      {/* =================================================
          MAIN FORM
      ================================================= */}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#121821]">


        {/* FORM HEADER */}

        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

            <FiPackage />

          </div>


          <div>

            <h2 className="text-sm font-semibold text-white">

              Product Information

            </h2>


            <p className="mt-0.5 text-xs text-slate-600">

              Enter the supplement details below.

            </p>

          </div>

        </div>


        {/* FORM */}

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">


          {/* =================================================
              PRODUCT NAME
          ================================================= */}

          <InputField
            label="Product Name"
            name="name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            placeholder="e.g. Whey Protein"
            icon={<FiPackage />}
            required
            error={
              errors.name
            }
          />


          {/* =================================================
              BRAND
          ================================================= */}

          <InputField
            label="Brand"
            name="brand"
            value={
              formData.brand
            }
            onChange={
              handleChange
            }
            placeholder="e.g. MuscleBlaze"
            icon={<FiTag />}
            required
            error={
              errors.brand
            }
          />


          {/* =================================================
              CATEGORY
          ================================================= */}

          <SelectField
            label="Category"
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            required
            error={
              errors.category
            }
          >

            <option value="">
              Select category
            </option>

            <option value="Protein">
              Protein
            </option>

            <option value="Mass Gainer">
              Mass Gainer
            </option>

            <option value="Pre Workout">
              Pre Workout
            </option>

            <option value="BCAA">
              BCAA
            </option>

            <option value="Creatine">
              Creatine
            </option>

            <option value="Vitamins">
              Vitamins
            </option>

            <option value="Fat Burner">
              Fat Burner
            </option>

            <option value="Energy">
              Energy
            </option>

            <option value="Other">
              Other
            </option>

          </SelectField>


          {/* =================================================
              PRICE
          ================================================= */}

          <InputField
            label="Selling Price"
            name="price"
            value={
              formData.price
            }
            onChange={
              handleChange
            }
            type="number"
            placeholder="Enter price"
            icon={<FiDollarSign />}
            required
            error={
              errors.price
            }
          />


          {/* =================================================
              STOCK
          ================================================= */}

          <InputField
            label="Stock Quantity"
            name="stock"
            value={
              formData.stock
            }
            onChange={
              handleChange
            }
            type="number"
            placeholder="Enter quantity"
            icon={<FiBox />}
            required
            error={
              errors.stock
            }
          />


          {/* =================================================
              IMAGE URL
          ================================================= */}

          <InputField
            label="Product Image URL"
            name="image"
            value={
              formData.image
            }
            onChange={
              handleChange
            }
            placeholder="https://example.com/product.jpg"
            icon={<FiImage />}
          />


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div className="lg:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-300">

              Description

            </label>


            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              rows="5"
              placeholder="Enter product description..."
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-green-500/40"
            />

          </div>


        </div>

      </section>


      {/* =================================================
          PREVIEW
      ================================================= */}

      {(formData.name ||
        formData.brand ||
        formData.image) && (

        <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

              <FiImage />

            </div>


            <div>

              <h2 className="text-sm font-semibold text-white">

                Product Preview

              </h2>


              <p className="mt-0.5 text-xs text-slate-600">

                Preview how the product will look.

              </p>

            </div>

          </div>


          <div className="flex flex-col gap-5 rounded-2xl border border-white/5 bg-[#0B0F14] p-5 sm:flex-row">


            {/* IMAGE */}

            <div className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.03] sm:w-32">

              {formData.image ? (

                <img
                  src={
                    formData.image
                  }
                  alt={
                    formData.name ||
                    "Product"
                  }
                  className="h-full w-full object-cover"
                />

              ) : (

                <FiPackage className="text-3xl text-slate-700" />

              )}

            </div>


            {/* DETAILS */}

            <div className="min-w-0">

              <p className="text-xs text-slate-600">

                {formData.brand ||
                  "Brand"}

              </p>


              <h3 className="mt-1 text-lg font-bold text-white">

                {formData.name ||
                  "Product Name"}

              </h3>


              <p className="mt-2 text-sm text-slate-500">

                {formData.category ||
                  "Category"}

              </p>


              <div className="mt-4 flex flex-wrap gap-3">

                <span className="rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">

                  ₹
                  {Number(
                    formData.price
                  ).toLocaleString(
                    "en-IN"
                  ) || "0"}

                </span>


                <span className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-400">

                  Stock:{" "}

                  {formData.stock ||
                    0}

                </span>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* =================================================
          ERROR
      ================================================= */}

      {errors.submit && (

        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] px-4 py-3 text-sm text-red-400">

          {errors.submit}

        </div>

      )}


      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">


        <button
          type="button"
          onClick={
            handleReset
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
        >

          <FiRefreshCw />

          Reset

        </button>


        <Link
          href="/dashboard/supplements"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >

          <FiX />

          Cancel

        </Link>


        <button
          type="button"
          onClick={
            handleSave
          }
          disabled={
            saving
          }
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

              Save Supplement

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