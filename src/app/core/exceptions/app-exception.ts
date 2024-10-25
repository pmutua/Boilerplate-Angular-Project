/**
 * Base class for all application-specific exceptions.
 */
export class AppException extends Error {
    constructor(public override  message: string, public code?: string) {
        super(message);
        this.name = 'AppException';
        Object.setPrototypeOf(this, AppException.prototype);
    }
}
