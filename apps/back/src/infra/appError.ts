export default class AppError extends Error {
    constructor(
        message: string,
        public statusCode = 400,
        public errorCode?: 'FORBIDDEN_AREA'
    ) {
        super(message);
    }
}