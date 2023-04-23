import { ChatWindow, socket } from '@speakbase/react-chat-window';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './app.module.scss';
import logo from './speakbaselogowhite.png';

export function App() {
  const [input, setInput] = useState('');
  const [tokenViaUrl, setTokenViaUrl] = useState(false);
  const [set, isSet] = useState(false);
  const [search] = useSearchParams();

  useEffect(() => {
    let token = search.get('token');

    if (!token?.length) {
      token = localStorage.getItem('token');
    } else {
      setTokenViaUrl(true);
      if (socket) {
        socket.disconnect();
        socket.connect();
      }
      localStorage.setItem('token', input);
      isSet(true);
    }

    if (token?.length) {
      setInput(token || '');
    }
  }, []);

  return (
    <>
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0',
          padding: '0',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '100vw',
            padding: '0 10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '600px',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            <img
              src={logo}
              style={{ maxWidth: '60px', marginBottom: '20px' }}
            ></img>
            <h3 style={{ padding: '0', margin: '0 0 10px 0' }}>
              {!tokenViaUrl
                ? 'Enter your business token'
                : 'Welcome to Speakbase'}
            </h3>
            <p style={{ maxWidth: '300px' }}>
              You can signup for a free dashboard at{' '}
              <a
                style={{ fontWeight: 'bold' }}
                href="https://speakbase.com/signup?redirect=/dashboard"
              >
                speakbase.com
              </a>{' '}
              and obtain your token. Once entered, the chat window will appear.
            </p>
          </div>
          {!tokenViaUrl ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="42888ed4-6102-4e15-85bd-4ef33d1487b5"
              ></input>
              <button
                style={{ marginTop: '20px' }}
                onClick={() => {
                  if (socket) {
                    socket.disconnect();
                    socket.connect();
                  }
                  localStorage.setItem('token', input);
                  isSet(true);
                }}
                className={styles['submitbutton']}
              >
                Initialize chat window
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {/* The rest of your app */}
      {set ? (
        <ChatWindow
          position="left"
          token={input.length ? input : '42888ed4-6102-4e15-85bd-4ef33d1487b5'}
          key={input}
        />
      ) : null}
    </>
  );
}

export default App;
