
import React from 'react';
import { Shield, Eye, FileText, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PrivacyOverviewCardsProps {
  privacyScore: number;
  auditEventsCount: number;
}

export default function PrivacyOverviewCards({ privacyScore, auditEventsCount }: PrivacyOverviewCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
      <Card className="mobile-card">
        <CardHeader className="pb-2 mobile-padding">
          <CardTitle className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            <span className="truncate">Privacy Score</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="mobile-padding pt-0">
          <div className="text-lg sm:text-2xl font-bold text-green-600">{privacyScore}%</div>
          <Badge variant="outline" className="text-xs mt-1 bg-green-50 text-green-700">
            Excellent
          </Badge>
        </CardContent>
      </Card>

      <Card className="mobile-card">
        <CardHeader className="pb-2 mobile-padding">
          <CardTitle className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            <span className="truncate">Data Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="mobile-padding pt-0">
          <div className="text-xs sm:text-sm font-medium">Device Only</div>
          <div className="text-xs text-muted-foreground mt-1 truncate">
            Wallet data, Session info
          </div>
        </CardContent>
      </Card>

      <Card className="mobile-card">
        <CardHeader className="pb-2 mobile-padding">
          <CardTitle className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            <span className="truncate">Audit Trail</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="mobile-padding pt-0">
          <div className="text-lg sm:text-lg font-bold">{auditEventsCount}</div>
          <div className="text-xs text-muted-foreground mt-1 truncate">
            Recent activities
          </div>
        </CardContent>
      </Card>

      <Card className="mobile-card">
        <CardHeader className="pb-2 mobile-padding">
          <CardTitle className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
            <span className="truncate">Third Parties</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="mobile-padding pt-0">
          <div className="text-lg sm:text-lg font-bold">2</div>
          <div className="text-xs text-muted-foreground mt-1 truncate">
            Essential partners only
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
