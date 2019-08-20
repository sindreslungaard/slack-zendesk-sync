declare module 'slackbots' {

    interface ISlackBotOptions {
        token: String
        name: String,
    }

    class SlackBot {
        constructor(options: ISlackBotOptions)

        channels: any

        on(event: string, callback: Function): void
        postMessage(channel: string, message: string, params?: any): Promise<any>
        updateMessage(channel: string, ts: string, message: string, params?: any): void
        _api(methodName: string, params: any): void

    }

    export = SlackBot
}