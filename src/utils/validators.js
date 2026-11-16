/**
 * Validators and input constraints.
 */

export const FORUM_TITLE_MAX_CHARS = 300;
export const FORUM_BODY_MAX_CHARS = 1000;
export const FORUM_COMMENT_MAX_CHARS = 1000;

export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const sanitizeCharLimit = (text, maxLength) => {
  if (!text) return '';
  return text.slice(0, maxLength);
};
