import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../config";

export default function Sidebar() {
  const [chatList, setChatList] = useState([]);
  const userInfo = JSON.parse(localStorage.loginData);
  const navigate = useNavigate();

  console.log("User Info", userInfo);

  useEffect(() => {
    const getList = async () => {
      const data = await baseUrl.get(`/chat/${userInfo?._id}`);
      setChatList(data.data);
    };
    getList();
  }, [userInfo?._id]);

  const handleChatMessage = (chatId) => {
    navigate(`/chat/${chatId}`);
  };
  return (
    <div className="col-span-3 bg-indigo-200 p-5 h-[calc(100vh-25px)] rounded-lg">
      {chatList?.map((chat) => (
        <div
          key={chat?._id}
          className="bg-indigo-500 text-white cursor-pointer p-2 rounded mb-2"
          onClick={() => handleChatMessage(chat?._id)}
        >
          {chat?.participants?.map(
            (user) =>
              user._id !== userInfo?._id && <h2 key={user._id}>{user.name}</h2>
          )}
        </div>
      ))}
    </div>
  );
}
