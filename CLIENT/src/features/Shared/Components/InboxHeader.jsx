// InboxHeader.jsx
import React, { useEffect, useState } from "react";
import { getUserDataApi } from "../../../service/apis";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function InboxHeader({ ReceiverId }) {
  const [receiver, setReceiver] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserDataApi(ReceiverId);
      setReceiver(res.data.user);
    };
    if (ReceiverId) fetchUser();
  }, [ReceiverId]);

  if (!receiver) return null;

  return (
    <div className="flex items-center justify-between px-5 py-3 border-b bg-white">

      <div className="flex items-center gap-3">
        <img src={receiver.profileImage} className="h-10 w-10 rounded-full ring ring-black" />
        <div>
          <h1 className="font-semibold text-xl">{receiver.fullname}</h1>
          <p className="text-sm text-gray-500">{receiver.contactNumber}</p>
        </div>
      </div>

      <MdCancel
        className="text-gray-500 text-lg cursor-pointer hover:text-red-500"
        onClick={() => nav("/inbox")}
      />
    </div>
  );
}

export default InboxHeader;