connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createBid();
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
