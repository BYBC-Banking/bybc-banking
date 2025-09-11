// Simple rate limiter for authentication attempts
interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 30 * 60 * 1000; // 30 minutes

class RateLimiter {
  private attempts: Map<string, RateLimitEntry> = new Map();

  // Check if an IP/identifier is rate limited
  isRateLimited(identifier: string): boolean {
    const entry = this.attempts.get(identifier);
    if (!entry) return false;

    const now = Date.now();
    
    // Clear old entries
    if (now - entry.firstAttempt > WINDOW_MS) {
      this.attempts.delete(identifier);
      return false;
    }

    // Check if locked out
    if (entry.count >= MAX_ATTEMPTS && (now - entry.lastAttempt) < LOCKOUT_MS) {
      return true;
    }

    // Reset if lockout period has passed
    if (entry.count >= MAX_ATTEMPTS && (now - entry.lastAttempt) >= LOCKOUT_MS) {
      this.attempts.delete(identifier);
      return false;
    }

    return false;
  }

  // Record a failed attempt
  recordAttempt(identifier: string): void {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    if (!entry) {
      this.attempts.set(identifier, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now
      });
    } else {
      // Reset window if too much time has passed
      if (now - entry.firstAttempt > WINDOW_MS) {
        this.attempts.set(identifier, {
          count: 1,
          firstAttempt: now,
          lastAttempt: now
        });
      } else {
        entry.count++;
        entry.lastAttempt = now;
      }
    }
  }

  // Get remaining lockout time in minutes
  getRemainingLockoutTime(identifier: string): number {
    const entry = this.attempts.get(identifier);
    if (!entry || entry.count < MAX_ATTEMPTS) return 0;

    const now = Date.now();
    const timeSinceLastAttempt = now - entry.lastAttempt;
    const remainingMs = LOCKOUT_MS - timeSinceLastAttempt;
    
    return remainingMs > 0 ? Math.ceil(remainingMs / (60 * 1000)) : 0;
  }

  // Reset attempts for identifier (on successful login)
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const authRateLimiter = new RateLimiter();