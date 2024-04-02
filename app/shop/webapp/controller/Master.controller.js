sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Sorter) {
        "use strict";

        return Controller.extend("com.shop.controller.Master", {
            onInit: function () {
               this.oRouter = this.getOwnerComponent().getRouter();
               this.getOwnerComponent().getRouter().getRoute("RouteMaster").attachPatternMatched(this._onMasterMatch, this); 
            },

            _onMasterMatch: function(){

            },

            onNavigate: function(oEvent){
               const oItem = oEvent.getParameter("listItem");
            
                this.oRouter.navTo("Detail", {
                    categorisId: oItem.getBindingContext().getObject().ID,
                    layout: "TwoColumnsMidExpanded"
                });
            },

            onSearch: function (oEvent) {
                let oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new Filter("name", FilterOperator.Contains, sQuery)];
                }

                this.getView().byId("categorisTable").getBinding("items").filter(oTableSearchState, "Application");
            },

            onSort: function () {
                this._bDescendingSort = !this._bDescendingSort;
                let oView = this.getView(),
                    oTable = oView.byId("categorisTable"),
                    oBinding = oTable.getBinding("items"),
                    oSorter = new Sorter("name", this._bDescendingSort);

                oBinding.sort(oSorter);
            }
        });
    });
