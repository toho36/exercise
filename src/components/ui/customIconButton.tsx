import { IconButton } from '@material-tailwind/react';

interface ICustomIconButtonProps {
  iconClass: string;
  onClick: () => void; // Add onClick to the props
}

/**
 * A custom icon button component that wraps Material Tailwind's IconButton.
 * It accepts a custom icon class for the icon and an `onClick` handler.
 *
 * @param {string} iconClass - The class for the icon to be displayed.
 * @param {() => void} onClick - The function to be called when the button is clicked.
 *
 * @example
 * // A custom icon button with a "heart" icon
 * <CustomIconButton iconClass="fa-solid fa-heart" onClick={handleClick} />
 *
 * @returns {JSX.Element} An IconButton element with the specified icon and click handler.
 */
export function CustomIconButton({ iconClass, onClick }: ICustomIconButtonProps) {
  return (
    <div>
      <IconButton variant="text" onClick={onClick} placeholder="Your placeholder text">
        <i className={iconClass}></i>
      </IconButton>
    </div>
  );
}
