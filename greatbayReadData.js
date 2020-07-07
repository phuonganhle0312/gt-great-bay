var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Virtue77$GOD",
  database: "greatbay_db",
});

const bidQuestions = [ {
    type: "list",
    name: "itemBid",
    message:"Which item would you like to bid on?",
    choices: []
},
{
    type: "input",
    name: "amount",
    message:"How much would you like to bid?"
}];

const postQuestions = [{
    name:"item",
    type:"input",
    message:"What is the item you wish to submit?"
}, {
    name:"category",
    type:"input",
    message:"what category would you like to place it in?"
},{
    name:"startingBid",
    type:"input",
    message:"what would you like the starting bid to be?"
}];

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //Vol, maybe this should be changed to start(), instead since this will get the functions going ?
    start();
  });
  function createBid() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
      "INSERT INTO auctions SET ?",
      {
        item: name.item,
        catergory: name.catergory,
        startingBid: name.startingBid,
      },
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " item inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        updateBid();
      }
    );
    // logs the actual query being run
    console.log(query.sql);
  }
  function updateBid() {
    console.log("Updating bid quantities...\n");
    var query = connection.query(
      "UPDATE auctions SET ? WHERE ?",
      [
        {
          startingBid: name.startingBid,
        },
        {
          id: name.id,
        },
      ],
      function (err, res) {
        if (err) throw err;
        console.log(res.startingBid + " bid updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        readBid();
      }
    );
    // logs the actual query being run
    console.log(query.sql);
  }
  function readBid() {
    console.log("Selecting all auctions...\n");
    connection.query("SELECT * FROM auctions", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }
  

function start () {
    inquirer.prompt([
        {
            type: "list",
            name: "begin",
            message:"Choose if you would like to Bid, Post or Exit.",
            choices:["Bid", "Post", "Exit"]
        }
    ]).then((response) => {
        console.log(response.begin);
        if(response.begin === "Bid") {
            return inquirer.prompt(bidQuestions).then((response2) => {
                createBid(bidQuestions);
            })
        } else if(response.begin === "Post") {
            return inquirer.prompt(postQuestions).then((response2) => {
                updateBid();
            })
        } else {
            connection.end;
        }
                
            
                
    } 


    })

};

start();