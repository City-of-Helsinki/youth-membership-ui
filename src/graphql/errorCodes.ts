export const ErrorCodes = Object.freeze({
  PERMISSION_DENIED_ERROR: 'PERMISSION_DENIED_ERROR',
} as const);

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];
