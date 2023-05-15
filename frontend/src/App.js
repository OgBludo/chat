
import { Button } from '@chakra-ui/react';
import './App.css';
import { Route,Routes } from 'react-router-dom/cjs/react-router-dom.min';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    < >
      <Route path='/' component={HomePage} exact>

      </Route>
      <Route path='/chats'component={ChatPage}>
        
      </Route>
    </>
  );
}

export default App;
