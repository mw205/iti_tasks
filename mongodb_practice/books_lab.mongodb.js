db.Books.find(
    { tags: { $type: "array" }, metadata: { $exists: true } },
)
