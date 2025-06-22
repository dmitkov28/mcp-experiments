"use client";

import { processQuery } from "@/client";
import { FormEvent, useState } from "react";
import Markdown from "react-markdown";

type Message = {
  author: "ai" | "user";
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new FormData(e.target as HTMLFormElement).get(
      "query"
    ) as string;
    (e.target as HTMLFormElement).reset();
    setMessages((prev) => [...prev, { author: "user", text: query }]);
    
    const response = await processQuery(query);
    setMessages((prev) => [...prev, { author: "ai", text: response }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        {messages?.map((msg, idx) => {
          if (msg.author === "ai") {
            return <AIMessage key={idx} msg={msg.text} />;
          } else if (msg.author === "user") {
            return <UserMessage key={idx} msg={msg.text} />;
          }
          return null;
        })}
      </div>
      <div className="flex-none p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            name="query"
            autoComplete="off"
            className="flex-grow p-2 rounded-lg border border-gray-300"
            placeholder="Type your message..."
          />
          <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

const AIMessage = ({ msg }: { msg: string }) => {
  return (
    <div className="mb-4">
      <div className="w-full">
        <Markdown>
          {msg}
        </Markdown>
      </div>
    </div>
  );
};

const UserMessage = ({ msg }: { msg: string }) => {
  return (
    <div className="mb-4 text-right">
      <div className="bg-gray-300 p-2 rounded-lg w-fit ml-auto">{msg}</div>
    </div>
  );
};
