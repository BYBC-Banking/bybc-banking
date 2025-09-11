/**
 * Security headers and CSP utilities for enhanced client-side protection
 */

export const SECURITY_HEADERS = {
  // Content Security Policy - adjusted for Lovable iframe requirements
  CSP: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://tctderzpbrbtatprpmna.supabase.co wss://tctderzpbrbtatprpmna.supabase.co; frame-ancestors 'self' https://*.lovable.app;",
  
  // XSS Protection
  XSS_PROTECTION: "1; mode=block",
  
  // Content Type Options
  CONTENT_TYPE_OPTIONS: "nosniff",
  
  // Referrer Policy
  REFERRER_POLICY: "strict-origin-when-cross-origin",
  
  // Permissions Policy
  PERMISSIONS_POLICY: "geolocation=(), microphone=(), camera=()"
};

/**
 * Apply security headers to outgoing requests where possible
 */
export const applySecurityHeaders = (headers: Record<string, string> = {}) => {
  return {
    ...headers,
    'X-Content-Type-Options': SECURITY_HEADERS.CONTENT_TYPE_OPTIONS,
    'X-XSS-Protection': SECURITY_HEADERS.XSS_PROTECTION,
    'Referrer-Policy': SECURITY_HEADERS.REFERRER_POLICY,
    'Permissions-Policy': SECURITY_HEADERS.PERMISSIONS_POLICY
  };
};

/**
 * Set meta tags for security headers (where HTTP headers aren't available)
 */
export const setSecurityMetaTags = () => {
  // CSP meta tag
  const cspMeta = document.createElement('meta');
  cspMeta.httpEquiv = 'Content-Security-Policy';
  cspMeta.content = SECURITY_HEADERS.CSP;
  
  // Check if CSP meta tag already exists
  const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (!existingCSP) {
    document.head.appendChild(cspMeta);
  }
  
  // Referrer Policy meta tag
  const referrerMeta = document.createElement('meta');
  referrerMeta.name = 'referrer';
  referrerMeta.content = 'strict-origin-when-cross-origin';
  
  const existingReferrer = document.querySelector('meta[name="referrer"]');
  if (!existingReferrer) {
    document.head.appendChild(referrerMeta);
  }
};

/**
 * Initialize security configurations on app load
 */
export const initializeSecurity = () => {
  // Set security meta tags
  setSecurityMetaTags();
  
  // Disable right-click context menu in production (optional)
  if (process.env.NODE_ENV === 'production') {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }
  
  // Prevent drag and drop of external content
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  
  document.addEventListener('drop', (e) => {
    e.preventDefault();
  });
};