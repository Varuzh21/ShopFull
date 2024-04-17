namespace shopfull;

using {cuid} from '@sap/cds/common';

entity Product : cuid {
    title       : String;
    description : String;
    price       : Double;
    rating      : Integer;
    images      : Association to Images;
    categoris   : Association to Categoris;
}

entity Categoris : cuid {
    name    : String;
    product : Association to many Product on product.categoris = $self;
}

entity User : cuid {
    name     : String;
    password : String;
    role     : String;
    payment  : Association to many Payment
                   on payment.user = $self;
}

entity Payment : cuid {
    paymentDate : DateTime;
    amount      : Integer;
    order       : Association to many Order on order.payment = $self;
    user        : Association to User;
}

entity Order : cuid {
    orderDate  : DateTime;
    totalPrice : Integer;
    payment    : Association to Payment;
    order_Item : Association to many Order_Items on order_Item.order = $self;
}

entity Order_Items : cuid {
    quantity   : Integer;
    product    : String;
    totalPrice : Double;
    order      : Association to Order;
}

entity ShopCart : cuid {
    product    : Association to Product;
    user       : Association to User;
    totalPrice : Double;
    quantity   : Integer default 1;
}

entity ShopCartItems : cuid {
    product    : Association to Product;
    user       : Association to User;
    totalPrice : Double;
    quantity   : Integer default 1;
}

entity Images : cuid {
    url     : String;
    product : Association to many Product;
}