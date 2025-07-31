import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import baseUrl from "../../config";

const Chat = () => {
  const [messageList, setMessageList] = useState([]);
  const userInfo = JSON.parse(localStorage.loginData);
  const [text, setText] = useState("");
  const { chatId } = useParams();
  console.log("Chat ID", chatId);
  const socket = useMemo(() => io("http://localhost:5000"), []);

  useEffect(() => {
    socket.emit("joinChat", chatId);
    const getMessageList = async () => {
      const res = await baseUrl.get(`/message/${chatId}`);
      setMessageList(res.data);
    };

    getMessageList();

    const receiveMessageHandler = (newMessage) => {
      setMessageList((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("receiveMessage", receiveMessageHandler);

    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  }, [chatId, socket]);

  const handleSendMessage = () => {
    console.log(text);
    const data = {
      chatId,
      senderId: userInfo._id,
      text,
    };
    socket.emit("sendMessage", data);
  };

  return (
    <div className="">
      <div className="bg-indigo-500 h-14 rounded-t-lg p-2 flex items-center text-white font-semibold text-xl">
        Name
      </div>
      <div className="p-4">
        <div className="h-[830px] overflow-y-scroll flex flex-col gap-2">
          {messageList.map((message) => (
            <div
              key={message._id}
              className={`flex  ${
                message.senderId !== userInfo._id
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.senderId !== userInfo._id
                    ? "bg-blue-200 text-left"
                    : "bg-green-200 text-right"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="w-full border border-indigo-500 rounded-md h-12 p-2"
            placeholder="Enter message"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="bg-indigo-500 text-white px-5 py-3 rounded-md"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
