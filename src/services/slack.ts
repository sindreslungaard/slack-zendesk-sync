import SlackBot from "slackbots"

const bot = new SlackBot({
    token: process.env.BOT_TOKEN,
    name: process.env.BOT_NAME
})

bot.on('start', function() {

    let myChannels = bot.channels.filter(x => x.is_member)

    if(myChannels.length < 1) {
        console.error("Not part of any public channels")
    }

    for(let channel of myChannels) {
        bot.postMessage(channel.id, "test")
        .then(message => {

            bot.updateMessage(message.channel, message.ts, "updated")

        })
    }
    
    

});