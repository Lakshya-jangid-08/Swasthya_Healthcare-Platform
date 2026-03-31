import React, { useState } from "react";
import { addedAmount } from "../../../service/apis";
import { useAuth } from "../../../context/AuthContext";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddMoney() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleAddMoney = async () => {
    try {
      setLoading(true);
      const res = await addedAmount({ amount });
      const data = res.data;
      
      setUser(prev => ({
        ...prev,
        walletBalance: data.walletBalance
      }));
      
      alert(data.msg);
      setAmount("");
      navigate("/doctor/payments-status");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (val) => {
    if (val === "clear") {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount((prev) => prev + val);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      
      <div className="bg-gradient-to-b from-blue-500 to-blue-800 text-white p-8 rounded-2xl shadow-2xl w-[700px] flex gap-8">
        
        {/* LEFT PANEL */}
        <div className="flex-1 flex flex-col justify-between">
          
          <div>
            <h2 className="text-lg mb-4">
              Please enter the amount you would like and then touch Enter.
            </h2>

            {/* DISPLAY */}
            <div className="bg-blue-700 rounded-lg px-4 py-3 text-2xl flex justify-between items-center">
              <span> <FaRupeeSign/> </span>
              <span>{amount || "0"}</span>
            </div>

            <p className="text-sm mt-4">
              This machine dispenses ₹100 and ₹500 notes.
            </p>
          </div>

          {/* ENTER BUTTON */}
          <button
            onClick={handleAddMoney}
            disabled={loading}
            className="mt-6 bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            {loading ? "Processing..." : "Enter"}
          </button>

          {/* BOTTOM BUTTONS */}
          <div className="flex justify-between mt-6">
            <button className="bg-gray-200 text-black px-4 py-2 rounded-lg" onClick={() => navigate(-1)}>
              ⬅ Back
            </button>
          </div>
        </div>

        {/* RIGHT PANEL - KEYPAD */}
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3,4,5,6,7,8,9].map((num) => (
            <button
              key={num}
              onClick={() => handleClick(num.toString())}
              className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-xl font-bold shadow-lg"
            >
              {num}
            </button>
          ))}

          <div></div>

          <button
            onClick={() => handleClick("0")}
            className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-xl font-bold shadow-lg"
          >
            0
          </button>

          <button
            onClick={() => handleClick("clear")}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-xl font-bold shadow-lg"
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMoney;