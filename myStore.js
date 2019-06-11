var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "myStoreDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
});
//FROM HERE DOWN COMMENTED OUT
// function to handle posting new items up for auction
function start() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the id of the item you would like to purchase?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },

      {
        name: "quantity",
        type: "input",
        message: "How many units of the product would you like to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])

    //     IM FIGURING OUT THE REST!!!!
    //     .then(function(answer) {
    //       // when finished prompting, insert a new item into the db with that info
    //       connection.query(
    //         "INSERT INTO auctions SET ?",
    //         {
    //           item_name: answer.item,
    //           category: answer.category,
    //           starting_bid: answer.startingBid || 0,
    //           highest_bid: answer.startingBid || 0
    //         },
    //         function(err) {
    //           if (err) throw err;
    //           console.log("Your auction was created successfully!");
    //           // re-prompt the user for if they want to bid or post
    //           start();
    //         }
    //       );
    //     });
    // }

    // function buyItem() {
    //   // query the database for all items being purchased
    //   connection.query("SELECT * FROM products", function (err, results) {
    //     if (err) throw err;
    //     // once you have the items, prompt the user for which they'd like to buy on
    //     inquirer
    //       .prompt([
    //         {
    //           name: "choice",
    //           type: "list",
    //           choices: function () {
    //             var choiceArray = [];
    //             for (var i = 0; i < results.length; i++) {
    //               choiceArray.push(results[i].item_name);
    //             }
    //             return choiceArray;
    //           },
    //           message: "What item would you like to purchase?"
    //         },
    //         {
    //           name: "quantity",
    //           type: "input",
    //           message: "How much would you like to purchase?"
    //         }
    //       ])
    .then(function (input) {

      var item = input.id;
      var quantity = input.quantity;

      console.log('Customer has selected: \n    id = '  + input.id + '\n    quantity = ' + input.quantity);


      // Query db to confirm that the given item ID exists in the desired quantity
      var queryStr = 'SELECT * FROM products WHERE ?';

      connection.query(queryStr, { id: item }, function (err, data) {
        if (err) throw err;

        // If the user has selected an invalid item ID, data array will be empty

        if (data.length === 0) {
          console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
          displayInventory();
connection.end();
        } else {
          var productData = data[0];


          // If the quantity requested by the user is in stock
          if (quantity <= productData.stock_quantity) {
            console.log('Congratulations, the product you requested is in stock! Placing order!');

            // Construct the updating query string
            var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;
            // console.log('updateQueryStr = ' + updateQueryStr);

            // Update the inventory
            connection.query(updateQueryStr, function (err, data) {
              if (err) throw err;

              console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
              console.log('Thank you for shopping with us!');
              console.log("\n---------------------------------------------------------------------\n");

              // End the database connection
              connection.end();
            })
          } else {
            console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
            console.log('Please modify your order.');
            console.log("\n---------------------------------------------------------------------\n");

            connection.end();
            // displayInventory();
          }
        }
      })
    })
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {

  // Construct the db query string
  queryStr = 'SELECT * FROM products';

  // Make the db query
  connection.query(queryStr, function (err, data) {
    if (err) throw err;

    console.log('Current Stock: ');

    var stock = '';
    for (var i = 0; i < data.length; i++) {
      stock = '';
      stock += 'ID: ' + data[i].id + '  ||  ';
      stock += 'Product Name: ' + data[i].product_name + '  ||  ';
      stock += 'Department: ' + data[i].department_name + '  ||  ';
      stock += 'Price: $' + data[i].price + ' || ';
      stock += 'Stock Quantity: ' + data[i].stock_quantity + '\n';

      console.log(stock);
    }

    console.log("---------------------------------------------------------------------\n");

    //Prompt the user for item/quantity they would like to purchase
    start();
  })
}

// execute the main application logic
function myStore() {

  // Display the available inventory
  displayInventory();
}

// Run the application logic
myStore();