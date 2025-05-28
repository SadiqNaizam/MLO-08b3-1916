import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Bitcoin,
  FolderKanban,
  ChevronDown,
  Settings,
  LogOut,
  Layers, // VELZON logo
  X, // Close button for mobile
  ImageIcon, // Placeholder for NFT
  Briefcase, // Placeholder for Job
  BookOpen,  // Placeholder for Blog
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isCollapsible?: boolean;
  children?: React.ReactNode;
  isSubItem?: boolean;
  onClick?: () => void; // Added for items that might trigger actions instead of navigation or for parent collapsible items
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isActive, isCollapsible, children, isSubItem, onClick }) => {
  const [isOpen, setIsOpen] = React.useState(isActive && isCollapsible);

  const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onClick) onClick();
    if (isCollapsible) {
      setIsOpen(prev => !prev);
    }
    // If not collapsible and no custom onClick, link behavior is handled by `asChild` or default button action.
    // If it's a link and also collapsible, prevent default if needed (not currently the case here)
  }, [isCollapsible, onClick]);

  return (
    <li>
      <Button
        variant={'ghost'} // Base variant, styling is via className
        className={cn(
          'w-full justify-start text-sm font-medium py-2.5 h-auto px-4 rounded-md',
          isActive 
            ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
            : 'text-sidebar-foreground/80 hover:bg-sidebar-primary/10 hover:text-sidebar-foreground',
          isCollapsible && 'justify-between',
          isSubItem && 'pl-8 text-sidebar-foreground/70 hover:text-sidebar-foreground'
        )}
        onClick={handleClick}
        asChild={!isCollapsible && !onClick}
      >
        {isCollapsible || onClick ? (
          <div className="flex items-center w-full">
            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className='flex-1 text-left'>{label}</span> {/* Ensure label takes up space */} 
            {isCollapsible && <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />}
          </div>
        ) : (
          <a href={href} className="flex items-center w-full">
            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {label}
          </a>
        )}
      </Button>
      {isCollapsible && isOpen && <ul className="pl-7 py-1 space-y-0.5 mt-0.5">{children}</ul>}
    </li>
  );
};

interface SidebarProps {
  isMobileOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onToggle, className }) => {
  const currentPage = '#/crypto'; // Example: This would likely come from routing context

  // Based on image: Analytics, CRM, Ecommerce, Crypto, Projects, NFT, Job, Blog
  const navItems = [
    { href: '#/analytics', icon: LayoutDashboard, label: 'Analytics' },
    { href: '#/crm', icon: Users, label: 'CRM' },
    { href: '#/ecommerce', icon: ShoppingCart, label: 'Ecommerce' },
    { href: '#/crypto', icon: Bitcoin, label: 'Crypto' },
    { href: '#/projects', icon: FolderKanban, label: 'Projects' },
    { href: '#/nft', icon: ImageIcon, label: 'NFT' },
    { href: '#/job', icon: Briefcase, label: 'Job' },
    { href: '#/blog', icon: BookOpen, label: 'Blog', isNew: true },
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border',
        'transform transition-transform duration-300 ease-in-out md:translate-x-0',
        isMobileOpen ? 'translate-x-0 z-40' : '-translate-x-full',
        className
      )}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border shrink-0">
        <div className="flex items-center">
          <Layers className="h-7 w-7 mr-2 text-sidebar-accent" />
          <h1 className="text-xl font-semibold text-sidebar-foreground">VELZON</h1>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden text-sidebar-foreground/80 hover:text-sidebar-foreground" onClick={onToggle}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-3 space-y-1.5">
          <h2 className="px-4 pt-2 pb-1 text-xs font-semibold uppercase text-sidebar-foreground/60 tracking-wider">Menu</h2>
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <NavItem 
                key={item.label} 
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={item.href === currentPage}
              >
                {/* Example for sub-items if needed, but current navItems is flat */}
                {/* {item.isNew && <Badge className="ml-auto bg-green-500 text-white">New</Badge>} */}
              </NavItem>
            ))}
          </ul>
          {/* Example of a collapsible section (as per SidebarNav.tsx structure) */}
          {/* <NavItem href="#" icon={Settings} label="Settings" isCollapsible isActive={false}>
            <li><NavItem href="#/settings/profile" icon={() => <span className="w-5 h-5 mr-3" />} label="Profile" isSubItem isActive={currentPage === '#/settings/profile'} /></li>
            <li><NavItem href="#/settings/billing" icon={() => <span className="w-5 h-5 mr-3" />} label="Billing" isSubItem isActive={currentPage === '#/settings/billing'} /></li>
          </NavItem> */}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border mt-auto shrink-0">
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-primary/10 hover:text-sidebar-foreground">
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Button>
         <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-primary/10 hover:text-sidebar-foreground mt-1">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
