declare module 'slackbots' {

    interface ISlackBotOptions {
        token: String
        name: String,
    }

    class SlackBot {
        constructor(options: ISlackBotOptions)
    }

    export = SlackBot
}