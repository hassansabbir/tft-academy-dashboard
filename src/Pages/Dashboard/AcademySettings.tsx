import React, { useState, useRef, useMemo } from "react";
import { FiUpload, FiPlus, FiCheck, FiEdit2, FiTrash2, FiImage } from "react-icons/fi";
import { Modal, message, Spin } from "antd";
import defaultLogo from "../../assets/logo.png";
import JoditEditor from "jodit-react";
import { imageUrl } from "@/redux/api/baseApi";
import {
  useGetAllAgeGroupsQuery,
  useCreateAgeGroupMutation,
  useUpdateAgeGroupMutation,
  useDeleteAgeGroupMutation,
  useGetAllBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation
} from "@/redux/apiSlices/dashboardSlice";

const backgroundPages = [
  { id: 'home', name: 'Home' },
  { id: 'development', name: 'Development' },
  { id: 'statistics', name: 'Statistics' },
  { id: 'profile', name: 'Profile' },
];

type TabType = "general" | "age-groups" | "add-background" | "privacy-policy" | "terms-conditions" | "about-us";

const AcademySettings = () => {
  const [activeTab, setActiveTab] = useState<TabType>("general");

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

  // Background Images Local Preview State
  const [backgrounds, setBackgrounds] = useState<Record<string, string>>({});

  // Editor States
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [termsConditions, setTermsConditions] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const editorRef = useRef(null);
  
  // Editor Config
  const editorConfig = {
    readonly: false,
    placeholder: 'Start typings...',
    height: 500,
  };

  // Age Groups API & State
  const { data: ageGroupsData, isLoading: isAgeGroupsLoading } = useGetAllAgeGroupsQuery(undefined);
  const [createAgeGroup, { isLoading: isCreating }] = useCreateAgeGroupMutation();
  const [updateAgeGroup, { isLoading: isUpdating }] = useUpdateAgeGroupMutation();
  const [deleteAgeGroup] = useDeleteAgeGroupMutation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<any | null>(null);
  const [minAge, setMinAge] = useState<string>("");
  const [maxAge, setMaxAge] = useState<string>("");

  const [previewImage, setPreviewImage] = useState<{url: string, title: string} | null>(null);

  const ageGroups = ageGroupsData || [];

  // Banners API
  const { data: bannersData, isLoading: isBannersLoading } = useGetAllBannersQuery(undefined);
  const [createBanner, { isLoading: isCreatingBanner }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdatingBanner }] = useUpdateBannerMutation();

  const bannersMap = useMemo(() => {
    const map: Record<string, any> = {};
    if (bannersData) {
      bannersData.forEach((b: any) => {
        map[b.section] = b;
      });
    }
    return map;
  }, [bannersData]);

  const isBannerUpdating = isCreatingBanner || isUpdatingBanner;

  // Handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
      message.success("Academy logo preview updated!");
    }
  };

  const handleBackgroundUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const url = URL.createObjectURL(file);
    setBackgrounds(prev => ({ ...prev, [id]: url }));

    const formData = new FormData();
    formData.append('image', file);
    formData.append('data', JSON.stringify({ name: `${id} banner`, section: id }));

    try {
      const existing = bannersMap[id];
      if (existing) {
        await updateBanner({ id: existing._id, formData }).unwrap();
        message.success(`${backgroundPages.find(p => p.id === id)?.name} background updated!`);
      } else {
        await createBanner(formData).unwrap();
        message.success(`${backgroundPages.find(p => p.id === id)?.name} background uploaded!`);
      }
    } catch (error: any) {
      message.error(error?.data?.message || `Failed to upload ${id} background`);
    }
  };

  const handleSaveProfile = () => {
    message.success("Academy profile saved successfully!");
  };

  const handleSaveContent = (tabName: string) => {
    message.success(`${tabName} saved successfully!`);
  };

  // Age Group Handlers
  const handleOpenAddModal = () => {
    setEditingGroup(null);
    setMinAge("");
    setMaxAge("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (group: any) => {
    setEditingGroup(group);
    setMinAge(group.minAge.toString());
    setMaxAge(group.maxAge.toString());
    setIsModalOpen(true);
  };

  const handleSaveGroup = async () => {
    const min = parseInt(minAge);
    const max = parseInt(maxAge);

    if (isNaN(min) || isNaN(max)) {
      message.error("Please enter valid numbers for minimum and maximum age.");
      return;
    }

    if (min >= max) {
      message.error("Minimum age must be less than maximum age.");
      return;
    }

    try {
      if (editingGroup) {
        await updateAgeGroup({ id: editingGroup._id, minAge: min, maxAge: max }).unwrap();
        message.success("Age group updated successfully!");
      } else {
        await createAgeGroup({ minAge: min, maxAge: max }).unwrap();
        message.success("New age group added!");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      message.error(err?.data?.message || "Failed to save age group");
    }
  };

  const handleDeleteGroup = async (id: string) => {
    try {
      await deleteAgeGroup(id).unwrap();
      message.success("Age group removed.");
    } catch (err: any) {
      message.error(err?.data?.message || "Failed to delete age group");
    }
  };

  const renderTabButton = (id: TabType, label: string) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-[14px] transition-colors cursor-pointer text-left ${
        activeTab === id
          ? "bg-[#EFF4FE] text-[#1239D4] font-bold"
          : "text-gray-500 font-medium hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );

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
          {renderTabButton("general", "General")}
          {renderTabButton("age-groups", "Age Groups")}
          {renderTabButton("add-background", "Add Background")}
          {renderTabButton("privacy-policy", "Privacy Policy")}
          {renderTabButton("terms-conditions", "Terms and Conditions")}
          {renderTabButton("about-us", "About Us")}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full">
          {activeTab === "general" && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h2 className="text-[20px] font-bold text-gray-900 mb-6">Academy Profile</h2>

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

              <div className="flex flex-col gap-6">
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

          {activeTab === "age-groups" && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col relative min-h-[300px]">
              {isAgeGroupsLoading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-2xl">
                  <Spin />
                </div>
              )}
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

              <div className="flex flex-col gap-3">
                {ageGroups.map((group: any) => (
                  <div
                    key={group._id}
                    className="bg-[#F8FAFC] rounded-2xl px-6 py-4 border border-gray-100 flex items-center justify-between hover:border-gray-200 transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-gray-400 font-bold text-[15px]">#</span>
                      <span className="text-[14px] font-bold text-gray-800">{group.name} ({group.minAge}-{group.maxAge} years)</span>
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
                        onClick={() => handleDeleteGroup(group._id)}
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
                {ageGroups.length === 0 && !isAgeGroupsLoading && (
                  <div className="text-center py-8 text-gray-500 font-medium">
                    No age groups found.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "add-background" && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col relative min-h-[300px]">
              {(isBannersLoading || isBannerUpdating) && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-2xl">
                  <Spin />
                </div>
              )}
              <h2 className="text-[20px] font-bold text-gray-900 mb-2">App Backgrounds</h2>
              <p className="text-[14px] text-gray-500 font-medium mb-8">Upload background images for different pages of the app.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {backgroundPages.map((page) => {
                  const localPreview = backgrounds[page.id];
                  const serverBanner = bannersMap[page.id];
                  const serverImageUrl = serverBanner?.image 
                    ? (serverBanner.image.startsWith('http') ? serverBanner.image : `${imageUrl}${serverBanner.image}`) 
                    : null;
                  
                  const displayImage = localPreview || serverImageUrl;

                  return (
                    <div key={page.id} className="border border-gray-100 rounded-2xl p-5 bg-[#F9FAFC] flex flex-col items-center text-center gap-4 hover:shadow-sm transition-all">
                      <h3 className="text-[16px] font-bold text-gray-900">{page.name}</h3>
                      
                      <div className="aspect-[9/16] w-[200px] mx-auto rounded-2xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center relative hover:border-blue-500 hover:shadow-md transition-all group">
                        {displayImage ? (
                          <>
                            <img src={displayImage} alt={`${page.name} bg`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setPreviewImage({ url: displayImage, title: page.name });
                                }}
                                className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-[#1239D4] hover:text-white transition-colors shadow-sm"
                                title="Preview"
                              >
                                <FiImage size={18} />
                              </button>
                              <label 
                                className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-[#1239D4] hover:text-white transition-colors shadow-sm cursor-pointer"
                                title="Edit Image"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FiEdit2 size={18} />
                                <input type="file" accept="image/*" onChange={(e) => handleBackgroundUpload(page.id, e)} className="hidden" />
                              </label>
                            </div>
                          </>
                        ) : (
                          <label className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 group-hover:text-[#1239D4] transition-colors cursor-pointer">
                            <FiImage size={32} />
                            <span className="text-[13px] font-medium flex items-center gap-2"><FiUpload size={14} /> Upload Image</span>
                            <input type="file" accept="image/*" onChange={(e) => handleBackgroundUpload(page.id, e)} className="hidden" />
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "privacy-policy" && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h2 className="text-[20px] font-bold text-gray-900 mb-6">Privacy Policy</h2>
              <div className="min-h-[500px]">
                <JoditEditor
                  ref={editorRef}
                  value={privacyPolicy}
                  config={editorConfig}
                  onBlur={newContent => setPrivacyPolicy(newContent)}
                  onChange={() => {}}
                />
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => handleSaveContent('Privacy Policy')}
                  className="bg-[#081A4A] hover:bg-[#07152F] text-white px-7 py-3 rounded-full flex items-center gap-2 text-[14px] font-bold shadow-md transition-all cursor-pointer active:scale-[0.98]"
                >
                  <FiCheck size={16} />
                  <span>Save Privacy Policy</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "terms-conditions" && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h2 className="text-[20px] font-bold text-gray-900 mb-6">Terms and Conditions</h2>
              <div className="min-h-[500px]">
                <JoditEditor
                  ref={editorRef}
                  value={termsConditions}
                  config={editorConfig}
                  onBlur={newContent => setTermsConditions(newContent)}
                  onChange={() => {}}
                />
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => handleSaveContent('Terms and Conditions')}
                  className="bg-[#081A4A] hover:bg-[#07152F] text-white px-7 py-3 rounded-full flex items-center gap-2 text-[14px] font-bold shadow-md transition-all cursor-pointer active:scale-[0.98]"
                >
                  <FiCheck size={16} />
                  <span>Save Terms & Conditions</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "about-us" && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <h2 className="text-[20px] font-bold text-gray-900 mb-6">About Us</h2>
              <div className="min-h-[500px]">
                <JoditEditor
                  ref={editorRef}
                  value={aboutUs}
                  config={editorConfig}
                  onBlur={newContent => setAboutUs(newContent)}
                  onChange={() => {}}
                />
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => handleSaveContent('About Us')}
                  className="bg-[#081A4A] hover:bg-[#07152F] text-white px-7 py-3 rounded-full flex items-center gap-2 text-[14px] font-bold shadow-md transition-all cursor-pointer active:scale-[0.98]"
                >
                  <FiCheck size={16} />
                  <span>Save About Us</span>
                </button>
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
        okButtonProps={{ 
          className: "bg-[#1239D4]",
          loading: isCreating || isUpdating
        }}
        centered
      >
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-gray-800">Minimum Age</label>
            <input
              type="number"
              placeholder="e.g. 17"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-gray-800">Maximum Age</label>
            <input
              type="number"
              placeholder="e.g. 19"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        title={`${previewImage?.title} Background Preview`}
        open={!!previewImage}
        onCancel={() => setPreviewImage(null)}
        footer={null}
        centered
        width={400}
      >
        {previewImage && (
          <img src={previewImage.url} alt="Preview" className="w-full rounded-xl" />
        )}
      </Modal>
    </div>
  );
};

export default AcademySettings;
