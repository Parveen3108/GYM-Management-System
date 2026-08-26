"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  FiPlus,
  FiSearch,
  FiPackage,
  FiDollarSign,
  FiAlertTriangle,
  FiEdit,
  FiTrash2,
  FiEye,
  FiFilter,
  FiRefreshCw,
  FiBox,
} from "react-icons/fi";

export default function SupplementsPage() {
  const [supplements, setSupplements] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [stockFilter, setStockFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);


  /* =====================================================
     LOAD SUPPLEMENTS
  ===================================================== */

  useEffect(() => {
    loadSupplements();
  }, []);


  const loadSupplements = () => {
    try {
      const storedData =
        localStorage.getItem(
          "gym_supplements"
        );

      if (!storedData) {
        setSupplements([]);
        setLoading(false);
        return;
      }

      const parsed =
        JSON.parse(storedData);

      if (Array.isArray(parsed)) {
        setSupplements(parsed);
      } else {
        setSupplements([]);
      }

    } catch (error) {
      console.error(
        "Supplement loading error:",
        error
      );

      setSupplements([]);

    } finally {
      setLoading(false);
    }
  };


  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = useMemo(() => {

    const values =
      supplements
        .map(
          (item) =>
            item.category
        )
        .filter(Boolean);

    return [
      "All",
      ...new Set(values),
    ];

  }, [supplements]);


  /* =====================================================
     FILTER PRODUCTS
  ===================================================== */

  const filteredSupplements =
    useMemo(() => {

      let result = [
        ...supplements,
      ];


      /* SEARCH */

      if (search.trim()) {

        const text =
          search.toLowerCase();

        result =
          result.filter(
            (item) => {

              const name =
                String(
                  item.name || ""
                ).toLowerCase();

              const category =
                String(
                  item.category || ""
                ).toLowerCase();

              const brand =
                String(
                  item.brand || ""
                ).toLowerCase();

              return (
                name.includes(text) ||
                category.includes(text) ||
                brand.includes(text)
              );
            }
          );
      }


      /* CATEGORY */

      if (
        categoryFilter !==
        "All"
      ) {

        result =
          result.filter(
            (item) =>
              item.category ===
              categoryFilter
          );
      }


      /* STOCK */

      if (
        stockFilter !==
        "All"
      ) {

        result =
          result.filter(
            (item) => {

              const stock =
                Number(
                  item.stock || 0
                );

              if (
                stockFilter ===
                "In Stock"
              ) {
                return stock > 10;
              }

              if (
                stockFilter ===
                "Low Stock"
              ) {
                return (
                  stock > 0 &&
                  stock <= 10
                );
              }

              if (
                stockFilter ===
                "Out of Stock"
              ) {
                return stock <= 0;
              }

              return true;
            }
          );
      }


      return result;

    }, [
      supplements,
      search,
      categoryFilter,
      stockFilter,
    ]);


  /* =====================================================
     STATS
  ===================================================== */

  const totalProducts =
    supplements.length;


  const totalStock =
    supplements.reduce(
      (total, item) =>
        total +
        Number(
          item.stock || 0
        ),
      0
    );


  const lowStock =
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
    ).length;


  const outOfStock =
    supplements.filter(
      (item) =>
        Number(
          item.stock || 0
        ) <= 0
    ).length;


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


  /* =====================================================
     DELETE SUPPLEMENT
  ===================================================== */

  const handleDelete =
    (id) => {

      const product =
        supplements.find(
          (item) =>
            String(item.id) ===
            String(id)
        );


      if (!product) {
        return;
      }


      const confirmed =
        window.confirm(
          `Delete ${product.name}?`
        );


      if (!confirmed) {
        return;
      }


      try {

        const updated =
          supplements.filter(
            (item) =>
              String(item.id) !==
              String(id)
          );


        localStorage.setItem(
          "gym_supplements",
          JSON.stringify(
            updated
          )
        );


        setSupplements(updated);


        alert(
          "Supplement deleted successfully!"
        );

      } catch (error) {

        console.error(
          "Delete supplement error:",
          error
        );

        alert(
          "Unable to delete supplement."
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

          Loading supplements...

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

            <Link
              href="/dashboard"
              className="transition hover:text-green-400"
            >
              Dashboard
            </Link>

            <span>/</span>

            <span className="text-slate-400">
              Supplements
            </span>

          </div>


          <h1 className="text-2xl font-bold text-white sm:text-3xl">

            Supplements

          </h1>


          <p className="mt-1 text-sm text-slate-500">

            Manage gym supplement inventory.

          </p>

        </div>


        <Link
          href="/dashboard/supplements/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400"
        >

          <FiPlus />

          Add Supplement

        </Link>

      </div>


      {/* =================================================
          STATS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">


        <InventoryStat
          icon={<FiPackage />}
          label="Products"
          value={
            totalProducts
          }
        />


        <InventoryStat
          icon={<FiBox />}
          label="Total Stock"
          value={
            totalStock
          }
          type="green"
        />


        <InventoryStat
          icon={<FiAlertTriangle />}
          label="Low Stock"
          value={
            lowStock
          }
          type="yellow"
        />


        <InventoryStat
          icon={<FiAlertTriangle />}
          label="Out of Stock"
          value={
            outOfStock
          }
          type="red"
        />


        <InventoryStat
          icon={<FiDollarSign />}
          label="Inventory Value"
          value={formatCurrency(
            inventoryValue
          )}
          type="green"
        />

      </div>


      {/* =================================================
          FILTER BAR
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
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search supplement..."
              className="w-full rounded-xl border border-white/10 bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-green-500/40"
            />

          </div>


          {/* FILTERS */}

          <div className="flex flex-wrap gap-2">


            <div className="flex items-center gap-2 text-xs text-slate-600">

              <FiFilter />

              Filter

            </div>


            {/* CATEGORY */}

            <select
              value={
                categoryFilter
              }
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
              className="rounded-lg border border-white/10 bg-[#0B0F14] px-3 py-2 text-xs text-slate-400 outline-none focus:border-green-500/40"
            >

              {categories.map(
                (category) => (

                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>

                )
              )}

            </select>


            {/* STOCK */}

            <select
              value={
                stockFilter
              }
              onChange={(e) =>
                setStockFilter(
                  e.target.value
                )
              }
              className="rounded-lg border border-white/10 bg-[#0B0F14] px-3 py-2 text-xs text-slate-400 outline-none focus:border-green-500/40"
            >

              <option value="All">
                All Stock
              </option>

              <option value="In Stock">
                In Stock
              </option>

              <option value="Low Stock">
                Low Stock
              </option>

              <option value="Out of Stock">
                Out of Stock
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* =================================================
          PRODUCTS
      ================================================= */}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#121821]">


        {/* HEADER */}

        <div className="border-b border-white/10 px-5 py-4 sm:px-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-sm font-semibold text-white">

                Supplement Inventory

              </h2>


              <p className="mt-1 text-xs text-slate-600">

                {filteredSupplements.length}
                {" "}
                products found

              </p>

            </div>

          </div>

        </div>


        {/* EMPTY */}

        {filteredSupplements.length === 0 ? (

          <div className="px-6 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] text-slate-600">

              <FiPackage className="text-2xl" />

            </div>


            <h3 className="mt-5 text-lg font-semibold text-white">

              No Supplements Found

            </h3>


            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">

              {supplements.length === 0
                ? "Add your first supplement to start managing inventory."
                : "No supplements match your current search or filters."}

            </p>


            {supplements.length === 0 && (

              <Link
                href="/dashboard/supplements/add"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black"
              >

                <FiPlus />

                Add First Supplement

              </Link>

            )}

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead>

                <tr className="border-b border-white/5 text-left">

                  <th className="px-5 py-4 text-xs font-semibold text-slate-600 sm:px-6">

                    Product

                  </th>


                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">

                    Category

                  </th>


                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">

                    Price

                  </th>


                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">

                    Stock

                  </th>


                  <th className="px-5 py-4 text-xs font-semibold text-slate-600">

                    Status

                  </th>


                  <th className="px-5 py-4 text-right text-xs font-semibold text-slate-600 sm:px-6">

                    Actions

                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-white/5">

                {filteredSupplements.map(
                  (product) => {

                    const stock =
                      Number(
                        product.stock ||
                        0
                      );


                    return (

                      <tr
                        key={
                          product.id
                        }
                        className="transition hover:bg-white/[0.015]"
                      >


                        {/* PRODUCT */}

                        <td className="px-5 py-4 sm:px-6">

                          <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-green-500/10 text-green-400">

                              {product.image ? (

                                <img
                                  src={
                                    product.image
                                  }
                                  alt={
                                    product.name ||
                                    "Supplement"
                                  }
                                  className="h-full w-full object-cover"
                                />

                              ) : (

                                <FiPackage />

                              )}

                            </div>


                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-white">

                                {product.name ||
                                  "Unnamed Product"}

                              </p>


                              <p className="mt-1 truncate text-xs text-slate-600">

                                {product.brand ||
                                  "No brand"}

                              </p>

                            </div>

                          </div>

                        </td>


                        {/* CATEGORY */}

                        <td className="px-5 py-4">

                          <span className="rounded-lg bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">

                            {product.category ||
                              "Other"}

                          </span>

                        </td>


                        {/* PRICE */}

                        <td className="px-5 py-4">

                          <span className="text-sm font-semibold text-white">

                            {formatCurrency(
                              product.price
                            )}

                          </span>

                        </td>


                        {/* STOCK */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/5">

                              <div
                                className={`h-full rounded-full ${
                                  stock <= 0
                                    ? "w-0 bg-red-500"
                                    : stock <= 10
                                      ? "w-1/3 bg-yellow-400"
                                      : "w-full bg-green-500"
                                }`}
                              />

                            </div>


                            <span className="text-sm text-slate-400">

                              {stock}

                            </span>

                          </div>

                        </td>


                        {/* STATUS */}

                        <td className="px-5 py-4">

                          <StockStatus
                            stock={
                              stock
                            }
                          />

                        </td>


                        {/* ACTIONS */}

                        <td className="px-5 py-4 sm:px-6">

                          <div className="flex justify-end gap-2">


                            <Link
                              href={`/dashboard/supplements/${product.id}`}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] text-slate-500 transition hover:bg-green-500/10 hover:text-green-400"
                              title="View"
                            >

                              <FiEye />

                            </Link>


                            <Link
                              href={`/dashboard/supplements/${product.id}/edit`}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] text-slate-500 transition hover:bg-blue-500/10 hover:text-blue-400"
                              title="Edit"
                            >

                              <FiEdit />

                            </Link>


                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  product.id
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                              title="Delete"
                            >

                              <FiTrash2 />

                            </button>

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
   INVENTORY STAT
===================================================== */

function InventoryStat({
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
   STOCK STATUS
===================================================== */

function StockStatus({
  stock,
}) {

  if (stock <= 0) {

    return (
      <span className="inline-flex rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">

        Out of Stock

      </span>
    );

  }


  if (stock <= 10) {

    return (
      <span className="inline-flex rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">

        Low Stock

      </span>
    );

  }


  return (
    <span className="inline-flex rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">

      In Stock

    </span>
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