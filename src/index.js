const { WebhookClient } = require("discord.js");
const SentryLogger = require("./Classes/Sentry");
const path = require("path");
const fs = require("fs");
import { LoggerConfig } from "../typings/Logger.class";

/**
 * 
 * Log your information and share it through mutli connections and features
 * @author EhsanFox <ehsan8184@gmail.com>
 * @copyright Ehsan Fox 2021
 * @classdesc Log your information and share it through mutli connections and features
 *  
 * @namespace LoggerClass 
 * @class Logger
 */
class Logger {
    /**
     * Sentry Client intialized by SentryLogger Class
     * 
     * @type {SentryLogger | boolean}
     * @private
     */
    #SentryClient = false;

    /**
     * Discord Webhook Client intialized by WebhookClient class
     * 
     * @type {WebhookClient | boolean}
     * @private
     */
    #DiscordClient = false;

    /**
     * Enable old console to log
     * 
     * @type {boolean}
     * @private
     */
    #EnabledConsole = true;

    /**
     * a path to save/create the log File
     * 
     * @type {string}
     * @private
     */
    #LogPath = __dirname;

    /**
     * a file name to save/create the Log File
     * 
     * @type {string}
     * @private
     */
    #LogFile = "logger";

    /**
     * a file extension for the log file
     * 
     * @type {string}
     * @private
     */
    #LogExtension = "log";

    /**
     * a Complete location for the log file, ready to use
     * 
     * @type {string}
     * @private
     */
    #FullFileLocation;

    /**
     * the File Stream to write and read
     * 
     * @type {fs.WriteStream | boolean}
     * @private
     */
    #File = false;

    /**
     * Import your Sentry and Discord Webhook Client
     * to share your log data throgh there
     * 
     * @typedef {LoggerConfig} Config
     * @param {Config} config Config object for Your Logger class
     */
    constructor(config)
    {
        if('dsn' in config)
            this.#SentryClient = new SentryLogger(config.dsn);

        if('webhook' in config && config.webhook instanceof WebhookClient)
            this.#DiscordClient = config.webhook;

        if('file' in config)
            this.#LogFile = config.file;

        if('path' in config)
            this.#LogPath = config.path;

        if('extension' in config)
            this.#LogExtension = config.extension;

        if('console' in config)
            this.#EnabledConsole = config.console;

        this.#FullFileLocation = path.join(this.#LogPath, `${this.#LogFile}.${this.#LogExtension}`);

        /* Create Log Path */
        fs.mkdirSync(this.#LogPath, {
            recursive: true
        });

        /* Create a WriteStream to The File */
        this.#File = fs.createWriteStream(this.#FullFileLocation);
    }

    /**
     * Get Locale Time from System as String
     * 
     * @returns {string} Time
     */
    #LogTime()
    {
        return new Date().toLocaleTimeString();
    }

    /**
     * Write the text to the file
     * 
     * @param {string} txt 
     */
    #Write(txt)
    {
        if(this.#File && this.#File.writable)
            this.#File.write(`${txt}\n`);
    }

    /**
     * Log data through different places, like discord client, log file, and ....
     * 
     * @public
     * @param  {...any} params 
     */
    log(...params)
    {
        if(this.#EnabledConsole)
            console.log(...params);

        if(this.#DiscordClient)
            this.#DiscordClient.send(`<t:${Math.floor(Date.now() / 1000)}> [LOG]: ${params.join(" ")}`);
        
        this.#Write(`[${this.#LogTime()} LOG]: ${params.join(" ")}`);
    }

    /**
     * Send warning data through different places, like discord client, log file, and ....
     * 
     * @public
     * @param  {...any} params 
     */
    warn(...params)
    {
        if(this.#EnabledConsole)
            console.warn(...params);

        if(this.#DiscordClient)
            this.#DiscordClient.send(`<t:${Math.floor(Date.now() / 1000)}> [WARN]: ${params.join(" ")}`);
        
        this.#Write(`[${this.#LogTime()} WARN]: ${params.join(" ")}`);
    }

    /**
     * Send error data through different places, like sentry, discord webhook, log file, and ....
     * 
     * @public
     * @param  {...any} params 
     */
    error(...params)
    {
        if(this.#EnabledConsole)
            console.log(...params);

        if(this.#DiscordClient)
            this.#DiscordClient.send(`<t:${Math.floor(Date.now() / 1000)}> [ERR]: ${params.join(" ")}`);
        
        if(this.#SentryClient)
            this.#SentryClient.send(params.join(" "));

        this.#Write(`[${this.#LogTime()} ERR]: ${params.join(" ")}`);
    }
}

module.exports = Logger;