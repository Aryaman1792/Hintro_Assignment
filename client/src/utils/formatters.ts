/* client/src/utils/formatters.ts */

/**
 * Formats a duration in seconds into 'Xm Ysec' or '0' if 0.
 * Example: 862 -> '14m 22sec'
 * Example: 0 -> '0'
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0";
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}sec`;
  }
  
  return `${minutes}m ${remainingSeconds}sec`;
}

/**
 * Helper to get ordinal suffix for a day (e.g., 1 -> 'st', 2 -> 'nd', 28 -> 'th')
 */
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

/**
 * Formats an ISO date string into a grouped calendar header.
 * Example: '2026-04-28T03:38:35.444Z' -> 'April 28th'
 */
export function formatDateGroupHeader(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  
  return `${month} ${day}${suffix}`;
}

/**
 * Formats an ISO date string into time of day.
 * Example: '2026-04-28T11:00:35.444Z' -> '11:00 am'
 */
export function formatCallTime(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Formats an ISO date string into a relative date string or specific format.
 * Example: '2026-05-19T14:15:59.550Z' compared to current date '2026-05-21T10:10:52Z' -> '2 days ago'
 */
export function formatRelativeDate(dateString: string | undefined): string {
  if (!dateString) return "-";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";
  
  const now = new Date();
  
  // Set times to midnight to calculate exact difference in days
  const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const diffTime = d1.getTime() - d2.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays > 0) {
    return `${diffDays} days ago`;
  }
  
  // If in the future or negative, fallback to simple date
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
