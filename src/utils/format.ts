const status = (status: string) => {
    switch(status.toLowerCase()) {
        case "new":
            return { icon: "https://slack-imgs.com/?c=1&o1=wi32.he32.si&url=https%3A%2F%2Fslack-events.zendesk-integrations.com%2Fassets%2Fimages%2Fbadge-status-new.png", color: "#F5CA00" }
        case "open":
            return { icon: "https://slack-imgs.com/?c=1&o1=wi32.he32.si&url=https%3A%2F%2Fslack-events.zendesk-integrations.com%2Fassets%2Fimages%2Fbadge-status-open.png", color: "#E82A2A" }
        case "pending":
            return { icon: "https://slack-imgs.com/?c=1&o1=wi32.he32.si&url=https%3A%2F%2Fslack-events.zendesk-integrations.com%2Fassets%2Fimages%2Fbadge-status-pending.png", color: "#259ECB" }
        case "solved":
            return { icon: "https://slack-imgs.com/?c=1&o1=wi32.he32.si&url=https%3A%2F%2Fslack-events.zendesk-integrations.com%2Fassets%2Fimages%2Fbadge-status-solved.png", color: "#68737D" }
        default:
            return { icon: "", color: "#cccccc" }
    }
}

export const formatTicket = (ticket: any) => {

    let message = [
        {
            "fallback": "Zendesk ticket updated",
            "title": `Ticket #${ticket.id}: ${ticket.title}`,
            "title_link": ticket.link,
            "fields": [
                {
                    "title": "Requester",
                    "value": ticket.requester || "Unassigned",
                    "short": true
                },
                {
                    "title": "Assignee",
                    "value": ticket.assignee || "Unassigned",
                    "short": true
                }
            ],
            "text": "",
            "color": status(ticket.status).color,
            "footer": ticket.status,
            "footer_icon": status(ticket.status).icon,
        }
    ]

    return message

}