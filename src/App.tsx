import { Navbar } from '@material-tailwind/react';
import { Outlet } from 'react-router-dom';
import { NavbarDefault } from './components/layout/navbar/Navbar';
import '@/App.css';

function App() {
  return (
    <div>
      <NavbarDefault />
      <div className="flex flex-col w-3/4 mx-auto gap-y-8">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
