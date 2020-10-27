export const ErrorCodes = Object.freeze({
  PERMISSION_DENIED_ERROR: 'PERMISSION_DENIED_ERROR',
  OBJECT_DOES_NOT_EXIST_ERROR: 'OBJECT_DOES_NOT_EXIST_ERROR',
} as const);

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];
