const cds = require("@sap/cds");
module.exports = (srv) => {
  const { ShopCart, Order_Item } = cds.entities("shopfull");
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
        title: e.title,
        price: e.price,
        quantity: e.quantity,
        rating: e.rating,
        totalPrice: e.totalPrice,
      }).into(Order_Item);
    });
    await Promise.all(promises)
    return "product is Order_Item";
  });
};