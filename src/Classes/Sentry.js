const Sentry = require("@sentry/node");

/**
 * Creates a Sentry Class for easier interaction
 * @class
 * 
 * @property {function} send - Send a Message/Error to Sentry Server.
 */
class SentryLogger {
    /**
     * Sentry Client and intialized
     * 
     * @private
     */
    #Sentry;

    /**
     * Connect to a Sentry Server for logs
     * 
     * @param {string} dsn - dsn URL for Sentry to Connect
     */
    constructor(dsn)
    {
        if(dsn.length <= 0)
            throw new Error("DSN URL Can't be empty.");
        
        Sentry.init({ dsn });
    }

    /**
     * 
     * @param {string | Error} e 
     */
    send(e)
    {
        this.#Sentry.captureException(e);
    }
}

module.exports = SentryLogger; 