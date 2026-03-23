/**
 * Date formatting — local calendar days as YYYY-MM-DD, display for locale.
 */
import { i18n } from '@/lib/i18n';

/** Format YYYY-MM-DD for display (e.g. "Jul 15, 2026") */
export function formatDisplayDate(dateStr?: string, locale?: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr + 'T12:00:00');
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(locale || i18n.locale || 'en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/** @deprecated Use formatDisplayDate */
export const formatTournamentDate = formatDisplayDate;

/** Get ISO date string YYYY-MM-DD from Date (uses local date to avoid timezone shift) */
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Format date range for display */
export function formatDateRange(start: string, end?: string, locale?: string): string {
  const activeLocale = locale || i18n.locale || 'en';
  const s = formatDisplayDate(start, activeLocale);
  if (!end || end === start) return s;
  const endD = new Date(end + 'T12:00:00');
  const startD = new Date(start + 'T12:00:00');
  if (isNaN(endD.getTime())) return s;
  const sameMonth =
    startD.getMonth() === endD.getMonth() && startD.getFullYear() === endD.getFullYear();
  if (sameMonth) {
    const endStr = endD.toLocaleDateString(activeLocale, { day: 'numeric', year: 'numeric' });
    const startParts = s.split(' ');
    return `${startParts[0]} ${startParts[1].replace(/,/, '')} – ${endStr}`;
  }
  return `${s} – ${formatDisplayDate(end, activeLocale)}`;
}

/** @deprecated Use formatDateRange */
export const formatTournamentDateRange = formatDateRange;
