import { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";

interface JwtPayload {
  role?: string;
}

const CoachSettings = () => {
  const [isCoach, setIsCoach] = useState(false);

  // Profile State
  const [fullName, setFullName] = useState("Marcus Thompson");
  const [email, setEmail] = useState("m.thompson@tfpacademy.com");
  const [phone, setPhone] = useState("+44 7700 900000");
  const [roleTitle, setRoleTitle] = useState("Head Coach");

  // Notification Preferences State
  const [assessmentReminders, setAssessmentReminders] = useState(true);
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);
  const [targetDueReminders, setTargetDueReminders] = useState(true);
  const [parentNotifications, setParentNotifications] = useState(false);
  const [systemUpdates, setSystemUpdates] = useState(false);
  const [weeklySummaryEmail, setWeeklySummaryEmail] = useState(true);

  // Security State
  const [currentPassword, setCurrentPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("••••••••");
  const [confirmPassword, setConfirmPassword] = useState("••••••••");

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setIsCoach(decoded.role === "CHOACH");
      } catch (e) {
        setIsCoach(false);
      }
    }
  }, []);

  const handleSaveChanges = () => {
    message.success("Profile and settings saved successfully!");
  };

  const handleUpdatePassword = () => {
    message.success("Password updated successfully!");
  };

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto ${
        isCoach ? "bg-[#050E21]" : "bg-[#050E21]"
      }`}
    >
      {/* Header & Save Action Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-white leading-tight">Settings</h1>
          <p className="text-[14px] text-[#94A3B8] font-medium mt-1">
            Manage your profile and preferences
          </p>
        </div>

        <button
          onClick={handleSaveChanges}
          className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-7 py-2.5 rounded-full flex items-center gap-2 text-[14px] shadow-md transition-all cursor-pointer border border-blue-400/20"
        >
          <span>Save Changes</span>
        </button>
      </div>

      {/* Main Content (2 Columns Layout) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Profile Card */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col shadow-sm w-full lg:w-[360px] shrink-0">
          <h2 className="text-[16px] font-bold text-white mb-5">Profile</h2>

          {/* Avatar Initials Badge */}
          <div className="relative mx-auto mb-3">
            <div className="w-20 h-20 rounded-full bg-[#2563EB] text-white font-bold text-[24px] flex items-center justify-center shadow-md">
              MT
            </div>
            <label className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#1239D4] border-2 border-[#0B1B38] text-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-xs">
              <FiEdit2 size={12} />
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          {/* Profile Name & Title */}
          <h3 className="text-[18px] font-bold text-white text-center leading-tight">
            Jay Railton
          </h3>
          <p className="text-[13px] text-[#94A3B8] text-center font-medium mt-1 mb-6">
            Head Coach · TFP Academy
          </p>

          {/* Input Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#94A3B8]">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#94A3B8]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#94A3B8]">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#94A3B8]">Role</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Notification Preferences & Security */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          {/* Card 1: Notification Preferences */}
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col shadow-sm">
            <h2 className="text-[16px] font-bold text-white mb-5">Notification Preferences</h2>

            <div className="flex flex-col gap-5">
              {/* Row 1 */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white">Assessment Reminders</span>
                  <span className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                    Get reminded when player assessments are due
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAssessmentReminders(!assessmentReminders)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    assessmentReminders ? "bg-[#2563EB]" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      assessmentReminders ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between border-t border-[#162E58]/50 pt-4">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white">Attendance Alerts</span>
                  <span className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                    Alerts when attendance drops below threshold
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAttendanceAlerts(!attendanceAlerts)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    attendanceAlerts ? "bg-[#2563EB]" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      attendanceAlerts ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-between border-t border-[#162E58]/50 pt-4">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white">Target Due Reminders</span>
                  <span className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                    Remind me 3 days before target deadlines
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setTargetDueReminders(!targetDueReminders)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    targetDueReminders ? "bg-[#2563EB]" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      targetDueReminders ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Row 4 */}
              <div className="flex items-center justify-between border-t border-[#162E58]/50 pt-4">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white">Parent Notifications</span>
                  <span className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                    Confirm when parent notifications are sent
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setParentNotifications(!parentNotifications)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    parentNotifications ? "bg-[#2563EB]" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      parentNotifications ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Row 5 */}
              <div className="flex items-center justify-between border-t border-[#162E58]/50 pt-4">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white">System Updates</span>
                  <span className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                    Receive product update announcements
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSystemUpdates(!systemUpdates)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    systemUpdates ? "bg-[#2563EB]" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      systemUpdates ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Row 6 */}
              <div className="flex items-center justify-between border-t border-[#162E58]/50 pt-4">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white">Weekly Summary Email</span>
                  <span className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                    Get a weekly digest of your squad activity
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setWeeklySummaryEmail(!weeklySummaryEmail)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    weeklySummaryEmail ? "bg-[#2563EB]" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      weeklySummaryEmail ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Security */}
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col shadow-sm">
            <h2 className="text-[16px] font-bold text-white mb-5">Security</h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#94A3B8]">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#94A3B8]">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#94A3B8]">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={handleUpdatePassword}
                className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-6 py-2.5 rounded-full text-[13px] shadow-md transition-all cursor-pointer w-fit mt-2 border border-blue-400/20"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachSettings;
