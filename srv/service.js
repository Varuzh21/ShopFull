const cds = require('@sap/cds')
module.exports = (srv) =>{
    const {ShopCart, Order_Item} = cds.entities("shopfull")
    srv.on("addShopCart", async (req) =>{
        const data = req.data;
        const shop = await INSERT({
            product_ID: data.product_ID,
        }).into(ShopCart)
        return "product is added to ShopCart";
    });

    srv.on("addOrderItem", async (req) =>{
        debugger
        const Data = req.data
        const OrderItemData = await INSERT({
            title: Data.title,
            price: Data.price,
            quantity: Data.quantity,
            images: Data.images,
            rating: Data.rating,
        }).into(Order_Item);
        return "product is Order_Item"
    })
}