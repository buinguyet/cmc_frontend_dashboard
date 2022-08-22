import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import DashboardComponent from './components/DashboardComponent';
import { INITIAL_DATA } from './components/constant';

const socket = io('https://cmcbackendweb.azurewebsites.net');

function App() {
  // init socket
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div>
      < DashboardComponent socket={socket} initialData={INITIAL_DATA} />
    </div>
  )
}

export default App;
