sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    'use strict';
    
    return Controller.extend("com.shop.shop.controller.Detail",{
        oninit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onDetailMatch, this);
            this.getOwnerComponent().getRouter().getRoute("DetailDetail").attachPatternMatched(this._onDetailMatch, this);
        },

        _onDetailMatch: function(oEvent){
            this.categorisId = oEvent.getParameter("arguments").categorisId;
        }
    })
});