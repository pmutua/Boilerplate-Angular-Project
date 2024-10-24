import { AppException } from './app.exception';

/**
 * Exception class for handling HTTP-related errors.
 */
export class HttpException extends AppException {
    constructor(public statusCode: number, message: string, public details?: any) {
        super(message);
        this.name = 'HttpException';
    }
}
