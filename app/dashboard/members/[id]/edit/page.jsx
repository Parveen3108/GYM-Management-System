// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation";
// import {
//   FiArrowLeft,
//   FiUser,
//   FiCamera,
//   FiUploadCloud,
//   FiCreditCard,
//   FiPhone,
//   FiMail,
//   FiCalendar,
//   FiMapPin,
//   FiShield,
//   FiSave,
//   FiX,
// } from "react-icons/fi";

// /* =====================================================
//    DUMMY MEMBER DATA
//    Later Firebase / MongoDB se replace karenge
// ===================================================== */

// const membersData = {
//   1: {
//     id: 1,
//     name: "Aman Kumar",
//     phone: "9876543210",
//     email: "aman.kumar@gmail.com",
//     gender: "Male",
//     dob: "1998-05-12",
//     address: "Hansi, Haryana",
//     emergencyContact: "9876501234",

//     plan: "Premium",
//     joinDate: "2026-08-19",
//     expiryDate: "2026-09-19",
//     paymentMethod: "UPI",
//     amount: "2500",
//     status: "Active",

//     diet: "High Protein Diet",
//     workout: "Upper Body Strength",

//     notes: "Prefers morning workout sessions.",

//     initials: "AK",
//   },

//   2: {
//     id: 2,
//     name: "Rahul Sharma",
//     phone: "9123456780",
//     email: "rahul.sharma@gmail.com",
//     gender: "Male",
//     dob: "1997-03-20",
//     address: "Hisar, Haryana",
//     emergencyContact: "9876543210",

//     plan: "Standard",
//     joinDate: "2026-08-18",
//     expiryDate: "2026-09-18",
//     paymentMethod: "Cash",
//     amount: "1500",
//     status: "Active",

//     diet: "Balanced Diet",
//     workout: "Full Body Workout",

//     notes: "Focus on weight loss.",

//     initials: "RS",
//   },

//   3: {
//     id: 3,
//     name: "Vikas Singh",
//     phone: "9988776655",
//     email: "vikas.singh@gmail.com",
//     gender: "Male",
//     dob: "1999-01-15",
//     address: "Rohtak, Haryana",
//     emergencyContact: "9988776655",

//     plan: "Basic",
//     joinDate: "2026-08-17",
//     expiryDate: "2026-09-17",
//     paymentMethod: "Card",
//     amount: "1000",
//     status: "Active",

//     diet: "Normal Diet",
//     workout: "Beginner Workout",

//     notes: "New gym member.",

//     initials: "VS",
//   },
// };

// export default function EditMemberPage() {
//   const params = useParams();
//   const router = useRouter();

//   const id = params.id;

//   const [formData, setFormData] = useState(null);
// const [loading, setLoading] = useState(true);
// const [notFound, setNotFound] = useState(false);

//   const [photo, setPhoto] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const [errors, setErrors] = useState({});

//   /* =====================================================
//      LOAD MEMBER DATA
//   ===================================================== */

// useEffect(() => {
//   if (!id) {
//     setLoading(false);
//     setNotFound(true);
//     return;
//   }

//   const member = membersData[id];

//   if (member) {
//     setFormData({ ...member });
//     setNotFound(false);
//   } else {
//     setNotFound(true);
//   }

//   setLoading(false);
// }, [id]);
//   /* =====================================================
//      HANDLE INPUT
//   ===================================================== */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   /* =====================================================
//      HANDLE PHOTO
//   ===================================================== */

//   const handlePhotoChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       alert("Image size must be less than 2MB.");
//       return;
//     }

//     setPhoto(file);

//     const imageUrl = URL.createObjectURL(file);

//     setPreview(imageUrl);
//   };

