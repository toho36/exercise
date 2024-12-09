import React from 'react';
import { Avatar, Typography } from '@material-tailwind/react';
import type { NavbarProps } from '@material-tailwind/react';
import Logo from '@/assets/images/logo.svg';
import { ButtonDefault } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AvatarDefault } from '../avatar/Avatar';
import { useStore } from '@/store/store';

/**
 * A functional React component that renders a default navigation bar for the application.
 * The navigation bar displays links to different pages and adjusts its content based on the user's authentication state.
 *
 * This component includes:
 * - A logo and navigation links (e.g., Recent Articles, About).
 * - Conditional links and actions (e.g., My Articles, Create Articles, Log Out) when the user is authenticated.
 * - A login button when the user is not authenticated.
 * - Responsive behavior to collapse the navigation on smaller screens.
 *
 * @returns {JSX.Element} A responsive and dynamic navigation bar.
 */
export function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const isAuthenticated = useStore(state => !!state.authData);
  const setAuthData = useStore(state => state.setAuthData);
  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);
  return (
    <div className="w-full mx-auto py-2 border-b-2 bg-blue-gray-50">
      <div className="w-3/4 mx-auto flex items-center justify-between  text-blue-gray-900">
        <div className="flex gap-4">
          <Link to={'/'} className="flex gap-4">
            <img src={Logo} />
            <Typography
              className="mr-4 cursor-pointer py-2 font-medium"
              placeholder="Material Tailwind"
            >
              Recent Articles
            </Typography>
          </Link>
          <Link to={'/404'} className="flex gap-4">
            <Typography
              className="mr-4 cursor-pointer py-2 font-medium"
              placeholder="Material Tailwind"
            >
              About
            </Typography>
          </Link>
        </div>
        <div className="flex gap-5">
          {isAuthenticated && (
            <>
              <Link to={'/my-articles'}>
                <Typography
                  className="mr-4 cursor-pointer py-2 font-medium"
                  placeholder="Material Tailwind"
                >
                  My Articles
                </Typography>
              </Link>
              <Link to={'/create-article'}>
                <Typography
                  className="mr-4 cursor-pointer py-2 font-medium text-blue-600"
                  placeholder="Material Tailwind"
                >
                  Create Articles
                </Typography>
              </Link>
              <AvatarDefault />
              <ButtonDefault
                variant="text"
                text="log out"
                color="red"
                onClick={() => setAuthData(null)}
              ></ButtonDefault>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to={'/login'}>
                <ButtonDefault variant="text" text="log in" color="blue"></ButtonDefault>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
