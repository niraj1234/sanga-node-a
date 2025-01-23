const express = require('express');
const app = express();
app.listen(3000);

app.get('/products/:pid' , (req,res) => {
    const products = [
        {
            id: 1,
            label: "Laptop",
          },
          {
            id: 2,
            label: "TV",
          },
          {
            id: 3,
            label: "Mobile",
          },
    ];
    const productId = parseInt(req.params.pid);
    console.log(productId);
    const singleProduct = products.find((p) => p.id === productId);

    if(singleProduct){
        res.json(singleProduct);
    }else{
        res.status(404).send("Product with given id not found");
    }
})
