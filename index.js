const { Client, Intents } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const mysql = require('mysql');
var result;
var displayresult = '';  

const TOKEN = process.env['token']
const DATABASE_HOST = process.env['database_host']
const DB = process.env['db']
const DATABASE_USER = process.env['database_user']
const DATABASE_PORT = process.env['database_port']
const DATABASE_PASSWORD = process.env['database_password']

//creating a connection to the database 
//const connection =  mysql.createConnection({
//  host     : DATABASE_HOST,
//  user     : DATABASE_USER,
//  password : DATABASE_PASSWORD,
//  port     : DATABASE_PORT, 
//  database : DB
//});  

//connecting to the database
//connection.connect(function(err) {
//  if (err) throw err;
//  else console.log("Connected to Database"); 
//});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  
  if(interaction.commandName === 'milestone3') {
    interaction.reply("Hello and welcome to Alekhya's Server!"); 
  }

  if (interaction.commandName === 'avgproductpurchase-regusers') {
    const connection =  mysql.createConnection({
      host     : DATABASE_HOST,
      user     : DATABASE_USER,
      password : DATABASE_PASSWORD,
      port     : DATABASE_PORT, 
      database : DB
    }); 
  connection.connect(function(err) {
    if (err) throw err;
    else console.log("Connected to Database"); 
  });
    displayresult = "";
    connection.query("SELECT avgtable.firstName, avgtable.lastName, AVG(counts) as Average FROM (SELECT general_user.first_name AS firstName, general_user.last_name AS lastName, COUNT(products.product_name) AS counts FROM (((general_user JOIN orders ON general_user.user_id = orders.general_user) JOIN order_details ON orders.order_number = order_details.orders) JOIN products ON order_details.products = products.product_id) WHERE general_user.is_registered=1 GROUP BY general_user.first_name, general_user.last_name) AS avgtable GROUP BY avgtable.firstName, avgtable.lastName", function(err,results) {
      if (err) throw err; 
      else {
        console.log(results); 
        result = JSON.parse(JSON.stringify(results));
        console.log(result); 
      } 
    })  
    await interaction.deferReply();
		await wait(4000);
    for(var i = 0; i < result.length; i++) {
      displayresult = displayresult + JSON.stringify(result[i]);
      }
      await interaction.editReply(displayresult)
      connection.end();
    }

    if (interaction.commandName === 'avgproductpurchase-allusers') {
      const connection =  mysql.createConnection({
        host     : DATABASE_HOST,
        user     : DATABASE_USER,
        password : DATABASE_PASSWORD,
        port     : DATABASE_PORT, 
        database : DB
      }); 
      connection.connect(function(err) {
        if (err) throw err;
        else console.log("Connected to Database"); 
      });
      displayresult=""
      connection.query("SELECT prodavgtable.products AS products, AVG(prodavgtable.counts) AS average FROM (SELECT products.product_name AS products, COUNT(products.product_name) AS counts FROM (((products JOIN order_details ON products.product_id = order_details.products) JOIN orders ON order_details.orders = orders.order_number) JOIN general_user ON orders.general_user = general_user.user_id) GROUP BY products.product_name) AS prodavgtable GROUP BY  prodavgtable.products", function(err,results) {
      if (err) throw err; 
      else {
        console.log(results); 
        result = JSON.parse(JSON.stringify(results));
        console.log(result); 
      } 
    })  
    await interaction.deferReply();
		await wait(4000);
    for(var i = 0; i < result.length; i++) {
      displayresult = displayresult + JSON.stringify(result[i]);
      }
    await interaction.editReply(displayresult)
    connection.end();
    }

      if (interaction.commandName === 'avgproductpurchase-region') {
        const connection =  mysql.createConnection({
          host     : DATABASE_HOST,
          user     : DATABASE_USER,
          password : DATABASE_PASSWORD,
          port     : DATABASE_PORT, 
          database : DB
        }); 
        connection.connect(function(err) {
          if (err) throw err;
          else console.log("Connected to Database"); 
        });
        displayresult=""
        connection.query("SELECT region.state AS state, products.product_name AS product, COUNT(products.product_name) as frequency FROM (((((products JOIN order_details ON products.product_id = order_details.products) JOIN orders ON order_details.orders = orders.order_number) JOIN general_user ON orders.general_user = general_user.user_id) JOIN account on general_user.user_id = account.general_user) JOIN region ON account.region = region.region_id) GROUP BY region.state, products.product_name", function(err,results) {
        if (err) throw err; 
        else {
        console.log(results); 
        result = JSON.parse(JSON.stringify(results));
        console.log(result); 
        } 
      })  
      await interaction.deferReply();
	  	await wait(4000);
      for(var i = 0; i < result.length; i++) {
        displayresult = displayresult + JSON.stringify(result[i]);
      }
      await interaction.editReply(displayresult)
      connection.end(); 
    }

    if (interaction.commandName === 'purchasewithrewards-regusers') {
        const connection =  mysql.createConnection({
          host     : DATABASE_HOST,
          user     : DATABASE_USER,
          password : DATABASE_PASSWORD,
          port     : DATABASE_PORT, 
          database : DB
        }); 
        connection.connect(function(err) {
          if (err) throw err;
          else console.log("Connected to Database"); 
        });
        connection.query("SELECT COUNT(*) AS UsersthatUsedPoints FROM regUser_rewardPoints JOIN orders ON regUser_rewardPoints.user = orders.general_user", function(err,results) {
        if (err) throw err; 
        else {
        console.log(results); 
        result = JSON.parse(JSON.stringify(results))[0].UsersthatUsedPoints;
        console.log(result); 
        } 
      }) 
      await interaction.deferReply();
	  	await wait(4000); 
      await interaction.editReply(String(result));
      connection.end(); 
    }

    if (interaction.commandName === 'mailinglist-prem') {
        const connection =  mysql.createConnection({
          host     : DATABASE_HOST,
          user     : DATABASE_USER,
          password : DATABASE_PASSWORD,
          port     : DATABASE_PORT, 
          database : DB
        }); 
        connection.connect(function(err) {
          if (err) throw err;
          else console.log("Connected to Database"); 
        });
        connection.query("SELECT COUNT(*) as premUser FROM user_register_mail JOIN account ON user_register_mail.user = account.general_user WHERE account.account_type=1", function(err,results) {
        if (err) throw err; 
        else {
        console.log(results); 
        result = JSON.parse(JSON.stringify(results))[0].premUser;
        console.log(result); 
        } 
      }) 
      await interaction.deferReply();
	  	await wait(4000); 
      await interaction.editReply(String(result));
      connection.end(); 
    }

    if (interaction.commandName === 'mailinglist-basic') {
        const connection =  mysql.createConnection({
          host     : DATABASE_HOST,
          user     : DATABASE_USER,
          password : DATABASE_PASSWORD,
          port     : DATABASE_PORT, 
          database : DB
        }); 
      connection.connect(function(err) {
        if (err) throw err;
        else console.log("Connected to Database"); 
      });
      connection.query("SELECT COUNT(*) as basicUser FROM user_register_mail JOIN account ON user_register_mail.user = account.general_user WHERE account.account_type=0", function(err,results) {
        if (err) throw err; 
        else {
        console.log(results); 
        result = JSON.parse(JSON.stringify(results))[0].basicUser;
        console.log(result); 
        } 
      }) 
      await interaction.deferReply();
	  	await wait(4000); 
      await interaction.editReply(String(result));
      connection.end(); 
    }

    if (interaction.commandName === 'freqpaymentmethod') {
      const connection =  mysql.createConnection({
        host     : DATABASE_HOST,
        user     : DATABASE_USER,
        password : DATABASE_PASSWORD,
        port     : DATABASE_PORT, 
        database : DB
      }); 
      connection.connect(function(err) {
        if (err) throw err;
        else console.log("Connected to Database"); 
      });
      connection.query("SELECT freqpayment.payment AS method FROM (SELECT payment_method.payment_type AS payment, COUNT(payment_method.payment_type) AS total FROM payment_method JOIN orders ON payment_method.payment_id = orders.payment_method GROUP BY payment_method.payment_type) AS freqpayment ORDER BY freqpayment.total DESC LIMIT 1", function(err,results) {
        if (err) throw err; 
        else {
        console.log(results); 
        result = JSON.parse(JSON.stringify(results))[0].method;
        console.log(result); 
        } 
      }) 
      await interaction.deferReply();
	  	await wait(4000); 
      await interaction.editReply(String(result));
      connection.end(); 
    }

    if (interaction.commandName === 'frequenltyrequestedstock') {
      const connection =  mysql.createConnection({
        host     : DATABASE_HOST,
        user     : DATABASE_USER,
        password : DATABASE_PASSWORD,
        port     : DATABASE_PORT, 
        database : DB
      }); 
      connection.connect(function(err) {
        if (err) throw err;
        else console.log("Connected to Database"); 
      });
      connection.query("SELECT stock.description AS FreqRequested, COUNT(stock.description) AS counts FROM warehouse_request JOIN stock ON warehouse_request.stock = stock.stock_id GROUP BY stock.description, warehouse_request.request_id ORDER BY counts DESC LIMIT 1", function(err,results) {
        if (err) throw err; 
        else {
        console.log(results); 
        result = JSON.parse(JSON.stringify(results))[0].FreqRequested;
        console.log(result); 
        } 
      }) 
      await interaction.deferReply();
	  	await wait(4000); 
      await interaction.editReply(String(result));
      connection.end(); 
    }

    if (interaction.commandName === 'catproductpurchase-regusers') {
      const connection =  mysql.createConnection({
        host     : DATABASE_HOST,
        user     : DATABASE_USER,
        password : DATABASE_PASSWORD,
        port     : DATABASE_PORT, 
        database : DB
      }); 
      connection.connect(function(err) {
        if (err) throw err;
        else console.log("Connected to Database"); 
      });
      connection.query("SELECT categories.category_name AS category, COUNT(categories.category_name) AS counts FROM (((categories JOIN categories_products ON categories.category_id = categories_products.categories) JOIN order_details ON order_details.products = categories_products.products) JOIN orders ON orders.order_number = order_details.orders) JOIN general_user ON orders.general_user = general_user.user_id WHERE general_user.is_registered = 1 GROUP BY categories.category_name ORDER BY counts DESC LIMIT 1", function(err,results) {
        if (err) throw err; 
        else {
        console.log(results); 
        result = JSON.parse(JSON.stringify(results))[0].category;
        console.log(result); 
        } 
      }) 
      await interaction.deferReply();
	  	await wait(4000); 
      await interaction.editReply(String(result));
      connection.end(); 
    }


    
  }
);

client.login(TOKEN);