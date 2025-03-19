const express = require('express')
const dbConnect = require('./db/connection')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const app = express()
const cors = require('cors')
const port = 9000
app.use(cors());
app.use(express.json());
dbConnect();


app.use(userRoutes);
app.use(productRoutes);
app.use(categoryRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})