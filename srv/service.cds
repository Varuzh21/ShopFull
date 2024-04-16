using shopfull as my from '../db/src/schema';

service ShopService {
    entity Product      as projection on my.Product;
    entity Categoris    as projection on my.Categoris;
    entity User         as projection on my.User;
    entity Payment      as projection on my.Payment;
    entity Order        as projection on my.Order;
    entity Order_Items   as projection on my.Order_Items;
    entity Images       as projection on my.Images;
    entity ShopCart     as projection on my.ShopCart;

    entity ShopCartView as
        projection on my.ShopCart {
            *,
            product.title,
            product.description,
            product.rating,
            product.price,
            product.images,
            quantity,
            product.price * quantity as totalPrice: Double,
            product.ID as productID
        }

    action addShopCart(product_ID : UUID)                     returns String;
    action addOrderItem(allProductCart : array of Order_Items) returns String;
}
