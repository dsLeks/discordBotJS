const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const GUILD_ID = process.env['guild_id']
const TOKEN = process.env['token']
const CLIENT_ID = process.env['client_id']

const commands = [{
  name: 'avgproductpurchase-regusers',
  description: 'To find the average number of times a product has been purchased by each registered customer.'
},{
  name: 'avgproductpurchase-allusers',
  description: 'Find the average number of times a product has been purchased by all customers.'
}, {
  name: 'avgproductpurchase-region',
  description: 'Find the product purchased most frequently in a  region.'
}, {
  name: 'purchasewithrewards-regusers',
  description: 'Find the number of registered users who used reward points to make an order.'
}, {
  name: 'mailinglist-prem',
  description: 'Find the number of premium users who are registered for a mailing list'
}, {
  name: 'mailinglist-basic',
  description: 'Find the number of basic users who are registered for a mailing list'
},{
  name: 'freqpaymentmethod',
  description: 'Find the payment method that is most frequently used.'
},{
  name: 'frequenltyrequestedstock',
  description: 'Find the stock that is most frequently requested.'
},{
  name: 'catproductpurchase-regusers',
  description: 'Find the categories of products that are least purchased by registered users.'
},{
  name: 'milestone3',
  description: 'Greetings!'
}]; 

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();