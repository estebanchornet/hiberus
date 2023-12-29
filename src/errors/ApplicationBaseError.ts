export abstract class ApplicationBaseError extends Error {
  title: string;
  message: string;

  constructor(title: string, message: string) {
    super();
    this.title = title;
    this.message = message;
  }
}

export function isManagedException(e: any): ApplicationBaseError | undefined {
  if (e instanceof ApplicationBaseError) {
    return e;
  }

  return undefined;
}
