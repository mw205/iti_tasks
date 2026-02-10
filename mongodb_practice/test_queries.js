use("MyTestDatabase");
db.getCollection("test_collection").insertOne({
  name: "Waleed",
  timestamp: new Date(),
});
db.getCollection("test_collection").find({});
