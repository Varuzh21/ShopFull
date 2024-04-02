sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    'use strict';
    
    return Controller.extend("com.shop.controller.DetailDetail",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.getOwnerComponent().getRouter().getRoute("DetailDetail").attachPatternMatched(this._onDetailMatch, this);
        },

        _onDetailMatch: function(oEvent){
            this.categorisId = oEvent.getParameter("arguments").categorisId
            this.productId = oEvent.getParameter("arguments").productId
            this.layout = oEvent.getParameter("arguments").layout
            this.getView().getModel("AppView").setProperty("/layout", this.layout)
            this.getProduct()
        },

        getProduct: function(){
            const path = `/Product(${this.productId})`
            this.getView().bindElement({
                path: path,
            })
        },

        handleFullScreen: function () {
            const sNextLayout = this.getView().getModel("AppView").getProperty("/actionButtonsInfo/endColumn/fullScreen");
            this.getView().getModel("AppView").setProperty("/actionButtonsInfo/endColumn/fullScreen", !sNextLayout);
            !sNextLayout ? this.getView().getModel("AppView").setProperty("/layout", "EndColumnFullScreen") : this.getView().getModel("AppView").setProperty("/layout", "ThreeColumnsMidExpanded")
        },

        handleClose: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            this.getView().getModel("AppView").setProperty("/layout", "TwoColumnsMidExpanded")
            oRouter.navTo("Detail");
        }
    })
});