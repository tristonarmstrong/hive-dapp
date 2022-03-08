import './App.css';
import Chat from './chat'
import UserContextProvider from './user';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Chat />
      </UserContextProvider>
    </div>
  );
}

export default App;
