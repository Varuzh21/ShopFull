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