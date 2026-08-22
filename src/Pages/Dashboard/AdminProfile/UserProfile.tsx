import { useState, useEffect } from "react";
import { FiCamera, FiCheck, FiCheckCircle, FiKey, FiLogOut } from "react-icons/fi";
import { Switch, message } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useProfileQuery } from "../../../redux/apiSlices/authSlice";

interface PreferenceItem {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const defaultPreferences: PreferenceItem[] = [
  {
    id: "email",
    title: "Email Notifications",
    description: "Receive academy updates via email",
    enabled: true,
  },
  {
    id: "push",
    title: "Push Notifications",
    description: "Browser push alerts for critical events",
    enabled: false,
  },
  {
    id: "sms",
    title: "SMS Alerts",
    description: "Text messages for urgent events",
    enabled: true,
  },
  {
    id: "weekly",
    title: "Weekly Summary",
    description: "Weekly digest of academy activity",
    enabled: false,
  },
  {
    id: "assessment",
    title: "Assessment Reminders",
    description: "Reminders when assessments are pending",
    enabled: true,
  },
];

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile-info" | "security" | "preferences">("profile-info");

  const { data: userData } = useProfileQuery();

  // Profile State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+44 7700 000000");

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Preferences State
  const [preferences, setPreferences] = useState<PreferenceItem[]>(defaultPreferences);

  // Avatar State (Initials SA badge or custom image preview)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (userData) {
      const parts = (userData.name || "").split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setEmail(userData.email || "");
      if (userData.image) {
        setAvatarPreview(`${(import.meta as any).env.VITE_BASE_URL}${userData.image}`);
      }
    }
  }, [userData]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      message.success("Profile photo updated!");
    }
  };

  const handleSaveProfile = () => {
    message.success("Profile information updated successfully!");
  };

  const handleUpdatePassword = () => {
    if (!currentPassword) {
      message.error("Please enter your current password.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      message.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error("New passwords do not match.");
      return;
    }

    message.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleTogglePreference = (id: string, checked: boolean) => {
    setPreferences((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: checked } : item))
    );
    message.success("Preferences updated!");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("Authorization");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("Authorization");
    Cookies.remove("refreshToken");
    message.success("Logged out successfully");
    navigate("/auth/login");
  };

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Admin Profile</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">
          Manage your account and personal preferences
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: User Card & Navigation Card */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          {/* User Summary Card */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            {/* Avatar Badge */}
            <div className="relative mb-4">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-24 h-24 rounded-3xl object-cover border-2 border-gray-100 shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 rounded-3xl bg-[#F59E0B] text-black font-bold text-[32px] flex items-center justify-center shadow-sm">
                  SA
                </div>
              )}
              {/* Camera Icon Overlay */}
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#1239D4] hover:bg-blue-700 flex items-center justify-center text-white border-2 border-white shadow-md cursor-pointer transition-colors"
                title="Change Photo"
              >
                <FiCamera size={14} />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <h2 className="text-[18px] font-bold text-gray-900 leading-snug">{userData?.name || "Loading..."}</h2>
            <p className="text-[13px] text-gray-400 font-medium mt-0.5">{userData?.role?.replace(/_/g, " ") || "Admin"}</p>
            <p className="text-[13px] text-gray-400 font-medium mt-0.5">{userData?.email || ""}</p>

            <div className="w-full border-t border-gray-100 my-4" />

            <span className="text-[12px] text-gray-400 font-medium">Member since</span>
            <span className="text-[14px] font-bold text-gray-900 mt-0.5">September 2022</span>
          </div>

          {/* Sidebar Navigation Links Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-1.5">
            <button
              onClick={() => setActiveTab("profile-info")}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-[14px] transition-colors cursor-pointer text-left ${activeTab === "profile-info"
                  ? "bg-[#EFF4FE] text-[#1239D4] font-bold"
                  : "text-gray-500 font-medium hover:bg-gray-50"
                }`}
            >
              Profile Info
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-[14px] transition-colors cursor-pointer text-left ${activeTab === "security"
                  ? "bg-[#EFF4FE] text-[#1239D4] font-bold"
                  : "text-gray-500 font-medium hover:bg-gray-50"
                }`}
            >
              Security
            </button>

            <button
              onClick={() => setActiveTab("preferences")}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-[14px] transition-colors cursor-pointer text-left ${activeTab === "preferences"
                  ? "bg-[#EFF4FE] text-[#1239D4] font-bold"
                  : "text-gray-500 font-medium hover:bg-gray-50"
                }`}
            >
              Preferences
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 rounded-xl flex items-center gap-2.5 text-[14px] font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer text-left mt-2"
            >
              <FiLogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full">
          {activeTab === "profile-info" && (
            /* Profile Info View */
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h2 className="text-[20px] font-bold text-gray-900 mb-6">Profile Information</h2>

              <div className="flex flex-col gap-6">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Super"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Admin"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>
                </div>

                {/* Email Address & Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@tfp.com"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7700 000000"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-[#081A4A] hover:bg-[#07152F] text-white px-7 py-3 rounded-full flex items-center gap-2 text-[14px] font-bold shadow-md transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <FiCheck size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            /* Security Settings View */
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h2 className="text-[20px] font-bold text-gray-900 mb-6">Security Settings</h2>

              {/* Security Banner */}
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-5 flex items-center gap-3.5 mb-8">
                <FiCheckCircle className="text-[#10B981] shrink-0" size={22} />
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#10B981]">Your account is secure</span>
                  <span className="text-[12px] text-[#059669] font-medium mt-0.5">
                    Last login: Today at 08:14 AM from London, UK
                  </span>
                </div>
              </div>

              {/* Change Password Section */}
              <div className="flex flex-col">
                <h3 className="text-[15px] font-bold text-gray-900 mb-4">Change Password</h3>

                <div className="flex flex-col gap-5 max-w-2xl">
                  {/* Current Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>

                  {/* New Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 12 characters"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-2">
                    <button
                      onClick={handleUpdatePassword}
                      className="bg-[#081A4A] hover:bg-[#07152F] text-white px-7 py-3 rounded-full flex items-center gap-2.5 text-[14px] font-bold shadow-md transition-all cursor-pointer active:scale-[0.98]"
                    >
                      <FiKey size={16} />
                      <span>Update Password</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            /* Preferences View */
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h2 className="text-[20px] font-bold text-gray-900 mb-6">Preferences</h2>

              <div className="flex flex-col gap-4">
                {preferences.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100 flex items-center justify-between hover:border-gray-200 transition-all"
                  >
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-gray-900">{item.title}</span>
                      <span className="text-[13px] text-gray-400 font-medium mt-0.5">
                        {item.description}
                      </span>
                    </div>

                    <Switch
                      checked={item.enabled}
                      onChange={(checked) => handleTogglePreference(item.id, checked)}
                      className={item.enabled ? "bg-[#1239D4]" : ""}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
