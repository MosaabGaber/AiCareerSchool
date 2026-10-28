// Cairo timezone UTC+3 countdown configuration
// Start: October 28, 2026 at 5:00 PM Cairo time (UTC+3)
// Initial end (2 days): October 30, 2026 at 5:00 PM Cairo time (UTC+3)
// Auto-resets every 1 day (24 hours) after hitting zero forever.

export const COUNTDOWN_START_TIME = new Date('2026-10-28T17:00:00+03:00').getTime();
export const COUNTDOWN_INITIAL_END_TIME = new Date('2026-10-30T17:00:00+03:00').getTime();
export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export function getAutoResetCountdown(now: number = Date.now()): CountdownTime {
  let diff: number;

  if (now < COUNTDOWN_INITIAL_END_TIME) {
    diff = Math.max(0, COUNTDOWN_INITIAL_END_TIME - now);
  } else {
    const elapsed = now - COUNTDOWN_INITIAL_END_TIME;
    diff = ONE_DAY_MS - (elapsed % ONE_DAY_MS);
  }

  const days = Math.floor(diff / ONE_DAY_MS);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    expired: false,
  };
}
