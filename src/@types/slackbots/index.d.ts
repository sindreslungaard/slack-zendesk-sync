declare module 'slackbots' {

    interface ISlackBotOptions {
        token: String
        name: String,
    }

    class SlackBot {
        constructor(options: ISlackBotOptions)

        channels: any

        on(event: string, callback: Function): void
        postMessage(channel: string, message: string): Promise<any>
        updateMessage(channel: string, ts: string, message: string): void
    }

    export = SlackBot
}