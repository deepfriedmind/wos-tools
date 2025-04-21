/** Format for displaying date in YYYY-MM-DD format */
export const DATE_FORMAT = 'YYYY-MM-DD'

/** Format for displaying date and time in YYYY-MM-DD HH:mm:ss format */
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/**
 * Time format constants used across the application
 */
export const TIME_FORMATS = {
  /** Format for displaying time with hours, minutes and seconds (HH:mm:ss) */
  LONG_TIME: 'HH:mm:ss',
  /** Short time format (HH:mm) */
  SHORT_TIME: 'HH:mm',
} as const

/**
 * Time display options for different locales
 */
export const TIME_DISPLAY_OPTIONS = {
  /** Options for displaying time in 12-hour format */
  HOUR_12: {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
  },
  /** Options for displaying time in 24-hour format */
  HOUR_24: {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  },
} as const
