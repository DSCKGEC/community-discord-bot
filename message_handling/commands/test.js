const Discord = require('discord.js');
const Canvas = require('canvas');

const testCommandHandler = async (message, args, client) => {
    if (args[0]) {
        const user = getUserFromMention(args[0], client);
        
        if (!user) {
            return message.channel.send('Could not fetch tagged user.');
        } else {
            const member = message.guild.member(user);
            let guild = member.guild;
            if(guild.systemChannel){ 
                const channel = guild.systemChannel;
                const canvas = Canvas.createCanvas(900, 500);
                const ctx = canvas.getContext('2d');

                Canvas.registerFont('./UniSans.otf', {family: 'Uni Sans'})

                const num = Math.floor(Math.random() * 10) + 1;
        
                const background = await Canvas.loadImage(`./background${num}.jpg`);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
      
                // Slightly smaller text placed above the member's display name
                ctx.font = '50px Uni Sans';
                ctx.fillStyle = '#fff';
                ctx.shadowBlur = 4;
                const wide = ctx.measureText('Welcome').width
                ctx.fillText('Welcome', canvas.width / 2 - wide / 2, canvas.height - 175);
        
                // Add an exclamation point here and below
                ctx.font = applyText(canvas, `${member.displayName}!`);
                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 4;
                ctx.fillText(`${member.displayName}`, canvas.width / 2 - ctx.measureText(`${member.displayName}`).width / 2, canvas.height - 110);
        
                ctx.beginPath();
                ctx.arc(canvas.width / 2, 150, 100, 0, Math.PI * 2, true);
                ctx.lineWidth = 15;
                ctx.strokeStyle = '#ffffff';
                ctx.stroke();
                ctx.closePath();
                ctx.clip();

                ctx.arc()
        
                const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
                ctx.drawImage(avatar, (0.5 + (canvas.width / 2 - 100)) | 0, (0.5 + 50) | 0, 200, 200);
        
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        
                message.channel.send(`A new member, ${member} joined the server!`, attachment);
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
		ctx.font = `${fontSize -= 10}px Uni Sans`;
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

module.exports = testCommandHandler