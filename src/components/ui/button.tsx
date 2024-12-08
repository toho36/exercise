import { Button } from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/alert';

interface IButtonDefaultProps {
  color?: color;
  text: string;
  variant?: 'filled' | 'outlined' | 'text';
  image?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * A customizable button component that wraps Material Tailwind's Button component.
 * It allows customization of color, text, icon, variant, type, and the `onClick` event.
 *
 * @param {string} [color='blue'] - The color of the button. Defaults to 'blue'.
 * @param {string} text - The text displayed on the button.
 * @param {'filled' | 'outlined' | 'text'} [variant='filled'] - The variant of the button (filled, outlined, or text).
 * @param {string} [image] - The URL of an image/icon to display alongside the text.
 * @param {'button' | 'submit' | 'reset'} [type='button'] - The button type (button, submit, or reset).
 * @param {() => void} [onClick] - The click handler for the button.
 * @param {boolean} [disabled=false] - Whether the button is disabled.
 *
 * @example
 * // A button with text and an icon
 * <ButtonDefault text="Click Me" image="/path/to/icon.svg" onClick={handleClick} />
 *
 * @returns {JSX.Element} A button element with the specified props.
 */
export function ButtonDefault({
  color = 'blue',
  text,
  variant = 'filled',
  image,
  type = 'button',
  onClick,
  disabled = false,
}: IButtonDefaultProps) {
  return (
    <Button
      variant={variant}
      color={color}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2"
    >
      {image && <img src={image} alt="icon" className="w-5 h-5" />}
      {text}
    </Button>
  );
}
