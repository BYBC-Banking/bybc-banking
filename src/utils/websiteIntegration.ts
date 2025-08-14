// Website integration utilities for handling redirects from www.bybc.co.za

export interface WebsiteRedirectParams {
  source?: string;
  returnUrl?: string;
  action?: 'login' | 'register';
  accountType?: 'personal' | 'business';
}

// Parse URL parameters from website redirect
export const parseWebsiteParams = (): WebsiteRedirectParams => {
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    source: urlParams.get('source') || undefined,
    returnUrl: urlParams.get('return_url') || urlParams.get('returnUrl') || undefined,
    action: (urlParams.get('action') as 'login' | 'register') || undefined,
    accountType: (urlParams.get('account_type') as 'personal' | 'business') || undefined,
  };
};

// Generate redirect URL back to website
export const generateWebsiteRedirectUrl = (params: {
  success: boolean;
  returnUrl?: string;
  userId?: string;
  token?: string;
  error?: string;
}): string => {
  const { success, returnUrl, userId, token, error } = params;
  
  // Default return URL if none provided
  const defaultReturnUrl = 'https://www.bybc.co.za/dashboard';
  const targetUrl = returnUrl || defaultReturnUrl;
  
  // Create URL with success parameters
  const url = new URL(targetUrl);
  url.searchParams.set('auth_success', success.toString());
  
  if (success && userId) {
    url.searchParams.set('user_id', userId);
    if (token) {
      url.searchParams.set('auth_token', token);
    }
  }
  
  if (!success && error) {
    url.searchParams.set('error', error);
  }
  
  return url.toString();
};

// Check if current session is from website redirect
export const isWebsiteRedirect = (): boolean => {
  const params = parseWebsiteParams();
  return !!params.source || !!params.returnUrl;
};

// Generate banking app URL for website integration
export const generateBankingAppUrl = (params: {
  action: 'login' | 'register';
  returnUrl?: string;
  accountType?: 'personal' | 'business';
}): string => {
  const baseUrl = 'https://bybc-banking.lovable.app';
  const { action, returnUrl, accountType } = params;
  
  const url = new URL(`/${action}`, baseUrl);
  url.searchParams.set('source', 'website');
  
  if (returnUrl) {
    url.searchParams.set('return_url', returnUrl);
  }
  
  if (accountType) {
    url.searchParams.set('account_type', accountType);
  }
  
  return url.toString();
};