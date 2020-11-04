const Discord = require('discord.js');
const Canvas = require('canvas');

const welcomeCommandHandler = async (message, args, client) => {
    if (args[0]) {
        const user = getUserFromMention(args[0], client);
        
        if (!user) {
            return message.channel.send('Could not fetch tagged user.');
        } else {
            const member = message.guild.member(user);
            let guild = member.guild;
            if(guild.systemChannel){ 
                const channel = guild.systemChannel;
                const canvas = Canvas.createCanvas(700, 250);
                const ctx = canvas.getContext('2d');
        
                const background = await Canvas.loadImage('./background.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
                ctx.strokeStyle = '#74037b';
                ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
                // Slightly smaller text placed above the member's display name
                ctx.font = '28px sans-serif';
                ctx.fillStyle = '#f8faf2';
                ctx.fillText('Welcome to our server,', canvas.width / 2.5, canvas.height / 3.5);
        
                // Add an exclamation point here and below
                ctx.font = applyText(canvas, `${member.displayName}!`);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
        
                ctx.beginPath();
                ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
        
                const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
                ctx.drawImage(avatar, 25, 25, 200, 200);
        
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        
                channel.send(`A new member, ${member} joined the server!`, attachment);
            }
            if (member) {
                let KGrole = member.guild.roles.cache.find(r => r.id === "760660088582438967");
                member.createDM().then(async channel => {
                    let name = await dmprompt(channel, "Welcome to the Official DSC KGEC Discord Server!\n\nThis is Eowyn, the official bot of the server. We are glad that you joined us! 🤗\nPlease enter you name", member)
                    if (name !== "You ran out of time! (1m). Please contact an admin to verify again.") {
                        let college = await dmprompt(channel, `Alright **${name}**!\nWhat college or institution are you from 🧐?`, member)
                        if (college === "KGEC" || college === "Kalyani Government Engineering College") member.roles.add(KGrole)
                        member.setNickname(name);
                        channel.send(`Welcome and enjoy your stay!\n\nTo get started, head on to the 🔖get-roles channel and pick up your domains of interest and do not forget to drop a **Hi** in the general chat channel!`)
                    } else {
        
                    }
                })
        
                
            }
        }
    } else {
        message.channel.send('No one tagged!');
    }
}

function getUserFromMention(mention, client) {
	// The id is the first and only match found by the RegEperson.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}

// Pass the entire Canvas object because you'll need to access its width, as well its context
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

async function dmprompt(channel, msg, member) {
    const filter = (response) => response.author.id === member.id;
    channel.send(msg)
    return channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
            const content = collected.first().content;
            if (content.toLowerCase() === "cancel") return "cancel"
            return content;
        })
        .catch(_ => {
            console.log(_)
            channel.send("You ran out of time! (1m). Please contact an admin to verify again.")
        });
}

module.exports = welcomeCommandHandler