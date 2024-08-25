"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { SendIcon, SquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/text-area";

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/chatbot",
    });

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-[672px] mx-auto bg-background rounded-lg shadow-lg">
      <div className="flex-1 overflow-auto p-6">
        {messages.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_PW2BsuN_3oL96einYF1zuZdMrTO7MTbXLw&s'
              alt='Singapore Food Bank Portal'
              className='w-64 h-64 object-cover rounded-lg'
            />
            <p className="text-lg text-muted-foreground mt-4">
              Welcome to the Chatbot! Ask me anything.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-4">
          {messages.map((message) =>
            message.role === "assistant" ? (
              <div key={message.id} className="flex items-start gap-3">
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_PW2BsuN_3oL96einYF1zuZdMrTO7MTbXLw&s'
                    alt='Singapore Food Bank Portal'
                    className='w-10 h-10 object-cover rounded-lg'
                />
                <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                  <Markdown className="text-sm text-muted-foreground">
                    {message.content}
                  </Markdown>
                </div>
              </div>
            ) : (
              <div key={message.id} className="flex justify-end">
                <div className="bg-primary rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm text-primary-foreground">
                    {message.content}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-muted/50 px-4 py-3 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="Type your message..."
            className="rounded-lg pr-12 min-h-[64px]"
            rows={1}
            value={input}
            onChange={handleInputChange}
          />

          {!isLoading ? (
            <Button
              type="submit"
              size="icon"
              disabled={!input || isLoading}
              className="absolute bottom-3 right-3 rounded-full"
            >
              <SendIcon className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              disabled={!isLoading}
              onClick={stop}
              className="absolute bottom-3 right-3 rounded-full"
            >
              <SquareIcon className="w-5 h-5" fill="white" />
              <span className="sr-only">Send</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}