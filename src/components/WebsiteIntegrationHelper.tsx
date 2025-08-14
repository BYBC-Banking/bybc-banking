// Helper component to display website integration instructions
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Copy, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WebsiteIntegrationHelper = () => {
  const { toast } = useToast();

  const integrationUrls = {
    login: "https://bybc-banking.lovable.app/login?source=website&return_url=https://www.bybc.co.za/dashboard",
    register: "https://bybc-banking.lovable.app/register?source=website&return_url=https://www.bybc.co.za/dashboard",
    registerBusiness: "https://bybc-banking.lovable.app/register?source=website&account_type=business&return_url=https://www.bybc.co.za/dashboard"
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${label} URL copied to clipboard`
      });
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Website Integration Setup</h1>
        <p className="text-gray-600">Connect your website to BYBC Banking app</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Integration Overview</AlertTitle>
        <AlertDescription>
          Use these URLs on your website to redirect users to the banking app for authentication. 
          After successful login/registration, users will be redirected back to your website.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Integration URLs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Login URL</h4>
              <div className="flex gap-2">
                <code className="flex-1 p-2 bg-gray-100 rounded text-sm break-all">
                  {integrationUrls.login}
                </code>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(integrationUrls.login, "Login")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Register URL (Personal)</h4>
              <div className="flex gap-2">
                <code className="flex-1 p-2 bg-gray-100 rounded text-sm break-all">
                  {integrationUrls.register}
                </code>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(integrationUrls.register, "Register")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Register URL (Business)</h4>
              <div className="flex gap-2">
                <code className="flex-1 p-2 bg-gray-100 rounded text-sm break-all">
                  {integrationUrls.registerBusiness}
                </code>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(integrationUrls.registerBusiness, "Business Register")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Add buttons/links on your website:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<!-- Login Button -->
<a href="${integrationUrls.login}" 
   className="btn btn-primary">
  Login to Banking
</a>

<!-- Register Button -->
<a href="${integrationUrls.register}" 
   className="btn btn-secondary">
  Open Personal Account
</a>

<!-- Business Register Button -->
<a href="${integrationUrls.registerBusiness}" 
   className="btn btn-secondary">
  Open Business Account
</a>`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Handle return redirects:</h4>
              <p className="text-sm text-gray-600">
                After successful authentication, users will be redirected to your return_url with these parameters:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <code>auth_success=true</code> - Authentication was successful</li>
                <li>• <code>user_id=...</code> - User ID (if successful)</li>
                <li>• <code>auth_token=...</code> - Authentication token (if successful)</li>
                <li>• <code>error=...</code> - Error message (if failed)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. Customize return URL:</h4>
              <p className="text-sm text-gray-600">
                Replace <code>return_url</code> parameter with your desired landing page URL after authentication.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button asChild>
          <a href={integrationUrls.login} target="_blank" rel="noopener noreferrer">
            Test Login Integration
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default WebsiteIntegrationHelper;