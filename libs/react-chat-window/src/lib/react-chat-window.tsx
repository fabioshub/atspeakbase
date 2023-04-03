import styles from './react-chat-window.module.scss';

/* eslint-disable-next-line */
export interface ReactChatWindowProps {}

export function ReactChatWindow(props: ReactChatWindowProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactChatWindow!</h1>
    </div>
  );
}

export default ReactChatWindow;
