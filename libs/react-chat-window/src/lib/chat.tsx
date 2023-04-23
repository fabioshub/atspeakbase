import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { v4 } from 'uuid';
import styles from './react-chat-window.module.css';
import { ChatWindowContainer } from './window';

export let socket: Socket;

interface chat {
  id: number;
  agent?: string;
  data: {
    message: string;
    createdAt: string;
    id: number;
    socketUserId: string;
    socketUser?: {
      clientId: string;
    };
  }[];
  status: string;
}

export interface message {
  id: number;
  text: string;
  position: 'left' | 'right';
  time?: string;
  color?: string;
  manualColor?: string;
}

export interface ChatWindowProps {
  token?: string;
  position?: 'left' | 'right';
  rightMessagesBackgroundColor?: string;
  headerTitleText?: string;
  headerSubtitleText?: string;
  closeElement?: React.ReactNode;
  sendText?: string;
  messageBoxPlaceholderText?: string;
  messages?: message[];
  onMessageSent?: (message: string) => void;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface org {
  color?: string;
  headerTitleText?: string;
  headerSubtitleWaitingText?: string;
  headerSubtitleStartText?: string;
  headerSubtitleChatText?: string;
  closeElement?: React.ReactNode;
  sendText?: string;
  messageBoxPlaceholderText?: string;
}

export const ChatWindow = (props: ChatWindowProps) => {
  return <MessageWindow {...props} />;
};

export const MessageWindow = (props: ChatWindowProps) => {
  const [closed, setClosed] = useState(false);
  const [initial, setInitial] = useState(false);
  const [mayLoad, setMayLoad] = useState(false);
  const [orgInfo, setOrgInfo] = useState<org>({});
  const [minimized, setMini] = useState(false);
  const closedRef = React.useRef<boolean>(closed);
  const [message, setMessage] = useState('');
  const chatRef = React.useRef<number>(0);
  const [agent, setAgent] = useState<string>('');
  const [messages, setMessages] = useState<message[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const messagesRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let clientId = localStorage.getItem('clientId');
    if (!clientId) {
      clientId = v4();
      localStorage.setItem('clientId', clientId);
    }
    if ((!mayLoad && !initial) || !props.token) {
      return;
    }
    console.log('connecting', 'https://chat.speak-base.com');
    socket = io('https://chat.speak-base.com', {
      transports: ['websocket'],
      auth: {
        token: props.token,
        clientId,
      },
    });
    socket.on('orgInfo', (o: typeof orgInfo) => {
      console.log('info');
      setOrgInfo(o);
    });
    socket.on('claimed', (data: any) => {
      setAgent(data.agent);
      chatRef.current = data.chatId;
    });
    socket.on('history', (data: chat) => {
      chatRef.current = data.id;
      if (data.agent) {
        setAgent(data.agent);
      }
      if (closed) {
        setMessages([]);
        setClosed(false);
      }
      data?.data?.forEach((m) => {
        setMessages((prevMessages) => {
          let found = false;
          prevMessages.forEach((p) => {
            if (p.id === m.id) {
              p.text = m.message;
              found = true;
            }
          });

          if (found) {
            return prevMessages;
          }

          return [
            ...prevMessages,
            {
              id: m.id,
              text: m.message,
              position: m.socketUserId === clientId ? 'right' : 'left',
              time: new Date(m.createdAt).toISOString(),
            } as message,
          ];
        });
      });
    });
    socket.on('chatClosed', (data) => {
      if (data.chatId === chatRef.current) {
        setClosed(true);
        closedRef.current = true;
        setAgent('');
      }
    });
    setInitial(true);
  }, [mayLoad]);

  const sendMessage = () => {
    if (message === '' || !socket) {
      return;
    }
    if (closed) {
      setMessages([]);
      setClosed(false);
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: message,
        position: 'right',
        time: new Date().toISOString(),
      } as message,
    ]);
    setMessage('');
    inputRef.current?.focus();
    socket.emit('message', { message });
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({ top: 10000000000 });
    }
  }, [messages]);

  useEffect(() => {
    if (props.open !== undefined) {
      setMini(!props.open);
    }
  }, [props.open]);

  useEffect(() => {
    if (props.open === true) {
      setMayLoad(true);
    }
  }, []);

  if (!mayLoad || minimized) {
    return (
      <div
        style={{ width: '150px', borderRadius: '10px' }}
        onClick={() => {
          if (props.open === undefined) {
            setMini(false);
            setMayLoad(true);
          }
          if (props.onOpen) {
            props.onOpen();
          }
        }}
        className={`${styles['fixed']} ${styles['cursor-pointer']} ${
          styles['bottom-10']
        } ${
          props.position === 'right' || props.position === undefined
            ? styles['right-10']
            : styles['left-10']
        } ${styles['shadow']}`}
      >
        <div
          className={`${styles['w-full']} ${styles['bg-gray-50']} ${styles['flex']}`}
          style={{ borderRadius: '10px' }}
        >
          <div
            className={`${styles['w-10']} ${styles['h-10']} ${styles['flex']} ${styles['justify-center']} ${styles['items-center']}`}
            style={{ borderRight: ' 1px solid #e5e7eb', padding: '10px' }}
          >
            <ChatBubbleLeftRightIcon className={`${styles['w-2']}`} />
          </div>
          <div
            className={`${styles['w-full']} ${styles['flex']} ${styles['justify-center']} ${styles['items-center']}`}
            style={{
              // textTransform: 'uppercase',
              fontSize: '13px',
              fontWeight: 'semibold',
            }}
          >
            Chat
          </div>
        </div>
      </div>
    );
  }

  return (
    <ChatWindowContainer
      sendText={props.sendText || orgInfo.sendText || 'Send'}
      messageBoxPlaceholderText={
        props.messageBoxPlaceholderText ||
        orgInfo.messageBoxPlaceholderText ||
        'Type a message...'
      }
      closeElement={props.closeElement || orgInfo.closeElement || 'close'}
      headerTitleText={
        props.headerTitleText || orgInfo.headerTitleText || 'Customer support'
      }
      headerSubtitleWaitingText={
        (orgInfo.headerSubtitleWaitingText
          ? () => orgInfo.headerSubtitleWaitingText as string
          : null) ||
        (props.headerSubtitleText
          ? () => props.headerSubtitleText as string
          : null) ||
        (() => `We're connecting you to an agent.`)
      }
      headerSubtitleStartText={
        (orgInfo.headerSubtitleStartText
          ? () => orgInfo.headerSubtitleStartText as string
          : null) ||
        (props.headerSubtitleText
          ? () => props.headerSubtitleText as string
          : null) ||
        (() => `We'll connect you when you start typing.`)
      }
      headerSubtitleChatText={
        (orgInfo.headerSubtitleChatText
          ? () => orgInfo.headerSubtitleChatText as string
          : null) ||
        (props.headerSubtitleText
          ? () => props.headerSubtitleText as string
          : null) ||
        ((p?: { agent?: string }) => `Chatting with ${p?.agent}`)
      }
      orgInfo={orgInfo}
      color={props.rightMessagesBackgroundColor}
      position={props.position}
      setMini={() => {
        if (props.open === undefined) {
          setMini(true);
        }
        if (props.onClose) {
          props.onClose();
        }
      }}
      sendMessage={sendMessage}
      message={message}
      messages={props.messages || messages}
      setMessage={setMessage}
      inputRef={inputRef}
      messagesRef={messagesRef}
      isClosed={closed}
      chatId={chatRef.current}
      agent={agent}
      onMessageSent={props.onMessageSent}
    />
  );
};
