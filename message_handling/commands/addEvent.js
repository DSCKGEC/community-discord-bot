const Discord = require('discord.js');

const addEventHandler = async(message, args, announcement_channel) => {
    if(!(message.member.roles.cache.find(r => r.name === "DSC Team")))
        message.channel.send('Sorry, you need to be a Core Member to run this command.');

    //extracting the author name and images

    let auth = `By: ${message.author.username}`;
    let authImage = message.author.avatarURL;
    let dp = 'https://cdn.discordapp.com/avatars/755452647456243793/6b2cfc78d852df984b27f0968dc79718.png?size=256';

    try{
        /* STEP 0: Get the event name */
        await message.channel.send('Please enter the event name')
        const names = await message.channel.awaitMessages(
            m => m.author.id == message.author.id, 
            { 
                max: 1, 
                time: 3000000, 
                errors: ['time'] 
            }
        )
        let eventName = names.first().content;
        names.first().react('👍');


        /* STEP 1: Get the event description */
        await message.channel.send('Please enter a short description')
        const descriptions = await message.channel.awaitMessages(
            m => m.author.id == message.author.id, 
            { 
                max: 1, 
                time: 3000000, 
                errors: ['time'] 
            }
        )
        let eventDescription = descriptions.first().content;
        descriptions.first().react('👍');

        /* STEP 2: Get the event timing */
        message.channel.send('Please enter a date or time for the event')
        const times = await message.channel.awaitMessages(
            m => m.author.id == message.author.id, 
            {
                 max: 1, 
                 time: 3000000, 
                 errors: ['time'] 
            }
        )

        times.first().react('👍');
        let eventDate = times.first().content;

        /* STEP 3: Get the event link */
        await message.channel.send('Please enter an event link')
        const links = await message.channel.awaitMessages(
            m => m.author.id == message.author.id, 
            { 
                max: 1, 
                time: 3000000, 
                errors: ['time'] 
            }
        );
        let eventURL = links.first().content;
        links.first().react('👍');
        
        /* STEP 4: Get the event link */
        await message.channel.send('Please attach an event banner');
        const images = await message.channel.awaitMessages(
            m => m.author.id == message.author.id, 
            {
                 max: 1, 
                 time: 3000000, 
                 errors: ['time'] 
            }
        )

        let eventImage = images.first().attachments.array()[0].url;
        images.first().react('👍');
        
        
        

        /* STEP 5: Sending the actual message */
        const exampleEmbed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle(eventName)
                                .setURL(eventURL)
                                .setAuthor(auth, authImage, dp)
                                .setDescription('')
                                .setThumbnail(dp)
                                .addFields(
                                    { name: 'What?', value: eventDescription },
                                    { name: 'When?', value: eventDate},
                                    { name: 'Where?', value: eventURL, inline: true },
                                )
                                .setImage(eventImage)
                                .setTimestamp()
                                .setFooter('Hope you have a great learning time!', dp);
        

        announcement_channel.send(exampleEmbed).catch(err => {
            message.channel.send(`Error faced: ${err}`)
        })
        

    }
    catch(err){
        message.channel.send('Error: ' + err);
    }        
                                
}

module.exports = addEventHandler;