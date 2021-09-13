# @setar/logger
Utility Logger Module Created by Setar

## Features
- Connecting to Sentry for Errors
- Connecting to Discord Webhooks
- Creating Custom Log File
- Same as original console, accepting mutli arguments

## Documentation
Whole Lib documents are rendered and available in [docs]() folder.

## Config
pass this object to setup your own Logger

```js
{
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
```