import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Search,
  Menu as MenuIcon, // Sidebar toggle
  Globe2, // Language
  Grid3x3, // Apps
  Maximize, // Fullscreen
  Moon, // Theme toggle (assuming dark mode is active, shows Moon)
  Bell,
  User as UserIcon,
  Settings,
  LogOut,
  LifeBuoy
} from 'lucide-react';

interface TopHeaderProps {
  onToggleSidebar?: () => void;
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar, className }) => {
  // Dummy data for notifications and user
  const notifications = [
    { id: '1', text: 'New order received', time: '3 min ago' },
    { id: '2', text: 'Server #1 overloaded.', time: '1 hr ago' },
    { id: '3', text: 'New user registered.', time: '2 hrs ago' },
  ];
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    // In a real app, you'd also apply this to document.documentElement.classList
  };

  return (
    <header className={cn('fixed top-0 left-0 md:left-64 right-0 h-16 bg-card text-card-foreground flex items-center justify-between px-6 shadow-sm z-10 border-b', className)}>
      <div className="flex items-center">
        {/* Hamburger menu for mobile / toggle for fixed sidebar (optional) */}
        <Button variant="ghost" size="icon" className="mr-4 md:hidden" onClick={onToggleSidebar}>
          <MenuIcon className="h-6 w-6" />
        </Button>
        {/* Search Bar - simplified for this component */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-10 w-64" />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe2 className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Español</DropdownMenuItem>
            <DropdownMenuItem>Français</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Apps */}
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Grid3x3 className="h-5 w-5" />
        </Button>

        {/* Fullscreen Toggle */}
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex" onClick={() => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()}>
          <Maximize className="h-5 w-5" />
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Settings className="h-5 w-5" /> /* Sun icon is Settings in provided image or use Sun from lucide */}
        </Button>

        {/* Notification Bell */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map(notif => (
              <DropdownMenuItem key={notif.id} className="flex flex-col items-start">
                <p className="text-sm font-medium">{notif.text}</p>
                <p className="text-xs text-muted-foreground">{notif.time}</p>
              </DropdownMenuItem>
            ))}
             <DropdownMenuSeparator />
            <DropdownMenuItem className='text-primary hover:text-primary justify-center'>View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/40?u=AnnaAdame" alt="Anna Adame" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">Anna Adame</span>
                <span className="text-xs text-muted-foreground">Founder</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><UserIcon className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
            <DropdownMenuItem><LifeBuoy className="mr-2 h-4 w-4" /> Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /> Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
