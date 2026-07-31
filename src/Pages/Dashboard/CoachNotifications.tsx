import { useState } from "react";
import { FiUsers, FiClock, FiAlertTriangle, FiLayers, FiCheck } from "react-icons/fi";
import { BiTrophy } from "react-icons/bi";
import { message } from "antd";

interface NotificationItem {
  id: number;
  category: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: any;
  iconColor: string;
  iconBg: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    category: "Parent",
    title: "Parent reply from Sarah Mitchell",
    message: "Thank you for the assessment update for James.",
    time: "5 min ago",
    unread: true,
    icon: FiUsers,
    iconColor: "text-[#3B82F6]",
    iconBg: "bg-[#3B82F6]/15",
  },
  {
    id: 2,
    category: "Reminder",
    title: "Assessment Due: Tyler Brooks",
    message: "Quarterly assessment is overdue by 3 days.",
    time: "1 hr ago",
    unread: true,
    icon: FiClock,
    iconColor: "text-[#EAB308]",
    iconBg: "bg-[#EAB308]/15",
  },
  {
    id: 3,
    category: "Alert",
    title: "Low Attendance Alert: U14 Squad",
    message: "Attendance dropped below 80% threshold this week.",
    time: "2 hrs ago",
    unread: true,
    icon: FiAlertTriangle,
    iconColor: "text-[#EF4444]",
    iconBg: "bg-[#EF4444]/15",
  },
  {
    id: 4,
    category: "Achievement",
    title: "Achievement Confirmed: James",
    message: "Player of the Match vs Riverside FC approved.",
    time: "Yesterday",
    unread: false,
    icon: BiTrophy,
    iconColor: "text-[#EAB308]",
    iconBg: "bg-[#EAB308]/15",
  },
  {
    id: 5,
    category: "System",
    title: "System Update Complete",
    message: "New statistics module features are now available.",
    time: "Yesterday",
    unread: false,
    icon: FiLayers,
    iconColor: "text-[#8B5CF6]",
    iconBg: "bg-[#8B5CF6]/15",
  },
  {
    id: 6,
    category: "Reminder",
    title: "Target Due: Ethan Jordan",
    message: "Leadership Workshop target extended. Please review.",
    time: "2 days ago",
    unread: false,
    icon: FiClock,
    iconColor: "text-[#EAB308]",
    iconBg: "bg-[#EAB308]/15",
  },
];

const categories = ["All", "Parent", "Reminder", "Alert", "Achievement", "System"];

const CoachNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeCategory, setActiveCategory] = useState("All");

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    message.success("All notifications marked as read");
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="flex flex-col h-full bg-[#050E21] p-6 pb-12 overflow-y-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h1 className="text-[24px] font-bold text-white leading-tight">Notifications</h1>
          <p className="text-[14px] text-[#94A3B8] font-medium mt-1">
            {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="text-[#60A5FA] hover:text-blue-300 text-[13px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <FiCheck size={16} />
          <span>Mark all read</span>
        </button>
      </div>

      {/* Category Filters Row */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto py-2.5 px-1.5 min-h-[54px] custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all shrink-0 whitespace-nowrap inline-flex items-center justify-center cursor-pointer ${
              activeCategory === cat
                ? "bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] text-white border border-blue-400/20 shadow-md"
                : "bg-[#0B1B38] text-[#94A3B8] border border-[#162E58] hover:border-gray-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleMarkAsRead(item.id)}
                className={`bg-[#0B1B38] border rounded-2xl px-6 py-5 flex items-center justify-between transition-all cursor-pointer hover:border-[#234580] ${
                  item.unread ? "border-[#1E3A66] bg-[#0B1B38]" : "border-[#162E58] opacity-90"
                }`}
              >
                {/* Left Side: Icon & Details */}
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <IconComp className={item.iconColor} size={22} />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-[15px] font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[13px] font-medium text-[#94A3B8] mt-1 leading-snug">
                      {item.message}
                    </p>
                  </div>
                </div>

                {/* Right Side: Timestamp & Unread Dot */}
                <div className="flex items-center gap-3.5 ml-4 shrink-0">
                  <span className="text-[12px] font-medium text-[#64748B]">
                    {item.time}
                  </span>
                  {item.unread && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0" />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-12 text-center">
            <p className="text-[#94A3B8] font-medium text-[15px]">
              No notifications found for "{activeCategory}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachNotifications;
