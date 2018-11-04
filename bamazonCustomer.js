//include all npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  //localhost
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password if required and the name of the database
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  //handle errors
  if (err) throw err;
  // run the print function after the connection is made to prompt the user
  print();
});

//shows the products in stock
function print() {
  //initialize new table
  var table = new Table({
    head: ['ID', 'Product Name', 'Category Name', 'Price'],
    colWidths: [5, 40, 20, 12]
  });

  // access the products in the database
  connection.query(
    "SELECT * FROM products",
    function (err, result, fields) {
      //handles errors
      if (err) throw err;

      //loop through each row
      result.forEach(function (row) {
        //load data onto table
        table.push(
          [row.item_id, row.product_name, row.department_name, row.price]
        );
      });

      //display table on terminal
      console.log(table.toString());

      //prompt the user to buy an item from the list
      placeOrder();
    }
  );
}
// function which prompts the user to buy an item
function placeOrder() {
  inquirer
    .prompt([
      {
        name: "productId",
        type: "input",
        message: "Please input the id of the product you would like to buy: ",
        validate: function (value) {
          if (value.match(/\d+/)) {
            return true;
          }
          return false;
        }
      }, {
        name: "buyProduct",
        type: "input",
        message: "How many units would you like to buy: ",
        validate: function (value) {
          if (value.match(/\d+/) && parseInt(value) > 0) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      //initialize the product id
      let chosenProductId = answer.productId;

      //initialize the number of products to be bought
      let chosenProductToBuy = answer.buyProduct;

      // based on their answer place the order
      reduceProductCount(chosenProductId, chosenProductToBuy);
    });
}
function reduceProductCount(id, buy) {
  //access products given their id
  connection.query("SELECT * FROM products WHERE item_id= " + mysql.escape(id), function (err, res) {
    //handles errors
    if (err) throw err;

    //initialize product count from teh database
    let currentProductCount = res[0].stock_quantity;

    //runs if there are products available
    if (currentProductCount >= buy) {
      //reduce the stock size by the amount of products being bought
      currentProductCount -= buy;
      
      //update the stock
      updateProduct(currentProductCount, id);

      //initialize the price per item
      let price = res[0].price;

      //display the total for the transaction
      total(buy, price);
    } else {
      //display in case there is not enough stock
      console.log("Insufficient quantity!")

      //display the question menu aqain to give the user a change to order another product
      placeOrder();
    }
  });
}

//update products on the database
function updateProduct(quantity, id) {
  var query = connection.query(
    "UPDATE products SET stock_quantity=" + mysql.escape(quantity) + " WHERE item_id=" + mysql.escape(id), function (err, res) {
      //provides confirmation the products quantities were updated
      //console.log(res.affectedRows + " products updated!\n");
    }
  );
}

//shows the total for the order
function total(chosenProductToBuy, chosenProductPrice) {
  //placed to help readability
  console.log("-------------------------------------------------------");

  //print out the total for the order
  console.log("Your total is $" + (chosenProductToBuy * chosenProductPrice).toPrecision(4));

  //close connection to the database
  connection.end();
}