"use client";

import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiSearch,
  FiCreditCard,
  FiCheckCircle,
} from "react-icons/fi";

const initialMemberships = [
  {
    id: 1,
    name: "Monthly",
    duration: 1,
    price: 1000,
    description: "Basic monthly gym membership",
    status: true,
  },
  {
    id: 2,
    name: "Quarterly",
    duration: 3,
    price: 2500,
    description: "3 months gym membership",
    status: true,
  },
  {
    id: 3,
    name: "Yearly",
    duration: 12,
    price: 8000,
    description: "Full year gym membership",
    status: true,
  },
];

export default function MembershipsPage() {
  const [memberships, setMemberships] = useState(initialMemberships);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
    description: "",
  });

  // =========================
  // Open Add Modal
  // =========================
  const handleAdd = () => {
    setEditingId(null);

    setFormData({
      name: "",
      duration: "",
      price: "",
      description: "",
    });

    setShowModal(true);
  };

  // =========================
  // Open Edit Modal
  // =========================
  const handleEdit = (membership) => {
    setEditingId(membership.id);

    setFormData({
      name: membership.name,
      duration: membership.duration,
      price: membership.price,
      description: membership.description,
    });

    setShowModal(true);
  };

  // =========================
  // Input Change
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Create / Update
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.duration || !formData.price) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      setMemberships((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formData.name,
                duration: Number(formData.duration),
                price: Number(formData.price),
                description: formData.description,
              }
            : item
        )
      );
    } else {
      const newMembership = {
        id: Date.now(),
        name: formData.name,
        duration: Number(formData.duration),
        price: Number(formData.price),
        description: formData.description,
        status: true,
      };

      setMemberships((prev) => [...prev, newMembership]);
    }

    setShowModal(false);

    setFormData({
      name: "",
      duration: "",
      price: "",
      description: "",
    });

    setEditingId(null);
  };

  // =========================
  // Delete
  // =========================
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this membership?"
    );

    if (!confirmDelete) return;

    setMemberships((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // =========================
  // Search
  // =========================
  const filteredMemberships = memberships.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // Stats
  // =========================
  const activePlans = memberships.filter(
    (item) => item.status
  ).length;

  const averagePrice =
    memberships.length > 0
      ? Math.round(
          memberships.reduce(
            (total, item) => total + item.price,
            0
          ) / memberships.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#090d12] text-white p-6">

      {/* ================= HEADER ================= */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-[#60738d]">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#00d084]">Memberships</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Memberships
          </h1>

          <p className="mt-1 text-sm text-[#718198]">
            Manage gym membership plans and pricing.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#00d084] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[#00d084]/10 transition hover:bg-[#00e894]"
        >
          <FiPlus size={18} />
          Add Membership
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">

        {/* Total Plans */}
        <div className="rounded-2xl border border-[#27313d] bg-[#111720] p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#687990]">
                Total Plans
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {memberships.length}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#17212c] text-[#00d084]">
              <FiCreditCard size={20} />
            </div>

          </div>
        </div>

        {/* Active Plans */}
        <div className="rounded-2xl border border-[#27313d] bg-[#111720] p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#687990]">
                Active Plans
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {activePlans}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#083728] text-[#00d084]">
              <FiCheckCircle size={20} />
            </div>

          </div>
        </div>

        {/* Average Price */}
        <div className="rounded-2xl border border-[#27313d] bg-[#111720] p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#687990]">
                Average Price
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                ₹{averagePrice}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#17212c] text-[#00d084]">
              ₹
            </div>

          </div>
        </div>

      </div>

      {/* ================= SEARCH ================= */}
      <div className="mb-6 rounded-2xl border border-[#27313d] bg-[#111720] p-4">

        <div className="relative max-w-md">

          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52647c]"
            size={18}
          />

          <input
            type="text"
            placeholder="Search membership..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#27313d] bg-[#0b1016] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-[#52647c] focus:border-[#00d084]"
          />

        </div>
      </div>

      {/* ================= MEMBERSHIP CARDS ================= */}
      {filteredMemberships.length === 0 ? (
        <div className="rounded-2xl border border-[#27313d] bg-[#111720] py-16 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#17212c] text-[#52647c]">
            <FiCreditCard size={24} />
          </div>

          <h2 className="text-lg font-semibold">
            No Memberships Found
          </h2>

          <p className="mt-1 text-sm text-[#65758c]">
            Create your first membership plan.
          </p>

        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {filteredMemberships.map((membership) => (
            <div
              key={membership.id}
              className="group rounded-2xl border border-[#27313d] bg-[#111720] p-6 transition hover:border-[#00d084]/40"
            >

              {/* Card Top */}
              <div className="flex items-start justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    {membership.name}
                  </h2>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#073526] px-3 py-1 text-xs font-medium text-[#00d084]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00d084]" />
                    Active
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold">
                    ₹{membership.price}
                  </p>

                  <p className="mt-1 text-xs text-[#65758c]">
                    {membership.duration}{" "}
                    {membership.duration === 1
                      ? "Month"
                      : "Months"}
                  </p>
                </div>

              </div>

              {/* Divider */}
              <div className="my-5 border-t border-[#27313d]" />

              {/* Description */}
              <p className="min-h-[48px] text-sm leading-6 text-[#75859a]">
                {membership.description ||
                  "No description available"}
              </p>

              {/* Duration */}
              <div className="mt-5 rounded-xl bg-[#0b1016] p-4">

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#65758c]">
                    Duration
                  </span>

                  <span className="text-sm font-semibold">
                    {membership.duration}{" "}
                    {membership.duration === 1
                      ? "Month"
                      : "Months"}
                  </span>
                </div>

              </div>

              {/* Buttons */}
              <div className="mt-5 flex gap-3">

                <button
                  onClick={() => handleEdit(membership)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2a3542] bg-[#151c25] px-4 py-2.5 text-sm font-medium text-[#a5b2c2] transition hover:border-[#00d084]/40 hover:text-white"
                >
                  <FiEdit2 size={15} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(membership.id)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                >
                  <FiTrash2 size={15} />
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-[#27313d] bg-[#111720] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#27313d] px-6 py-5">

              <div>
                <h2 className="text-xl font-bold">
                  {editingId
                    ? "Edit Membership"
                    : "Create Membership"}
                </h2>

                <p className="mt-1 text-xs text-[#65758c]">
                  Add membership plan details
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#18202a] text-[#718198] transition hover:text-white"
              >
                <FiX size={18} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#aab7c7]">
                  Membership Name
                  <span className="ml-1 text-[#00d084]">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Monthly"
                  className="w-full rounded-xl border border-[#2a3542] bg-[#0b1016] px-4 py-3 text-sm text-white outline-none placeholder:text-[#52647c] focus:border-[#00d084]"
                />
              </div>

              {/* Duration + Price */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#aab7c7]">
                    Duration (Months)
                    <span className="ml-1 text-[#00d084]">
                      *
                    </span>
                  </label>

                  <input
                    type="number"
                    name="duration"
                    min="1"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 1"
                    className="w-full rounded-xl border border-[#2a3542] bg-[#0b1016] px-4 py-3 text-sm text-white outline-none placeholder:text-[#52647c] focus:border-[#00d084]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#aab7c7]">
                    Price (₹)
                    <span className="ml-1 text-[#00d084]">
                      *
                    </span>
                  </label>

                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 1000"
                    className="w-full rounded-xl border border-[#2a3542] bg-[#0b1016] px-4 py-3 text-sm text-white outline-none placeholder:text-[#52647c] focus:border-[#00d084]"
                  />
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#aab7c7]">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter membership description..."
                  className="w-full resize-none rounded-xl border border-[#2a3542] bg-[#0b1016] px-4 py-3 text-sm text-white outline-none placeholder:text-[#52647c] focus:border-[#00d084]"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 border-t border-[#27313d] pt-5">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-[#2a3542] bg-[#151c25] px-4 py-3 text-sm font-medium text-[#9ba9ba] transition hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#00d084] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#00e894]"
                >
                  {editingId
                    ? "Update Membership"
                    : "Create Membership"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}