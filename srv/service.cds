using shopfull as my from '../db/src/schema';

service ShopService {
    entity Product as projection on my.Product;
    entity Categoris as projection on my.Categoris;
    entity User as projection on my.User;
    entity Payment as projection on my.Payment;
    entity Order as projection on my.Order;
    entity Order_Item as projection on my.Order_Item;
    entity ShopCart as projection on my.ShopCart;

    action addShopCart() returns String;
}