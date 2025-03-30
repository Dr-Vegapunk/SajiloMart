const express = require('express')
require('dotenv').config()

const dbConnect = require('./db/connection')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const app = express()
const cors = require('cors')
const port = 9000
app.use(cors())
  // cors({
  //   origin: "http://localhost:3000/",
  //   methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
  //   credentials: true,
  // })
// );
app.use(express.json());
dbConnect();


app.use(userRoutes);
app.use(productRoutes);
app.use(categoryRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})