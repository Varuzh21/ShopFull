const cds = require("@sap/cds");
module.exports = (srv) => {
  const { ShopCart, Order_Items } = cds.entities("shopfull");
  srv.on("addShopCart", async (req) => {
    const data = req.data;
    const shop = await INSERT({
      product_ID: data.product_ID,
    }).into(ShopCart);
    return "product is added to ShopCart";
  });

  srv.on("addOrderItem", async (req) => {
    debugger;
    const { allProductCart } = req.data;
    const promises =  allProductCart.map((e) => {
      return INSERT({
        product: e.product,
        quantity: e.quantity,
        totalPrice: e.totalPrice,
      }).into(Order_Items);
    });
    await Promise.all(promises)
    return "product is Order_Item";
  });
};