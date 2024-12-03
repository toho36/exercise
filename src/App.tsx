import { Navbar } from '@material-tailwind/react';
import { Outlet } from 'react-router-dom';
import { NavbarDefault } from './components/layout/navbar/Navbar';
import '@/App.css';

function App() {
  return (
    <div className="flex flex-col w-3/4 mx-auto gap-y-8">
      <NavbarDefault />
      <Outlet />
    </div>
  );
}

export default App;
