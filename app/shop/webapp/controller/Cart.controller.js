sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library"
], function(Controller, fLibrary) {
    'use strict';
    
    return Controller.extend("com.shop.controller.Cart",{

        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.getOwnerComponent().getRouter().getRoute("Cart").attachPatternMatched(this._onDetailMatch, this);
        },
           
        _onDetailMatch: function(oEvent){
            this.layout = oEvent.getParameter("arguments").layout || fLibrary.LayoutType.TwoColumnsMidExpanded;
            this.getView().getModel("AppView").setProperty("/layout", this.layout);
        },

         currentChangeHandler: function(oEvent) {
            const oSelectedItem = oEvent.getSource().getParent();
            const oContext = oSelectedItem.getBindingContext();

            const iQuantity = parseInt(oEvent.getParameter("value"));
            const fPrice = parseFloat(oContext.getProperty("price"));

            const fTotalPrice = iQuantity * fPrice;
            oContext.getObject().totalPrice = fTotalPrice;
            oContext.setProperty("totalPrice", fTotalPrice);
            oContext.getModel().refresh();
        },

        toPay: async function () {
            const oTable = this.getView().byId("cartTable");
            const aItems = oTable.getItems();
            const aItemsData = [];
            let fTotalAmount = 0;

            aItems.forEach(function (oItem) {
                const oContext = oItem.getBindingContext();
                const oItemData = oContext.getObject();
                const fTotalPrice = parseFloat(oContext.getProperty("totalPrice"));
                fTotalAmount += fTotalPrice;
                aItemsData.push(oItemData);
            });
            console.log(aItemsData, fTotalAmount);
            
            try {
                const oModel = this.getView().getModel();
                const oBindingContext = await oModel.bindContext('/addOrderItem(...)')
                oBindingContext.setParameter("allProductCart", aItemsData);
                const result = await oBindingContext.execute();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        },

        handleFullScreen: function () {
            const sNextLayout = this.getView().getModel("AppView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
            this.getView().getModel("AppView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !sNextLayout);
            !sNextLayout ? this.getView().getModel("AppView").setProperty("/layout", "MidColumnFullScreen") : this.getView().getModel("AppView").setProperty("/layout", "TwoColumnsMidExpanded")
        },

        handleClose: function(){
            this.getView().getModel("AppView").setProperty("/layout", "OneColumn")
            this.oRouter.navTo("Master");
        }
    })
});