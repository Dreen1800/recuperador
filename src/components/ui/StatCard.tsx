import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from './Card';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  const isTrendPositive = trend ? trend.value >= 0 : false;

  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <div className="p-2 rounded-full bg-blue-50 text-blue-600">{icon}</div>
        </div>
        <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
        {trend && (
          <div className="flex items-center mt-auto">
            <span
              className={cn(
                'flex items-center text-xs font-medium',
                isTrendPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {isTrendPositive ? (
                <ArrowUpRight className="w-3 h-3 mr-1" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-1" />
              )}
              {Math.abs(trend.value)}%
            </span>
            <span className="ml-1 text-xs text-gray-500">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;