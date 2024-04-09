const cds = require('@sap/cds')
module.exports = (srv) =>{
    const {ShopCart} = cds.entities("shopfull")
    srv.on("addShopCart", async (req) =>{
        debugger
        const data = req.data;
        const shop = await INSERT({
            product_ID: data.product_ID,
        }).into(ShopCart)
        return "product is added to ShopCart";
    });
}