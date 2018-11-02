var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the print function after the connection is made to prompt the user
  print();
});
function print() {
  var table = new Table({
    head: ['ID', 'Product Name', 'Category Name', 'Price'],
    colWidths: [5, 40, 20, 12]
  });
  // when finished prompting, insert a new item into the db with that info
  connection.query(
    "SELECT * FROM products",
    function (err, result, fields) {
      if (err) throw err;
      //console.log(fields);
      result.forEach(function (row) {
        //console.log(row.item_id);
        table.push(
          [row.item_id, row.product_name, row.department_name, row.price]
        );
      });
      console.log(table.toString());
      placeOrder();
    }
  );
}
// function which prompts the user for what action they should take
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
          if (value.match(/\d+/)) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      let chosenProductId = answer.productId;
      let chosenProductToBuy = answer.buyProduct;
      //console.log(answer);

      // based on their answer, either call the bid or the post functions
      //console.log("am i working?");
      readProducts(chosenProductId, chosenProductToBuy);
    });
}
function readProducts(id, buy) {
  //console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products WHERE item_id= " + mysql.escape(id), function (err, res) {
    if (err) throw err;
    let currentProductCount = res[0].stock_quantity;
    if (currentProductCount >= buy) {
      currentProductCount -= buy;
      //console.log(currentProductCount);
      updateProduct(currentProductCount, id);
    } else {
      console.log("Insufficient quantity!")
    }
    //console.log(res);
    let price = res[0].price;
    total( buy, price);
  });
 
}
function updateProduct(quantity, id) {
  //console.log("Updating all product quantities...\n");
  var query = connection.query(
    "UPDATE products SET stock_quantity=" + mysql.escape(quantity) + " WHERE item_id=" + mysql.escape(id), function (err, res) {
      //console.log(res.affectedRows + " products updated!\n");
    }
  );

  // logs the actual query being run
  //console.log(query.sql);
}
function total( chosenProductToBuy, chosenProductPrice){
  console.log("-------------------------------------------------------");
  console.log("Your total is $" + (chosenProductToBuy * chosenProductPrice).toPrecision(4));
  connection.end();
}