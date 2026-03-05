/**
 * Security utilities for input sanitization
 */

/**
 * Escape special regex characters to prevent ReDoS and NoSQL injection
 * @param {string} str - Raw user input
 * @returns {string} Escaped string safe for use in $regex
 */
export const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Sanitize user input for safe inclusion in HTML emails.
 * Strips all HTML tags and encodes dangerous characters.
 * @param {string} str - Raw user input
 * @returns {string} Sanitized string
 */
export const sanitizeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

/**
 * Whitelist fields from an object — only keep allowed keys.
 * Prevents mass assignment attacks.
 * @param {Object} obj - Raw request body
 * @param {string[]} allowedFields - List of permitted field names
 * @returns {Object} Filtered object
 */
export const pickFields = (obj, allowedFields) => {
  const filtered = {};
  for (const key of allowedFields) {
    if (obj[key] !== undefined) {
      filtered[key] = obj[key];
    }
  }
  return filtered;
};
