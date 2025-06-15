
import React from 'react';
import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AuditEvent {
  id: string;
  timestamp: Date;
  category: 'auth' | 'transaction' | 'security';
  title: string;
  description: string;
  device: string;
  riskLevel: 'low' | 'medium' | 'high';
  contextualHelp: string;
}

interface AuditTrailTabProps {
  auditEvents: AuditEvent[];
}

export default function AuditTrailTab({ auditEvents }: AuditTrailTabProps) {
  return (
    <Card className="mobile-card">
      <CardHeader className="mobile-padding flex flex-row items-center justify-between">
        <CardTitle className="text-base sm:text-lg">Activity Audit Trail</CardTitle>
        <Button variant="outline" size="sm" className="text-xs">
          <Filter className="h-3 w-3 mr-1" />
          Filter
        </Button>
      </CardHeader>
      <CardContent className="mobile-padding">
        <div className="space-y-3">
          {auditEvents.map((event) => (
            <div key={event.id} className="border rounded-lg p-3 sm:p-4 touch-target">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-medium text-xs sm:text-sm truncate">{event.title}</div>
                    <Badge 
                      variant={event.riskLevel === 'low' ? 'secondary' : 'destructive'}
                      className="text-xs flex-shrink-0"
                    >
                      {event.riskLevel}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2 truncate">{event.description}</div>
                  <div className="text-xs text-muted-foreground">
                    {event.timestamp.toLocaleString()} • {event.device}
                  </div>
                </div>
              </div>
              <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                💡 {event.contextualHelp}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
