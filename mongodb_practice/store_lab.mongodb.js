use("lab_store");
db.products.find({
  price: { $gte: 100, $lte: 1000 },
});
