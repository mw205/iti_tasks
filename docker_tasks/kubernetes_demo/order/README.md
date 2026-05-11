# Create order
curl -X POST http://localhost:3000/api/order \
  -H "Content-Type: application/json" \
  -d '{"item":"coffee","quantity":2}'

# Get all orders
curl http://localhost:3000/api/order
