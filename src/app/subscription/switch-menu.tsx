// switch-menu.tsx
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

interface SwitchMenuProps {
  activeMenu: string;
  onChange: (menu: string) => void;
}

const SwitchMenu = ({ activeMenu, onChange }: SwitchMenuProps) => {
  return (
    <div className="relative w-fit mx-auto bg-gray-200 rounded-full p-1">
      <div
        className={clsx(
          "absolute top-1 left-1 h-[36px] w-[96px] rounded-full bg-primary-900 shadow transition-all duration-300 ease-in-out",
          activeMenu === 'seat' && 'translate-x-[104px]'
        )}
      />
      <div className="relative flex space-x-2 z-10">
        <Button
          variant="ghost"
          className={clsx(
            "w-[96px] h-[36px] text-sm font-medium transition-colors duration-300",
            "hover:bg-transparent hover:text-inherit hover:shadow-none",
            activeMenu === 'package' ? 'text-white' : 'text-primary-900'
          )}
          onClick={() => onChange('package')}
        >
          Package
        </Button>
        <Button
          variant="ghost"
          className={clsx(
            "w-[96px] h-[36px] text-sm font-medium transition-colors duration-300",
            "hover:bg-transparent hover:text-inherit hover:shadow-none",
            activeMenu === 'seat' ? 'text-white' : 'text-primary-900'
          )}
          onClick={() => onChange('seat')}
        >
          Seat
        </Button>
      </div>
    </div>
  );
};

export default SwitchMenu;
