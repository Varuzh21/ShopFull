sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library"
], function(Controller, fLibrary) {
    'use strict';
    
    return Controller.extend("com.shop.controller.Detail",{
        
        oninit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onDetailMatch, this);
            // this.getOwnerComponent().getRouter().getRoute("DetailDetail").attachPatternMatched(this._onDetailMatch, this);
        },

        _onDetailMatch: function(oEvent){
            this.categorisId = oEvent.getParameter("arguments").categorisId;
            this.layout = oEvent.getParameter("arguments").layout || fLibrary.LayoutType.TwoColumnsMidExpanded;
            this.getView().getModel("AppView").setProperty("/layout", this.layout);
        }
    })
});