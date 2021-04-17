import React, { useEffect, useRef } from "react";
import * as mui from "@material-ui/core";
import moment from "moment";
import ChatMessage from "./ChatMessage";
import SendIcon from "@material-ui/icons/Send";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import CloseIcon from "@material-ui/icons/Close";
import useChatWindowData from "../hooks/useChatWindowData";

export default function ChatWindow({ user }) {
  const {
    messages,
    chatInfo,
    handleSubmit,
    showEmojis,
    showEmojiKeyboard,
    onEmojiClick,
    input,
    setInput,
  } = useChatWindowData();
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  const parsedMessages = messages.map((message) => {
    return <ChatMessage key={message._id} user={user} message={message} />;
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const setFocus = () => {
    messageInputRef.current.focus();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <section className="chatWindow">
        <p className="chatWindow__match">
          You matched {moment(chatInfo.created_at).fromNow()}
        </p>
        {parsedMessages}
        <div ref={messagesEndRef} />
        <form onSubmit={handleSubmit} className="chatWindow__messageInput">
          {showEmojis ? (
            <div>
              <mui.Button
                style={{
                  backgroundColor: "transparent",
                  position: "fixed",
                  bottom: "325px",
                }}
                onClick={showEmojiKeyboard}
              >
                <CloseIcon />
                close
              </mui.Button>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          ) : (
            <mui.Button
              style={{ backgroundColor: "transparent" }}
              onClick={showEmojiKeyboard}
            >
              <EmojiEmotionsIcon className="chatWindow__inputButton" />
            </mui.Button>
          )}
          <div className="chatWindow__messageInputText">
            <mui.Input
              ref={messageInputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message here"
              disableUnderline={true}
              required={true}
              fullWidth={true}
              autoFocus={true}
              inputProps={{ style: { fontSize: 20 } }}
            ></mui.Input>
          </div>
          <mui.Button style={{ backgroundColor: "transparent" }} type="submit">
            <SendIcon className="chatWindow__inputButton" />
          </mui.Button>
        </form>
      </section>
    </div>
  );
}
