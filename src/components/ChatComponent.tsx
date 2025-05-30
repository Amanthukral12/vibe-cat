import { useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";
import { initialChats } from "../constants/chatMessages";

const Chat = () => {
  const [chats, setChats] = useState(initialChats);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendGif = () => {
    const newMessage = {
      id: chats.length + 1,
      text: "./assets/animated/7.gif",
      sender: "user",
      type: "gif",
      countryCode: "us",
    };
    setChats([...chats, newMessage]);
  };

  const getFlagUrl = (code: string) =>
    `https://flagcdn.com/48x36/${code.toLowerCase()}.png`;

  return (
    <div className="relative h-[500px] w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 bg-white/20 text-white flex justify-center items-center font-semibold rounded-t-xl border-b border-white/10">
        <IoChatbubbleSharp className="mr-2" />
        Chat
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-end gap-2 ${
              chat.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {chat.sender === "other" && (
              <img
                src={getFlagUrl(chat.countryCode)}
                alt="flag"
                className="w-6 h-6 rounded-full"
              />
            )}

            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                chat.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {chat.type === "gif" ? (
                <img src={chat.text} alt="gif" className="rounded-md" />
              ) : (
                chat.text
              )}
            </div>

            {chat.sender === "user" && (
              <img
                src={getFlagUrl(chat.countryCode)}
                alt="flag"
                className="w-6 h-6 rounded-full"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 border-t border-white/10 bg-white/20 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-md bg-white/70 text-black text-sm focus:outline-none"
          disabled
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm opacity-60 cursor-not-allowed">
          <FaPaperPlane />
        </button>
      </div>

      {/* Floating GIF Send Button */}
      <button
        onClick={sendGif}
        className="absolute bottom-20 right-4  text-white  rounded-full shadow-lg  transition"
        title="Send GIF"
      >
        <img
          src="./assets/animated/7.gif"
          alt="vibe cat gif"
          className="h-8 w-8"
        />
      </button>
    </div>
  );
};

export default Chat;
