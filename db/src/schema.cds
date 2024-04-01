namespace shopfull;

using {cuid} from '@sap/cds/common';

entity Product : cuid {
   title: String;
   description: String;
   price: String;
   rating: Integer;
   images: String;
   categoris: Association to Categoris;   
}

entity Categoris : cuid {
    name: String;
    product: Association to Product on product.categoris = $self;
}

entity User : cuid {
    firstName: String;
    lastName: String;
    role: String;
    payment: Association to Payment;
}

entity Payment : cuid {
    paymentDate: DateTime;
    amount: Integer;
    order: Association to many Order on order.payment = $self;   
    user: Association to many User on user.payment = $self; 
}

entity Order : cuid {
    orderDate: DateTime;
    totalPrice: Integer;
    payment: Association to Payment;
    order_Item: Association to many Order_Item on order_Item.order = $self;
}

entity Order_Item : cuid {
    quantity: Integer;
    price: Integer;
    order: Association to Order;
}