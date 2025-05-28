import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bitcoin, DollarSign, TrendingUp, MoreHorizontal } from 'lucide-react'; // Using DollarSign and TrendingUp as generic placeholders

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  iconUrl?: string; // URL to icon image if available
  lucideIcon: React.ElementType;
  amount: number;
  amountSymbol: string;
  valueUsd: number;
  priceUsd: number;
  change24h: number;
}

const assetsData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    lucideIcon: Bitcoin,
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    amount: 0.75,
    amountSymbol: 'BTC',
    valueUsd: 34782.19,
    priceUsd: 46376.25,
    change24h: 2.35,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    lucideIcon: TrendingUp, // Placeholder
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    amount: 12.5,
    amountSymbol: 'ETH',
    valueUsd: 30125.75,
    priceUsd: 2410.06,
    change24h: -1.12,
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    lucideIcon: DollarSign, // Placeholder
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png',
    amount: 150.2,
    amountSymbol: 'LTC',
    valueUsd: 10514.00,
    priceUsd: 70.00,
    change24h: 5.01,
  },
  {
    id: 'dash',
    name: 'Dash',
    symbol: 'DASH',
    lucideIcon: DollarSign, // Placeholder
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/131.png',
    amount: 250.0,
    amountSymbol: 'DASH',
    valueUsd: 7500.00,
    priceUsd: 30.00,
    change24h: -0.50,
  },
];

interface CryptoAssetListProps {
  className?: string;
}

const CryptoAssetList: React.FC<CryptoAssetListProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">My Assets</CardTitle>
        {/* Optional: Actions like 'Add Asset' or filters */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Asset</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Holdings</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assetsData.map((asset) => {
              const LucideIcon = asset.lucideIcon;
              return (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        {asset.iconUrl ? <AvatarImage src={asset.iconUrl} alt={asset.name} /> : null}
                        <AvatarFallback>
                          <LucideIcon className="h-4 w-4 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        {asset.name}
                        <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${asset.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  <TableCell>{asset.amount.toLocaleString()} {asset.amountSymbol}</TableCell>
                  <TableCell className={cn(asset.change24h >= 0 ? 'text-accent' : 'text-destructive')}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right font-medium">${asset.valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CryptoAssetList;
