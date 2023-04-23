import { ChatWindow } from '@speakbase/react-chat-window'; // Add the import
import '@speakbase/react-chat-window/index.css';

export function App() {
  // const [input, setInput] = useState('');
  // const [tokenViaUrl, setTokenViaUrl] = useState(false);
  // const [set, isSet] = useState(false);
  // const [search] = useSearchParams();

  // useEffect(() => {
  //   let token = search.get('token');

  //   if (!token?.length) {
  //     token = localStorage.getItem('token');
  //   } else {
  //     setTokenViaUrl(true);
  //     if (socket) {
  //       socket.disconnect();
  //       socket.connect();
  //     }
  //     localStorage.setItem('token', input);
  //     isSet(true);
  //   }

  //   if (token?.length) {
  //     setInput(token || '');
  //   }
  // }, []);

  return (
    <ChatWindow token="6d213cc6-7ef5-4dc2-acb0-38f4c6ead906" position="right" />
  );
}

export default App;
