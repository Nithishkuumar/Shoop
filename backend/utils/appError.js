class AppError extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode = statuscode;
        this.status = `${statuscode}`.startsWith('4')?'Fail':'Error';
        this.operational = true;

        Error.captureStackTrace(this,this.constructor);

    }
}

module.exports = AppError;