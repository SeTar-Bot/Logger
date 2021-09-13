import { WebhookClient } from "discord.js";

/**
 * Config Object to Setup your own Custom Logger
 * 
 * @namespace LoggerConfig
 * @interface LoggerConfig
 * 
 * @typedef {WebhookClient} DiscordWebhook
 * 
 * @property {string} config.dsn - DSN Url to Log Errors
 * @property {DiscordWebhook} config.webhook -  Discord WebhookClient to Send Data
 * @property {string} config.path - a path to save/create the log File
 * @property {string} config.file - a file name to save/create the Log File
 * @property {string} config.extension - a file extension for the log file
 * @property {boolean} config.console - Enable old console to log
 */
export interface LoggerConfig {

    /**
     * Enable to Log to the default javascript console
     */
    console?: boolean,

    /**
     * DSN Url to Sentry Log Errors
     */
    dsn?: string,
    
    /**
     * WebhookClient to Send Data
     */
    webhook?: WebhookClient,

    /**
     * a name for Log file
     * 
     * @example
     * 'mylogger'
     */
    file?: string,

    /**
     * a path to save Log file
     * 
     * @example 
     * `/home/Documents/my-app/`
     */
    path?: string

    /**
     * an Extension so for the log file
     * 
     * @example
     * `txt`
     */
    extension?: string
}