sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, fLibrary, Filter, FilterOperator) {
    'use strict';
    
    return Controller.extend("com.shop.controller.Detail",{

        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onDetailMatch, this);
            this.getOwnerComponent().getRouter().getRoute("DetailDetail").attachPatternMatched(this._onDetailMatch, this);
        },

        _onDetailMatch: function(oEvent){
            this.categorisId = oEvent.getParameter("arguments").categorisId;
            this.layout = oEvent.getParameter("arguments").layout || fLibrary.LayoutType.TwoColumnsMidExpanded;
            this.getView().getModel("AppView").setProperty("/layout", this.layout);
            this.bindListItems();
        },

        bindListItems: function(){
            const list = this.getView().byId("detailTable");
            const template = list.getBindingInfo("items").template;

            list.bindItems({
                path: "/Product",
                template: template,
                filters: [new Filter("categoris_ID", FilterOperator.EQ, this.categorisId)]
                });
        },
        
        onNavigate: function (oEvent) {
            const oItem = oEvent.getParameter("listItem")             
            this.oRouter.navTo("DetailDetail", {
                categorisId: this.categorisId,
                productId: oItem.getBindingContext().getObject().ID,
                layout: "ThreeColumnsMidExpanded"
            })
        },

        handleFullScreen: function () {
            const sNextLayout = this.getView().getModel("AppView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
            this.getView().getModel("AppView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !sNextLayout);
            !sNextLayout ? this.getView().getModel("AppView").setProperty("/layout", "MidColumnFullScreen") : this.getView().getModel("AppView").setProperty("/layout", "TwoColumnsMidExpanded")
        },

        handleClose: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            this.getView().getModel("AppView").setProperty("/layout", "OneColumn")
            oRouter.navTo("Master");
        }
    })
});