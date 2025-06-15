
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPolicyTab() {
  return (
    <Card className="mobile-card">
      <CardHeader className="mobile-padding">
        <CardTitle className="text-base sm:text-lg">Privacy Policy (Plain Language)</CardTitle>
      </CardHeader>
      <CardContent className="mobile-padding space-y-4 sm:space-y-6">
        <div>
          <h4 className="font-semibold text-sm mb-3 text-green-600">✅ What We DO</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>• Keep wallet data on YOUR device</li>
            <li>• Encrypt any stored data</li>
            <li>• Never sell personal information</li>
            <li>• Only collect what's needed</li>
            <li>• Give you full control over your data</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3 text-red-600">❌ What We DON'T Do</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>• Track location without permission</li>
            <li>• Read personal files</li>
            <li>• Share with advertisers</li>
            <li>• Store private keys</li>
            <li>• Sell your data to anyone</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3">Third-Party Services</h4>
          <div className="space-y-3">
            <div className="border rounded-lg p-3">
              <div className="font-medium text-xs sm:text-sm">AWS Cloud Infrastructure</div>
              <div className="text-xs text-muted-foreground mt-1">
                Purpose: App infrastructure and encrypted data backup
              </div>
              <div className="text-xs text-muted-foreground">
                Data Shared: Encrypted app data only (cannot read content)
              </div>
              <Badge variant="outline" className="text-xs mt-2">SOC 2 Compliant</Badge>
            </div>
            <div className="border rounded-lg p-3">
              <div className="font-medium text-xs sm:text-sm">Blockchain Networks</div>
              <div className="text-xs text-muted-foreground mt-1">
                Purpose: Execute cryptocurrency transactions
              </div>
              <div className="text-xs text-muted-foreground">
                Data Shared: Public wallet addresses only (required for blockchain)
              </div>
              <Badge variant="outline" className="text-xs mt-2">Public Ledger</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