//   /* =====================================================
//      VALIDATION
//   ===================================================== */

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Full name is required";
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^[0-9]{10}$/.test(formData.phone)) {
//       newErrors.phone =
//         "Phone number must contain 10 digits";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
//     ) {
//       newErrors.email =
//         "Enter a valid email address";
//     }

//     if (!formData.gender) {
//       newErrors.gender = "Gender is required";
//     }

//     if (!formData.dob) {
//       newErrors.dob =
//         "Date of birth is required";
//     }

//     if (!formData.address.trim()) {
//       newErrors.address =
//         "Address is required";
//     }

//     if (!formData.emergencyContact.trim()) {
//       newErrors.emergencyContact =
//         "Emergency contact is required";
//     }

//     if (!formData.plan) {
//       newErrors.plan =
//         "Membership plan is required";
//     }

//     if (!formData.joinDate) {
//       newErrors.joinDate =
//         "Join date is required";
//     }

//     if (!formData.expiryDate) {
//       newErrors.expiryDate =
//         "Expiry date is required";
//     }

//     if (!formData.paymentMethod) {
//       newErrors.paymentMethod =
//         "Payment method is required";
//     }

//     if (!formData.amount) {
//       newErrors.amount =
//         "Payment amount is required";
//     }

//     if (!formData.status) {
//       newErrors.status =
//         "Status is required";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   /* =====================================================
//      UPDATE MEMBER
//   ===================================================== */

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     /*
//       Abhi dummy data use ho raha hai.

//       Future:
//       Firebase / MongoDB / API
//       me update request jayegi.
//     */

//     console.log("Updated Member:", formData);
//     console.log("Updated Photo:", photo);

//     alert("Member updated successfully!");

//     router.push(`/dashboard/members/${id}`);
//   };

//   /* =====================================================
//      LOADING
//   ===================================================== */

//  if (loading) {
//   return (
//     <div className="flex min-h-[60vh] items-center justify-center">
//       <div className="text-center">

//         <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-green-500" />

//         <p className="mt-4 text-sm text-slate-500">
//           Loading member data...
//         </p>

//       </div>
//     </div>
//   );
// }

// if (notFound || !formData) {
//   return (
//     <div className="flex min-h-[60vh] items-center justify-center">

//       <div className="text-center">

//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-2xl text-red-400">
//           !
//         </div>

//         <h2 className="mt-4 text-xl font-bold text-white">
//           Member Not Found
//         </h2>

//         <p className="mt-2 text-sm text-slate-500">
//           Member ID #{id} does not exist.
//         </p>

//         <Link
//           href="/dashboard/members"
//           className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black"
//         >
//           <FiArrowLeft />
//           Back to Members
//         </Link>

//       </div>

//     </div>
//   );
// }

//   /* =====================================================
//      PAGE
//   ===================================================== */

//   return (
//     <div className="mx-auto max-w-7xl space-y-6">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//         <div>

//           {/* Breadcrumb */}

//           <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">

//             <Link
//               href="/dashboard"
//               className="hover:text-green-400"
//             >
//               Dashboard
//             </Link>

//             <span>/</span>

//             <Link
//               href="/dashboard/members"
//               className="hover:text-green-400"
//             >
//               Members
//             </Link>

//             <span>/</span>

//             <Link
//               href={`/dashboard/members/${id}`}
//               className="hover:text-green-400"
//             >
//               {formData.name}
//             </Link>

//             <span>/</span>

//             <span className="text-slate-400">
//               Edit
//             </span>

//           </div>

//           <h1 className="text-2xl font-bold text-white sm:text-3xl">
//             Edit Member
//           </h1>

//           <p className="mt-1 text-sm text-slate-500">
//             Update member information.
//           </p>

//         </div>

//         <Link
//           href={`/dashboard/members/${id}`}
//           className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
//         >
//           <FiArrowLeft />
//           Back to Details
//         </Link>

//       </div>


//       {/* =================================================
//           FORM
//       ================================================= */}

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6"
//       >

//         {/* =================================================
//             PERSONAL INFORMATION
//         ================================================= */}

//         <section className="rounded-2xl border border-white/10 bg-[#121821]">

//           <SectionHeader
//             icon={<FiUser />}
//             title="Personal Information"
//             description="Update basic member information"
//           />

//           <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">

//             <InputField
//               label="Full Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter full name"
//               required
//               error={errors.name}
//             />

//             <InputField
//               label="Phone Number"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter phone number"
//               type="tel"
//               icon={<FiPhone />}
//               required
//               error={errors.phone}
//             />

//             <InputField
//               label="Email Address"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter email"
//               type="email"
//               icon={<FiMail />}
//               required
//               error={errors.email}
//             />

//             <SelectField
//               label="Gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               required
//               error={errors.gender}
//             >
//               <option value="">
//                 Select gender
//               </option>

//               <option value="Male">
//                 Male
//               </option>

//               <option value="Female">
//                 Female
//               </option>

//               <option value="Other">
//                 Other
//               </option>
//             </SelectField>

//             <InputField
//               label="Date of Birth"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               type="date"
//               icon={<FiCalendar />}
//               required
//               error={errors.dob}
//             />

//             <div className="lg:col-span-1">

//               <label className="mb-2 block text-sm font-medium text-slate-300">
//                 Address
//                 <span className="ml-1 text-red-400">
//                   *
//                 </span>
//               </label>

//               <div className="relative">

//                 <FiMapPin className="absolute left-3 top-3 text-slate-600" />

//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder="Enter address"
//                   className={`w-full resize-none rounded-xl border ${
//                     errors.address
//                       ? "border-red-500/50"
//                       : "border-white/10"
//                   } bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-green-500/40`}
//                 />

//               </div>

//               {errors.address && (
//                 <p className="mt-1 text-xs text-red-400">
//                   {errors.address}
//                 </p>
//               )}

//             </div>

//             <InputField
//               label="Emergency Contact"
//               name="emergencyContact"
//               value={formData.emergencyContact}
//               onChange={handleChange}
//               placeholder="Emergency contact number"
//               type="tel"
//               icon={<FiPhone />}
//               required
//               error={errors.emergencyContact}
//             />

//           </div>

//         </section>


//         {/* =================================================
//             PROFILE PHOTO
//         ================================================= */}

//         <section className="rounded-2xl border border-white/10 bg-[#121821]">

//           <SectionHeader
//             icon={<FiCamera />}
//             title="Profile Photo"
//             description="Change member profile photo"
//           />

//           <div className="p-5 sm:p-6">

//             <div className="flex flex-col items-center gap-6 sm:flex-row">

//               {/* Current Photo */}

//               <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-green-500/20 bg-white/[0.03]">

//                 {preview ? (
//                   <img
//                     src={preview}
//                     alt="New member"
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-400 to-emerald-700 text-3xl font-bold text-black">
//                     {formData.initials}
//                   </div>
//                 )}

//               </div>


//               {/* Upload */}

//               <label className="flex w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-8 transition hover:border-green-500/40 hover:bg-green-500/[0.02]">

//                 <input
//                   type="file"
//                   accept="image/png,image/jpeg,image/jpg"
//                   onChange={handlePhotoChange}
//                   className="hidden"
//                 />

//                 <FiUploadCloud className="text-3xl text-slate-500" />

//                 <p className="mt-3 text-sm font-medium text-slate-300">
//                   Click to change photo
//                 </p>

//                 <p className="mt-1 text-xs text-slate-600">
//                   JPG, PNG up to 2MB
//                 </p>

//               </label>

//             </div>

//           </div>

//         </section>


//         {/* =================================================
//             MEMBERSHIP INFORMATION
//         ================================================= */}

//         <section className="rounded-2xl border border-white/10 bg-[#121821]">

//           <SectionHeader
//             icon={<FiCreditCard />}
//             title="Membership Information"
//             description="Update membership and payment details"
//           />

//           <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-3">

//             <SelectField
//               label="Membership Plan"
//               name="plan"
//               value={formData.plan}
//               onChange={handleChange}
//               required
//               error={errors.plan}
//             >
//               <option value="Premium">
//                 Premium - ₹2500
//               </option>

//               <option value="Standard">
//                 Standard - ₹1500
//               </option>

//               <option value="Basic">
//                 Basic - ₹1000
//               </option>
//             </SelectField>


//             <InputField
//               label="Join Date"
//               name="joinDate"
//               value={formData.joinDate}
//               onChange={handleChange}
//               type="date"
//               icon={<FiCalendar />}
//               required
//               error={errors.joinDate}
//             />


//             <InputField
//               label="Expiry Date"
//               name="expiryDate"
//               value={formData.expiryDate}
//               onChange={handleChange}
//               type="date"
//               icon={<FiCalendar />}
//               required
//               error={errors.expiryDate}
//             />


//             <SelectField
//               label="Payment Method"
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               onChange={handleChange}
//               required
//               error={errors.paymentMethod}
//             >
//               <option value="">
//                 Select payment method
//               </option>

//               <option value="Cash">
//                 Cash
//               </option>

//               <option value="UPI">
//                 UPI
//               </option>

//               <option value="Card">
//                 Card
//               </option>

//               <option value="Bank Transfer">
//                 Bank Transfer
//               </option>
//             </SelectField>


//             <InputField
//               label="Payment Amount"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               placeholder="Enter amount"
//               type="number"
//               required
//               error={errors.amount}
//             />


//             <SelectField
//               label="Member Status"
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               required
//               error={errors.status}
//             >
//               <option value="Active">
//                 Active
//               </option>

//               <option value="Pending">
//                 Pending
//               </option>

//               <option value="Inactive">
//                 Inactive
//               </option>
//             </SelectField>

//           </div>

//         </section>


//         {/* =================================================
//             ADDITIONAL INFORMATION
//         ================================================= */}

//         <section className="rounded-2xl border border-white/10 bg-[#121821]">

//           <SectionHeader
//             icon={<FiShield />}
//             title="Additional Information"
//             description="Diet, workout and notes"
//           />

//           <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-3">

//             <SelectField
//               label="Diet Plan"
//               name="diet"
//               value={formData.diet}
//               onChange={handleChange}
//             >
//               <option value="High Protein Diet">
//                 High Protein Diet
//               </option>

//               <option value="Balanced Diet">
//                 Balanced Diet
//               </option>

//               <option value="Weight Loss Diet">
//                 Weight Loss Diet
//               </option>

//               <option value="Muscle Gain Diet">
//                 Muscle Gain Diet
//               </option>

//               <option value="Normal Diet">
//                 Normal Diet
//               </option>
//             </SelectField>


//             <SelectField
//               label="Workout Plan"
//               name="workout"
//               value={formData.workout}
//               onChange={handleChange}
//             >
//               <option value="Upper Body Strength">
//                 Upper Body Strength
//               </option>

//               <option value="Full Body Workout">
//                 Full Body Workout
//               </option>

//               <option value="Beginner Workout">
//                 Beginner Workout
//               </option>

//               <option value="Heavy Strength">
//                 Heavy Strength
//               </option>

//               <option value="Cardio">
//                 Cardio
//               </option>
//             </SelectField>


//             <div>

//               <label className="mb-2 block text-sm font-medium text-slate-300">
//                 Notes
//               </label>

//               <textarea
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 rows="4"
//                 placeholder="Additional notes..."
//                 className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-green-500/40"
//               />

//             </div>

//           </div>

//         </section>


//         {/* =================================================
//             ACTION BUTTONS
//         ================================================= */}

//         <div className="flex flex-col-reverse gap-3 pb-6 sm:flex-row sm:justify-end">

//           <Link
//             href={`/dashboard/members/${id}`}
//             className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
//           >
//             <FiX />
//             Cancel
//           </Link>


//           <button
//             type="submit"
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-green-500/10 transition hover:bg-green-400"
//           >
//             <FiSave />
//             Update Member
//           </button>

//         </div>

//       </form>

//     </div>
//   );
// }


// /* =====================================================
//    SECTION HEADER
// ===================================================== */

// function SectionHeader({
//   icon,
//   title,
//   description,
// }) {
//   return (
//     <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">

//       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
//         {icon}
//       </div>

//       <div>

//         <h2 className="text-sm font-semibold text-white">
//           {title}
//         </h2>

//         <p className="mt-0.5 text-xs text-slate-600">
//           {description}
//         </p>

//       </div>

//     </div>
//   );
// }


// /* =====================================================
//    INPUT FIELD
// ===================================================== */

// function InputField({
//   label,
//   name,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
//   required = false,
//   icon,
//   error,
// }) {
//   return (
//     <div>

//       <label className="mb-2 block text-sm font-medium text-slate-300">

//         {label}

//         {required && (
//           <span className="ml-1 text-red-400">
//             *
//           </span>
//         )}

//       </label>

//       <div className="relative">

//         {icon && (
//           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
//             {icon}
//           </span>
//         )}

//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`w-full rounded-xl border ${
//             error
//               ? "border-red-500/50"
//               : "border-white/10"
//           } bg-[#0B0F14] ${
//             icon ? "pl-10" : "px-4"
//           } py-3 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-green-500/40`}
//         />

//       </div>

//       {error && (
//         <p className="mt-1 text-xs text-red-400">
//           {error}
//         </p>
//       )}

//     </div>
//   );
// }


// /* =====================================================
//    SELECT FIELD
// ===================================================== */

// function SelectField({
//   label,
//   name,
//   value,
//   onChange,
//   children,
//   required = false,
//   error,
// }) {
//   return (
//     <div>

//       <label className="mb-2 block text-sm font-medium text-slate-300">

//         {label}

//         {required && (
//           <span className="ml-1 text-red-400">
//             *
//           </span>
//         )}

//       </label>

//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={`w-full rounded-xl border ${
//           error
//             ? "border-red-500/50"
//             : "border-white/10"
//         } bg-[#0B0F14] px-4 py-3 py-3 text-sm text-slate-300 outline-none transition focus:border-green-500/40`}
//       >
//         {children}
//       </select>

//       {error && (
//         <p className="mt-1 text-xs text-red-400">
//           {error}
//         </p>
//       )}

//     </div>
//   );
// }