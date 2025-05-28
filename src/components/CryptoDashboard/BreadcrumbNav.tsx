import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  pageTitle: string;
  className?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  items = [{ label: 'Dashboards' }, { label: 'Crypto' }],
  pageTitle = 'Crypto',
  className
}) => {
  return (
    <div className={cn('flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6', className)}>
      <h2 className="text-xl font-semibold text-foreground mb-2 sm:mb-0">{pageTitle}</h2>
      <nav aria-label="breadcrumb">
        <ol className="flex items-center space-x-1.5 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.href ? (
                <a href={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
              {index < items.length - 1 && (
                <ChevronRight className="h-4 w-4 mx-1.5" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadcrumbNav;
