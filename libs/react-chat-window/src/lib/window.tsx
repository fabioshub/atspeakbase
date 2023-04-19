import React, { useEffect, useState } from 'react';
import { message } from './chat';
import styles from './react-chat-window.module.css';

export const Bubble = (props: message) => {
  const [time] = useState(props.time ? new Date(props.time) : new Date());

  return (
    <div
      className={`${styles['w-full']} ${styles['flex']} ${styles['p-2']} ${
        styles['px-6']
      } ${props.position === 'right' ? styles['justify-end'] : null}`}
    >
      <div
        className={`${styles['flex']} ${styles['items-end']} ${
          props.position === 'right' ? styles['fleqx-row-reverse'] : null
        }`}
      >
        <div
          className={`${
            props.position === 'right'
              ? `${styles[props.color || 'bg-indigo-500']} ${
                  styles['text-white']
                } ${styles['rounded-tr-xl']} ${styles['rounded-bl-xl']}`
              : `${styles['bg-gray-50']} ${styles['text-gray-800']} ${styles['rounded-tl-xl']} ${styles['rounded-br-xl']}`
          } ${styles['rounded-md']} ${styles['pt-5']} ${styles['pb-2']} ${
            styles['px-4']
          } ${styles['text-sm']} ${styles['font-normal']} ${
            styles['tracking-wide']
          }`}
          style={{
            maxWidth: '13rem',
            backgroundColor:
              props.position === 'right' ? props.manualColor : undefined,
          }}
        >
          <p className={`${styles['wordwrap']}`}>{props.text}</p>
          {props.time ? (
            <div
              style={{
                marginTop: '5px',
                fontWeight: 'bold',
                fontSize: '0.8rem',
              }}
            >
              {String(time.getHours()).padStart(2, '0')}:
              {String(time.getMinutes()).padStart(2, '0')}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

interface ChatWindowContainerProps {
  messagesRef: React.RefObject<HTMLDivElement>;
  messages: message[];
  chatId?: number;
  inputRef: React.RefObject<HTMLInputElement>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  sendMessage: () => void;
  isClosed: boolean;
  claimable?: () => void;
  disableInput?: boolean;
  agent?: string;
  setMini: () => void;
  position?: 'left' | 'right';
  orgInfo: {
    color?: string;
  };
  headerTitleText: string;
  headerSubtitleWaitingText: (p?: { agent?: string }) => string;
  headerSubtitleStartText: (p?: { agent?: string }) => string;
  headerSubtitleChatText: (p?: { agent?: string }) => string;
  closeElement: React.ReactNode;
  sendText: string;
  messageBoxPlaceholderText: string;
  color?: string;
  onMessageSent?: (message: string) => void;
}

export const ChatWindowContainer = (props: ChatWindowContainerProps) => {
  useEffect(() => {
    props.messagesRef?.current?.scrollTo({ top: 10000000000 });
  }, [props.isClosed]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.sendMessage();
      if (props.onMessageSent) {
        props.onMessageSent(props.message);
        props.setMessage('');
      }
    }
  };

  return (
    <div
      style={{
        width: '300px',
        borderRadius: '10px 10px 10px 10px',
        maxHeight: 'calc(100vh - 80px)',
        height: '600px',
      }}
      className={`${styles['fixed']} ${styles['bottom-10']} 
         
       ${styles['flex']} ${styles['flex-col']} ${styles['bg-white']} ${
        styles['shadow']
      }
            ${
              props.position === 'right' || props.position === undefined
                ? styles['right-10']
                : styles['left-10']
            }
        `}
    >
      <div
        className={`${styles['w-full']}  ${styles['bg-gray-50']} ${styles['flex']} ${styles['relative']} ${styles['justify-center']} ${styles['p-7']} ${styles['flex-col']} ${styles['font-semibold']} ${styles['border-b-2']} ${styles['border-slate-50']}`}
        style={{ borderRadius: '10px 10px 0 0 ' }}
      >
        <div
          className={`${styles['absolute']}`}
          onClick={() => {
            props.setMini();
          }}
          style={{
            top: '0.5rem',
            right: '0.5rem',
            fontSize: '0.7rem',
            cursor: 'pointer',
          }}
        >
          {props.closeElement}
        </div>
        <p className={`${styles['m-0']} ${styles['p-0']}`}>
          {props.headerTitleText}
        </p>
        {props.agent?.length ? (
          <p
            className={`${styles['m-0']} ${styles['p-0']} ${styles['text-xs']}`}
          >
            {' '}
            {props.headerSubtitleChatText({ agent: props.agent })}
          </p>
        ) : !props.agent?.length && props.messages.length && !props.isClosed ? (
          <p
            className={`${styles['m-0']} ${styles['p-0']} ${styles['text-xs']}`}
          >
            {' '}
            {props.headerSubtitleWaitingText({ agent: props.agent })}
          </p>
        ) : (
          <p
            className={`${styles['m-0']} ${styles['p-0']} ${styles['text-xs']}`}
          >
            {' '}
            {props.headerSubtitleStartText({ agent: props.agent })}
          </p>
        )}
      </div>
      <div
        className={`${styles['overflow-auto']} ${styles['pt-3']}`}
        ref={props.messagesRef}
        style={{ height: '100%' }}
      >
        {props.messages.map((m, i) => {
          return (
            <Bubble
              {...m}
              color={props.orgInfo.color}
              manualColor={props.color}
            />
          );
        })}
        {props.isClosed ? (
          <div
            className={`${styles['w-full']} ${styles['text-xs']} ${styles['flex']} ${styles['justify-center']} ${styles['back']}`}
          >
            chat closed
          </div>
        ) : null}
      </div>
      <div
        className={`${styles['w-full']} ${styles['p-5']} ${styles['flex']} ${styles['bg-white']}`}
        style={{ borderRadius: '0 0 10px 10px' }}
      >
        <input
          ref={props.inputRef}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            props.setMessage(e.target.value);
          }}
          type="text"
          name="name"
          id="name"
          className={`${styles['block']} ${styles['w-full']} ${styles['mr-3']} ${styles['rounded-xl']} ${styles['border-0']} ${styles['px-4']} ${styles['py-1.5']} ${styles['focus:ring-0']} ${styles['font-semibold']} ${styles['focus:ring-green']} ${styles['placeholder:text-gray-400']} ${styles['sm:text-sm']} ${styles['sm:leading-6']}`}
          placeholder={props.messageBoxPlaceholderText}
          value={props.message}
        />
        <button
          onClick={() => {
            props.sendMessage();
            if (props.onMessageSent) {
              props.onMessageSent(props.message);
              props.setMessage('');
            }
          }}
          className={`${styles['inline-flex']} ${styles['items-center']} ${styles['gap-x-1.5']} ${styles['rounded-full']} ${styles['bg-gray-100']} ${styles['px-2.5']} ${styles['py-1.5']} ${styles['text-xs']} ${styles['font-semibold']} ${styles['shadow-sm']} ${styles['hover:bg-gray-200']} ${styles['focus-visible:outline']} ${styles['focus-visible:outline-2']} ${styles['focus-visible:outline-offset-2']} ${styles['focus-visible:outline-slate-600']}`}
        >
          {props.sendText}
        </button>
      </div>
    </div>
  );
};
