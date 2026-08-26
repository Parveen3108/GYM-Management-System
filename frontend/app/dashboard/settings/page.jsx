"use client";

import { useEffect, useState } from "react";

import {
  FiSettings,
  FiUser,
  FiHome,
  FiBell,
  FiShield,
  FiSave,
  FiRefreshCw,
  FiDatabase,
  FiInfo,
  FiCheck,
} from "react-icons/fi";

export default function SettingsPage() {
  const [activeTab, setActiveTab] =
    useState("gym");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);


  /* =====================================================
     GYM SETTINGS
  ===================================================== */

  const [gymSettings, setGymSettings] =
    useState({
      gymName: "My Fitness Gym",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      openingTime: "06:00",
      closingTime: "22:00",
      currency: "INR",
    });


  /* =====================================================
     PROFILE SETTINGS
  ===================================================== */

  const [profileSettings, setProfileSettings] =
    useState({
      name: "",
      email: "",
      phone: "",
      role: "Administrator",
    });


  /* =====================================================
     NOTIFICATION SETTINGS
  ===================================================== */

  const [notificationSettings, setNotificationSettings] =
    useState({
      newMember: true,
      payment: true,
      attendance: true,
      lowStock: true,
      membershipExpiry: true,
    });


  /* =====================================================
     SECURITY SETTINGS
  ===================================================== */

  const [securitySettings, setSecuritySettings] =
    useState({
      sessionTimeout: "30",
      loginAlerts: true,
      twoFactor: false,
    });


  /* =====================================================
     LOAD SETTINGS
  ===================================================== */

  useEffect(() => {
    loadSettings();
  }, []);


  const loadSettings = () => {
    try {

      const gymData =
        localStorage.getItem(
          "gym_settings"
        );

      const profileData =
        localStorage.getItem(
          "gym_profile_settings"
        );

      const notificationData =
        localStorage.getItem(
          "gym_notification_settings"
        );

      const securityData =
        localStorage.getItem(
          "gym_security_settings"
        );


      if (gymData) {
        const parsed =
          JSON.parse(gymData);

        setGymSettings((prev) => ({
          ...prev,
          ...parsed,
        }));
      }


      if (profileData) {
        const parsed =
          JSON.parse(profileData);

        setProfileSettings((prev) => ({
          ...prev,
          ...parsed,
        }));
      }


      if (notificationData) {
        const parsed =
          JSON.parse(notificationData);

        setNotificationSettings((prev) => ({
          ...prev,
          ...parsed,
        }));
      }


      if (securityData) {
        const parsed =
          JSON.parse(securityData);

        setSecuritySettings((prev) => ({
          ...prev,
          ...parsed,
        }));
      }

    } catch (error) {

      console.error(
        "Settings loading error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  /* =====================================================
     SAVE SETTINGS
  ===================================================== */

  const handleSave = () => {

    setSaving(true);
    setSaved(false);

    try {

      localStorage.setItem(
        "gym_settings",
        JSON.stringify(
          gymSettings
        )
      );


      localStorage.setItem(
        "gym_profile_settings",
        JSON.stringify(
          profileSettings
        )
      );


      localStorage.setItem(
        "gym_notification_settings",
        JSON.stringify(
          notificationSettings
        )
      );


      localStorage.setItem(
        "gym_security_settings",
        JSON.stringify(
          securitySettings
        )
      );


      setTimeout(() => {

        setSaving(false);
        setSaved(true);

        setTimeout(() => {
          setSaved(false);
        }, 2500);

      }, 500);

    } catch (error) {

      console.error(
        "Settings save error:",
        error
      );

      alert(
        "Unable to save settings."
      );

      setSaving(false);
    }
  };


  /* =====================================================
     RESET SETTINGS
  ===================================================== */

  const handleReset = () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to reset all settings?"
      );

    if (!confirmed) {
      return;
    }


    localStorage.removeItem(
      "gym_settings"
    );

    localStorage.removeItem(
      "gym_profile_settings"
    );

    localStorage.removeItem(
      "gym_notification_settings"
    );

    localStorage.removeItem(
      "gym_security_settings"
    );


    window.location.reload();
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="flex items-center gap-3 text-sm text-slate-400">

          <FiRefreshCw className="animate-spin text-green-400" />

          Loading settings...

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

      <div>

        <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">

          <span>
            Dashboard
          </span>

          <span>/</span>

          <span className="text-slate-400">
            Settings
          </span>

        </div>


        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

            <FiSettings className="text-xl" />

          </div>


          <div>

            <h1 className="text-2xl font-bold text-white sm:text-3xl">

              Settings

            </h1>


            <p className="mt-1 text-sm text-slate-500">

              Manage your gym management system settings.

            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          SETTINGS LAYOUT
      ================================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[230px_1fr]">


        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="h-fit rounded-2xl border border-white/10 bg-[#121821] p-2">

          <SettingTab
            active={
              activeTab === "gym"
            }
            icon={<FiHome />}
            onClick={() =>
              setActiveTab("gym")
            }
          >
            Gym Information
          </SettingTab>


          <SettingTab
            active={
              activeTab === "profile"
            }
            icon={<FiUser />}
            onClick={() =>
              setActiveTab("profile")
            }
          >
            Profile
          </SettingTab>


          <SettingTab
            active={
              activeTab ===
              "notifications"
            }
            icon={<FiBell />}
            onClick={() =>
              setActiveTab(
                "notifications"
              )
            }
          >
            Notifications
          </SettingTab>


          <SettingTab
            active={
              activeTab === "security"
            }
            icon={<FiShield />}
            onClick={() =>
              setActiveTab("security")
            }
          >
            Security
          </SettingTab>

        </aside>


        {/* =================================================
            CONTENT
        ================================================= */}

        <main>


          {/* =================================================
              GYM INFORMATION
          ================================================= */}

          {activeTab === "gym" && (

            <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

              <SectionHeader
                icon={<FiHome />}
                title="Gym Information"
                description="Update your gym's basic information."
              />


              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">


                <InputField
                  label="Gym Name"
                  value={
                    gymSettings.gymName
                  }
                  onChange={(value) =>
                    setGymSettings(
                      (prev) => ({
                        ...prev,
                        gymName:
                          value,
                      })
                    )
                  }
                  placeholder="Enter gym name"
                />


                <InputField
                  label="Owner Name"
                  value={
                    gymSettings.ownerName
                  }
                  onChange={(value) =>
                    setGymSettings(
                      (prev) => ({
                        ...prev,
                        ownerName:
                          value,
                      })
                    )
                  }
                  placeholder="Enter owner name"
                />


                <InputField
                  label="Email"
                  type="email"
                  value={
                    gymSettings.email
                  }
                  onChange={(value) =>
                    setGymSettings(
                      (prev) => ({
                        ...prev,
                        email:
                          value,
                      })
                    )
                  }
                  placeholder="gym@example.com"
                />


                <InputField
                  label="Phone"
                  value={
                    gymSettings.phone
                  }
                  onChange={(value) =>
                    setGymSettings(
                      (prev) => ({
                        ...prev,
                        phone:
                          value,
                      })
                    )
                  }
                  placeholder="+91 XXXXX XXXXX"
                />


                <InputField
                  label="City"
                  value={
                    gymSettings.city
                  }
                  onChange={(value) =>
                    setGymSettings(
                      (prev) => ({
                        ...prev,
                        city:
                          value,
                      })
                    )
                  }
                  placeholder="Enter city"
                />


                <SelectField
                  label="Currency"
                  value={
                    gymSettings.currency
                  }
                  onChange={(value) =>
                    setGymSettings(
                      (prev) => ({
                        ...prev,
                        currency:
                          value,
                      })
                    )
                  }
                  options={[
                    "INR",
                    "USD",
                    "EUR",
                    "GBP",
                  ]}
                />


                <InputField
                  label="Opening Time"
                  type="time"
                  value={
                    gymSettings.openingTime
                  }
                  onChange={(value) =>
                    setGymSettings(
                      (prev) => ({
                        ...prev,
                        openingTime:
                          value,
                      })
                    )
                  }
                />


                <InputField
                  label="Closing Time"
                  type="time"
                  value={
                    gymSettings.closingTime
                  }
                  onChange={(value) =>
                    setGymSettings(
                      (prev) => ({
                        ...prev,
                        closingTime:
                          value,
                      })
                    )
                  }
                />


                <div className="md:col-span-2">

                  <label className="mb-2 block text-xs font-medium text-slate-400">

                    Gym Address

                  </label>


                  <textarea
                    value={
                      gymSettings.address
                    }
                    onChange={(e) =>
                      setGymSettings(
                        (prev) => ({
                          ...prev,
                          address:
                            e.target
                              .value,
                        })
                      )
                    }
                    rows="4"
                    placeholder="Enter complete gym address"
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-green-500/40"
                  />

                </div>

              </div>

            </section>

          )}


          {/* =================================================
              PROFILE
          ================================================= */}

          {activeTab ===
            "profile" && (

            <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

              <SectionHeader
                icon={<FiUser />}
                title="Admin Profile"
                description="Manage administrator account information."
              />


              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">


                <InputField
                  label="Full Name"
                  value={
                    profileSettings.name
                  }
                  onChange={(value) =>
                    setProfileSettings(
                      (prev) => ({
                        ...prev,
                        name:
                          value,
                      })
                    )
                  }
                  placeholder="Enter your name"
                />


                <InputField
                  label="Email"
                  type="email"
                  value={
                    profileSettings.email
                  }
                  onChange={(value) =>
                    setProfileSettings(
                      (prev) => ({
                        ...prev,
                        email:
                          value,
                      })
                    )
                  }
                  placeholder="admin@example.com"
                />


                <InputField
                  label="Phone"
                  value={
                    profileSettings.phone
                  }
                  onChange={(value) =>
                    setProfileSettings(
                      (prev) => ({
                        ...prev,
                        phone:
                          value,
                      })
                    )
                  }
                  placeholder="+91 XXXXX XXXXX"
                />


                <InputField
                  label="Role"
                  value={
                    profileSettings.role
                  }
                  onChange={(value) =>
                    setProfileSettings(
                      (prev) => ({
                        ...prev,
                        role:
                          value,
                      })
                    )
                  }
                  placeholder="Administrator"
                />

              </div>

            </section>

          )}


          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          {activeTab ===
            "notifications" && (

            <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

              <SectionHeader
                icon={<FiBell />}
                title="Notifications"
                description="Choose which gym activities should generate notifications."
              />


              <div className="mt-6 divide-y divide-white/5">

                <ToggleRow
                  title="New Member"
                  description="Get notified when a new member is added."
                  checked={
                    notificationSettings.newMember
                  }
                  onChange={(value) =>
                    setNotificationSettings(
                      (prev) => ({
                        ...prev,
                        newMember:
                          value,
                      })
                    )
                  }
                />


                <ToggleRow
                  title="Payment Received"
                  description="Get notified when a member payment is recorded."
                  checked={
                    notificationSettings.payment
                  }
                  onChange={(value) =>
                    setNotificationSettings(
                      (prev) => ({
                        ...prev,
                        payment:
                          value,
                      })
                    )
                  }
                />


                <ToggleRow
                  title="Attendance"
                  description="Get notifications about member attendance."
                  checked={
                    notificationSettings.attendance
                  }
                  onChange={(value) =>
                    setNotificationSettings(
                      (prev) => ({
                        ...prev,
                        attendance:
                          value,
                      })
                    )
                  }
                />


                <ToggleRow
                  title="Low Stock"
                  description="Get notified when supplement stock becomes low."
                  checked={
                    notificationSettings.lowStock
                  }
                  onChange={(value) =>
                    setNotificationSettings(
                      (prev) => ({
                        ...prev,
                        lowStock:
                          value,
                      })
                    )
                  }
                />


                <ToggleRow
                  title="Membership Expiry"
                  description="Get notified when a membership is close to expiry."
                  checked={
                    notificationSettings.membershipExpiry
                  }
                  onChange={(value) =>
                    setNotificationSettings(
                      (prev) => ({
                        ...prev,
                        membershipExpiry:
                          value,
                      })
                    )
                  }
                />

              </div>

            </section>

          )}


          {/* =================================================
              SECURITY
          ================================================= */}

          {activeTab ===
            "security" && (

            <section className="rounded-2xl border border-white/10 bg-[#121821] p-5 sm:p-6">

              <SectionHeader
                icon={<FiShield />}
                title="Security"
                description="Manage basic security preferences."
              />


              <div className="mt-6 space-y-2">


                <div className="max-w-sm">

                  <SelectField
                    label="Session Timeout"
                    value={
                      securitySettings.sessionTimeout
                    }
                    onChange={(value) =>
                      setSecuritySettings(
                        (prev) => ({
                          ...prev,
                          sessionTimeout:
                            value,
                        })
                      )
                    }
                    options={[
                      "15",
                      "30",
                      "60",
                      "120",
                    ]}
                  />

                  <p className="mt-2 text-xs text-slate-600">

                    Session timeout is stored as minutes.

                  </p>

                </div>


                <ToggleRow
                  title="Login Alerts"
                  description="Enable alerts when an administrator logs in."
                  checked={
                    securitySettings.loginAlerts
                  }
                  onChange={(value) =>
                    setSecuritySettings(
                      (prev) => ({
                        ...prev,
                        loginAlerts:
                          value,
                      })
                    )
                  }
                />


                <ToggleRow
                  title="Two-Factor Authentication"
                  description="Enable two-factor authentication for administrator access."
                  checked={
                    securitySettings.twoFactor
                  }
                  onChange={(value) =>
                    setSecuritySettings(
                      (prev) => ({
                        ...prev,
                        twoFactor:
                          value,
                      })
                    )
                  }
                />

              </div>

            </section>

          )}

        </main>

      </div>


      {/* =================================================
          BOTTOM ACTION BAR
      ================================================= */}

      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#121821] p-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2">

          <FiDatabase className="text-slate-600" />

          <p className="text-xs text-slate-600">

            Settings are saved locally in your browser.

          </p>

        </div>


        <div className="flex flex-col gap-2 sm:flex-row">


          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/[0.03] px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >

            <FiRefreshCw />

            Reset

          </button>


          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {saving ? (
              <>
                <FiRefreshCw className="animate-spin" />

                Saving...
              </>
            ) : saved ? (
              <>
                <FiCheck />

                Saved
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

    </div>
  );
}


/* =====================================================
   SETTING TAB
===================================================== */

function SettingTab({
  active,
  icon,
  children,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
        active
          ? "bg-green-500/10 text-green-400"
          : "text-slate-500 hover:bg-white/[0.03] hover:text-white"
      }`}
    >

      {icon}

      <span>
        {children}
      </span>

    </button>
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
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">

        {icon}

      </div>


      <div>

        <h2 className="text-base font-semibold text-white">

          {title}

        </h2>


        <p className="mt-1 text-xs text-slate-600">

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
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-slate-400">

        {label}

      </label>


      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-green-500/40"
      />

    </div>
  );
}


/* =====================================================
   SELECT
===================================================== */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-slate-400">

        {label}

      </label>


      <select
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="w-full appearance-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-green-500/40"
      >

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option === "15" ||
              option === "30" ||
              option === "60" ||
              option === "120"
                ? `${option} Minutes`
                : option}
            </option>
          )
        )}

      </select>

    </div>
  );
}


/* =====================================================
   TOGGLE
===================================================== */

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5">

      <div className="min-w-0">

        <h3 className="text-sm font-medium text-white">

          {title}

        </h3>


        <p className="mt-1 text-xs leading-5 text-slate-600">

          {description}

        </p>

      </div>


      <button
        type="button"
        onClick={() =>
          onChange(!checked)
        }
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-green-500"
            : "bg-white/10"
        }`}
      >

        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}