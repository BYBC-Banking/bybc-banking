
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Play, Pause, Edit, MoreVertical, Copy, Trash2, BarChart3 } from "lucide-react";

interface SwapCardProps {
  swap: {
    id: string;
    fromAsset: string;
    amount: string;
    frequency: string;
    nextExecution: string;
    isActive: boolean;
    successRate: { successful: number; total: number };
    status: 'active' | 'paused' | 'failed' | 'executing';
    retryCount?: number;
    lastFailureReason?: string;
  };
  onToggleStatus: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const SwapCard = ({ swap, onToggleStatus, onEdit, onDelete, onDuplicate, onViewDetails }: SwapCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'executing': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'paused': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'executing': return '🔵';
      case 'failed': return '🔴';
      case 'paused': return '⚪';
      default: return '⚪';
    }
  };

  const successPercentage = swap.successRate.total > 0 
    ? Math.round((swap.successRate.successful / swap.successRate.total) * 100)
    : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with status and actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(swap.status)}`} />
              <Badge variant={swap.status === 'active' ? 'default' : 'secondary'}>
                {getStatusEmoji(swap.status)} {swap.status.toUpperCase()}
              </Badge>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleStatus(swap.id)}
                className="h-8 w-8"
              >
                {swap.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(swap.id)}
                className="h-8 w-8"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewDetails(swap.id)}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDuplicate(swap.id)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(swap.id)} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Primary info */}
          <div>
            <div className="text-lg font-semibold">
              {swap.fromAsset} → ZAR
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {swap.amount} {swap.fromAsset}
            </div>
          </div>

          {/* Secondary info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Frequency</div>
              <div className="font-medium">{swap.frequency}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Next execution</div>
              <div className="font-medium">{swap.nextExecution}</div>
            </div>
          </div>

          {/* Success rate */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">Success rate: </span>
              <span className={`font-semibold ${successPercentage >= 95 ? 'text-green-600' : successPercentage >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                {successPercentage}%
              </span>
              <span className="text-muted-foreground ml-1">
                ({swap.successRate.successful}/{swap.successRate.total})
              </span>
            </div>
          </div>

          {/* Failure info */}
          {swap.status === 'failed' && swap.lastFailureReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="text-sm text-red-800">
                <div className="font-medium">Last failure:</div>
                <div>{swap.lastFailureReason}</div>
                {swap.retryCount && swap.retryCount < 3 && (
                  <div className="mt-1 text-xs">
                    Retry {swap.retryCount}/3 in progress...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SwapCard;
