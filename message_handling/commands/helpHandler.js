const { DiscordAPIError } = require("discord.js")
const Discord = require('discord.js')

const genericHelpMessage = 
`
*Hello, This is Willy*
            
I'm the official Discord bot of DSC KGEC Server.. 

Here is a list of commands currently available. My developers are working to bring more commands. Why don't you join them @ github - https://github.com/DSCKGEC/community-discord-bot

\`ping\`: Check whether our bot is alive or not!

\`welcome @user\`: Send a welcome message to a sppecific user on the channel they landed on.

\`auth\`: To check if you are an admin of the server or not.

\`scrape\`: Currently scrapes latest news from DSC official website.

\`add-event [ADMIN only]\`: If you are a server Admin, you can announce about latest event!
`


const helpHandler = (message, args) => {
    if(args.length === 0){
        message.channel.send(genericHelpMessage);
    }
    else{
        let commandEnquired = args[0].toLowerCase();
        switch(commandEnquired){
            case "ping": 
                message.channel.send(`\`ping\`: Check whether our bot is alive or not!`)
                break;
            
            case "welcome": 
                message.channel.send(`\`welcome @user\`: Send a welcome message to a sppecific user on the channel they landed on.`)
                break;
            
            case "auth": 
                message.channel.send(`\`auth\`: To check if you are an admin of the server or not.`)
                break;

            case "scrape": 
                message.channel.send(`\`scrape\`: Currently scrapes latest news from DSC official website.`)
                break;

            case "ping": 
                message.channel.send(`\`ping\`: Check whether our bot is alive or not!`)
                break;
            
            case "add-event": 
                message.channel.send(`\`add-event [ADMIN only]\`: If you are a server Admin, you can announce about latest event!`)
                break;
            
            case "help":
                const randomJokes = [
                    "HelpCeption!",
                    "Calling 911",
                    "I'm a bot, not a helper"
                ]

                message.channel.send(randomJokes[Math.floor(Math.random() * 3)])

        }
    }
}

module.exports = helpHandler