export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "VALIDATION" | "DATABASE" | "NETWORK" | "SERVER",
    public readonly status: number,
  ) {
    super(message);
  }
}

export function toPublicError(error: unknown) {
  if (error instanceof AppError) {
    return { code: error.code, message: error.message, status: error.status };
  }
  return {
    code: "SERVER" as const,
    message: "Something went wrong. Please try again.",
    status: 500,
  };
}
