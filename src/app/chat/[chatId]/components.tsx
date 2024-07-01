'use client'

import React, { useEffect, useState } from "react";
import TextBox from "../_components/TextBox";
import InitialChat from "../_components/InitialChat";
import ChatSection from "../_components/ChatSection";
import { useChat } from "ai/react";
import UploadedFile from "../_components/UploadedFile";
import { ChatDetails } from "@/lib/types";
import { sendMessage } from "@/actions/ai.action";

type IndividualChatPageProps = {
  chatDetails: ChatDetails | null;
};

export const IndividualChatPage = ({
  chatDetails,
}: IndividualChatPageProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>(chatDetails?.messages ?? []);

  const handleSubmit = async () => {
    const res = await sendMessage({
      message: input,
      type: "text",
      chatId: chatDetails?.id ?? "",
    });

    console.log(res);

    if (res?.data) {
      setMessages((prev) => [...messages, res.data as any]);
      setInput("");
    }
  };

  return (
    <div className=" ml-5 h-full">
      <div className=" h-3/4 flex justify-center items-center">
        <ChatSection messages={messages} />
      </div>

      <div className="h-1/4 flex flex-col gap-8 items-center justify-end">
        <TextBox
          chatId={chatDetails?.id ?? ""}
          setMessages={setMessages}
          input={input}
          handleInputChange={(e) => setInput(e.target.value)}
          handleSubmit={handleSubmit}
        />
        <p className=" text-[#7D7D7D] font-inter text-sm font-normal">
          Free development preview. Rune may produce inaccurate information
          about people, places or facts.
        </p>
      </div>
    </div>
  );
};

