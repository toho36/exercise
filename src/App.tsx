import { Navbar } from '@material-tailwind/react';
import { Outlet } from 'react-router-dom';
import { NavbarDefault } from './components/layout/navbar/Navbar';
import '@/App.css';

function App() {
  return (
    <div>
      <NavbarDefault />
      <div className="mx-auto flex w-3/4 flex-col gap-y-8">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
