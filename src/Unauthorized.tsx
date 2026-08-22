import { useNavigate } from "react-router-dom";
import { FiShieldOff } from "react-icons/fi";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8faff] p-6 text-center">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <FiShieldOff size={48} strokeWidth={1.5} />
      </div>
      
      <h1 className="text-[32px] font-bold text-gray-900 mb-3 leading-tight">
        Access Denied
      </h1>
      
      <p className="text-[16px] text-gray-500 font-medium max-w-md mb-8 leading-relaxed">
        You do not have the required permissions to view this page. If you believe this is a mistake, please contact your administrator.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-[#1239D4] hover:bg-blue-700 text-white px-8 py-3.5 rounded-full text-[15px] font-bold shadow-md shadow-blue-500/30 transition-all active:scale-[0.98]"
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default Unauthorized;
