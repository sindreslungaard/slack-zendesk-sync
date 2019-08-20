# slack-zendesk-sync

Posts a message to Slack for new tickets created in Zendesk and continuously updates it when the ticket changes. This is an alternative to using webhooks or the official Slack bot for Zendesk which both sends a new message to the channel when tickets update.

# How to install

1. [Create a new Slack bot in your workspace](https://get.slack.help/hc/en-us/articles/115005265703-Create-a-bot-for-your-workspace)
1. Clone the repository and create a new file `.env` with the following content (copy from `.env.default`)
```
BOT_TOKEN=Your bot's token from slack, starts with xoxb..
BOT_NAME=Name of the Bot
MONGO_URI=Your MongoDB connection string
PORT=Port the API will be exposed on
SECRET=A secret key we expose to Zendesk to ensure nobody misuses our bot
```
3. [Create a new HTTP target in Zendesk](https://support.zendesk.com/hc/en-us/articles/203662136-Notifying-external-targets#topic_hvf_eoa_vb) with the following configuration:
```
Title: Anything, only shown in Zendesk
Url: Your domain + secret (example.com/?secret=YOUR_SECRET)
Method: PUT
Content Type: JSON
```
4. [Create a new Zendesk Trigger](https://support.zendesk.com/hc/en-us/articles/203662106-Creating-triggers-for-automatic-ticket-updates-and-notifications) and specify what you want the bot to pick up. In this example I want all changes to tickets in a group called `Technical Support`:
```
Trigger name: Anything, only shown in Zendesk
Description: Anything, only shown in Zendesk
Conditions:
-- Meet all of the following conditions:
-- -- Group Is Technical Support
Actions:
-- Notify target [The Target you created earlier]
JSON Body:
{
 "title": "{{ticket.title}}" ,
 "description": "{{ticket.description}}",
 "link": "{{ticket.link}}",
 "id": "{{ticket.id}}",
 "status": "{{ticket.status}}",
 "comments": "{{ticket.comments_formatted}}",
 "assignee": "{{ticket.assignee.email}}",
 "requester": "{{ticket.requester.email}}"
}
```
