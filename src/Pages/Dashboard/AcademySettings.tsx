import { useState } from "react";
import { FiUpload, FiPlus, FiCheck, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Modal, message } from "antd";
import defaultLogo from "../../assets/logo.png";

interface AgeGroup {
  id: string;
  code: string;
  ageRange: string;
  label: string;
}

const defaultAgeGroups: AgeGroup[] = [
  { id: "1", code: "U3_5", ageRange: "3-5 years", label: "U3_5 (3-5 years)" },
  { id: "2", code: "U6_9", ageRange: "6-9 years", label: "U6_9 (6-9 years)" },
  { id: "3", code: "U6_14", ageRange: "6-14 years", label: "U6_14 (6-14 years)" },
  { id: "4", code: "U7_13", ageRange: "7-13 years", label: "U7_13 (7-13 years)" },
  { id: "5", code: "G7_13", ageRange: "7-13 years", label: "G7_13 (7-13 years)" },
  { id: "6", code: "U10_15", ageRange: "10-15 years", label: "U10_15 (10-15 years)" },
];

const AcademySettings = () => {
  const [activeTab, setActiveTab] = useState<"general" | "age-groups">("general");

  // Profile Form State
  const [logoUrl, setLogoUrl] = useState<string>(defaultLogo);
  const [academyName, setAcademyName] = useState("TFP Player Profile Football Academy");
  const [contactEmail, setContactEmail] = useState("admin@tfp.com");
  const [contactPhone, setContactPhone] = useState("+44 7700 000000");
  const [address, setAddress] = useState("Academy Road, London");
  const [city, setCity] = useState("London");
  const [postcode, setPostcode] = useState("SW1A 1AA");
  const [country, setCountry] = useState("United Kingdom");
  const [founded, setFounded] = useState("2018");

  // Age Groups State
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>(defaultAgeGroups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<AgeGroup | null>(null);
  const [groupCode, setGroupCode] = useState("");
  const [ageRange, setAgeRange] = useState("");

  // Logo Change Handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
      message.success("Academy logo preview updated!");
    }
  };

  // Save General Profile
  const handleSaveProfile = () => {
    message.success("Academy profile saved successfully!");
  };

  // Open Modal for Add/Edit
  const handleOpenAddModal = () => {
    setEditingGroup(null);
    setGroupCode("");
    setAgeRange("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (group: AgeGroup) => {
    setEditingGroup(group);
    setGroupCode(group.code);
    setAgeRange(group.ageRange);
    setIsModalOpen(true);
  };

  // Save Age Group (Add/Edit)
  const handleSaveGroup = () => {
    if (!groupCode.trim() || !ageRange.trim()) {
      message.error("Please enter both group code and age range.");
      return;
    }

    const label = `${groupCode.trim()} (${ageRange.trim()})`;

    if (editingGroup) {
      setAgeGroups((prev) =>
        prev.map((g) =>
          g.id === editingGroup.id
            ? { ...g, code: groupCode.trim(), ageRange: ageRange.trim(), label }
            : g
        )
      );
      message.success("Age group updated successfully!");
    } else {
      const newGroup: AgeGroup = {
        id: Date.now().toString(),
        code: groupCode.trim(),
        ageRange: ageRange.trim(),
        label,
      };
      setAgeGroups((prev) => [...prev, newGroup]);
      message.success("New age group added!");
    }

    setIsModalOpen(false);
  };

  // Delete Age Group
  const handleDeleteGroup = (id: string) => {
    setAgeGroups((prev) => prev.filter((g) => g.id !== id));
    message.success("Age group removed.");
  };

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Academy Settings</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">
          Configure your academy profile and system preferences
        </p>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side Tab Navigation */}
        <div className="w-full lg:w-64 shrink-0 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-1.5">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-[14px] transition-colors cursor-pointer text-left ${
              activeTab === "general"
                ? "bg-[#EFF4FE] text-[#1239D4] font-bold"
                : "text-gray-500 font-medium hover:bg-gray-50"
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("age-groups")}
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-[14px] transition-colors cursor-pointer text-left ${
              activeTab === "age-groups"
                ? "bg-[#EFF4FE] text-[#1239D4] font-bold"
                : "text-gray-500 font-medium hover:bg-gray-50"
            }`}
          >
            Age Groups
          </button>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full">
          {activeTab === "general" ? (
            /* General / Academy Profile View */
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h2 className="text-[20px] font-bold text-gray-900 mb-6">Academy Profile</h2>

              {/* Logo Upload Section */}
              <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm overflow-hidden p-1 shrink-0">
                  <img src={logoUrl} alt="Academy Logo" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[16px] font-bold text-gray-900">TFP Player Profile Academy</h3>
                  <p className="text-[13px] text-gray-400 font-medium mt-0.5">
                    Academy logo — click to upload
                  </p>
                  <label className="text-[13px] font-bold text-[#1239D4] hover:underline cursor-pointer flex items-center gap-1.5 mt-1.5 w-fit">
                    <FiUpload size={14} />
                    <span>Upload new logo</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Profile Form */}
              <div className="flex flex-col gap-6">
                {/* Academy Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-900 tracking-wide">Academy Name</label>
                  <input
                    type="text"
                    value={academyName}
                    onChange={(e) => setAcademyName(e.target.value)}
                    placeholder="TFP Player Profile Football Academy"
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">Contact Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="admin@tfp.com"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">Contact Phone</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+44 7700 000000"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-900 tracking-wide">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Academy Road, London"
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                  />
                </div>

                {/* City & Postcode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="London"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">Postcode</label>
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="SW1A 1AA"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>
                </div>

                {/* Country & Founded */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="United Kingdom"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#F9FAFC] shadow-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900 tracking-wide">Founded</label>
                    <input
                      type="text"
                      value={founded}
                      onChange={(e) => setFounded(e.target.value)}
                      placeholder="2018"
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
          ) : (
            /* Age Groups View */
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-bold text-gray-900">Age Groups</h2>
                <button
                  onClick={handleOpenAddModal}
                  className="bg-[#EFF4FE] hover:bg-blue-100 text-[#1239D4] text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 border border-[#DBEAFE] transition-colors shadow-xs cursor-pointer"
                >
                  <FiPlus size={15} />
                  <span>Add Group</span>
                </button>
              </div>

              {/* Age Groups List */}
              <div className="flex flex-col gap-3">
                {ageGroups.map((group) => (
                  <div
                    key={group.id}
                    className="bg-[#F8FAFC] rounded-2xl px-6 py-4 border border-gray-100 flex items-center justify-between hover:border-gray-200 transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-gray-400 font-bold text-[15px]">#</span>
                      <span className="text-[14px] font-bold text-gray-800">{group.label}</span>
                    </div>

                    <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenEditModal(group)}
                        className="text-gray-400 hover:text-[#1239D4] p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(group.id)}
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Age Group Modal */}
      <Modal
        title={editingGroup ? "Edit Age Group" : "Add Age Group"}
        open={isModalOpen}
        onOk={handleSaveGroup}
        onCancel={() => setIsModalOpen(false)}
        okText={editingGroup ? "Save Changes" : "Add Group"}
        okButtonProps={{ className: "bg-[#1239D4]" }}
        centered
      >
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-gray-800">Group Code / Identifier</label>
            <input
              type="text"
              placeholder="e.g. U12_16"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-gray-800">Age Range Description</label>
            <input
              type="text"
              placeholder="e.g. 12-16 years"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AcademySettings;
