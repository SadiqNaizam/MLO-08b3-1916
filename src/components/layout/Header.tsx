import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Menu as MenuIcon,
  Globe2,
  Grid3X3, // Corrected name for Grid3x3 icon from lucide
  Maximize,
  Moon,
  Sun, // For theme toggle light mode
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

interface Notification {
  id: string;
  text: string;
  time: string;
}

const Header: React.FC<TopHeaderProps> = ({ onToggleSidebar, className }) => {
  const notifications: Notification[] = [
    { id: '1', text: 'New order received', time: '3 min ago' },
    { id: '2', text: 'Server #1 overloaded.', time: '1 hr ago' },
    { id: '3', text: 'New user registered.', time: '2 hrs ago' },
  ];
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = React.useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // In a real app, you might also persist this preference
      return newTheme;
    });
  }, []);

  const handleFullScreen = React.useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 right-0 h-16 bg-card text-card-foreground flex items-center justify-between px-6 shadow-sm z-20 border-b',
        'left-0 md:left-64', // Full width on mobile, offset by sidebar on desktop
        className
      )}
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={onToggleSidebar}>
          <MenuIcon className="h-6 w-6" />
        </Button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-10 w-64 bg-background md:bg-card-foreground/5" />
        </div>
      </div>

      <div className="flex items-center space-x-1 md:space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Globe2 className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Español</DropdownMenuItem>
            <DropdownMenuItem>Français</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Grid3X3 className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="hidden sm:inline-flex" onClick={handleFullScreen}>
          <Maximize className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex justify-between items-center">
              Notifications
              <Badge variant="secondary" className="text-xs">{notifications.length} New</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? notifications.map(notif => (
              <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3 cursor-pointer hover:bg-muted/50">
                <p className="text-sm font-medium">{notif.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{notif.time}</p>
              </DropdownMenuItem>
            )) : (
              <DropdownMenuItem disabled className="text-center text-muted-foreground p-4">No new notifications</DropdownMenuItem>
            )}
             <DropdownMenuSeparator />
            <DropdownMenuItem className='text-primary hover:!text-primary justify-center py-2 cursor-pointer'>
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-1 md:px-2 h-auto py-1.5 rounded-md hover:bg-muted/50">
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

export default Header;
