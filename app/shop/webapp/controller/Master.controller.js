sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/Popover",
    "sap/m/List",
    "sap/m/StandardListItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Sorter, Popover, List, StandardListItem) {
        "use strict";

        return Controller.extend("com.shop.controller.Master", {
            onInit: function () {
               this.oRouter = this.getOwnerComponent().getRouter();
               this.getOwnerComponent().getRouter().getRoute("RouteMaster").attachPatternMatched(this._onMasterMatch, this);
            },

            _onMasterMatch: function(){

            },

            onPress: function(oEvent) {
                this.oMyAvatar = this.getView().byId("myAvatar");

                if (!this._oPopover) {
                    this._oPopover = new Popover({
                        title: "User Menu",
                        contentWidth: "200px",
                        placement: sap.m.PlacementType.Auto
                    });
                }

                const oList = new List({
                    items: [
                        new StandardListItem({ icon: "sap-icon://customer", title: "Name", type: "Active", press: this.onListItemPress.bind(this) }),
                        new StandardListItem({ icon: "sap-icon://log", title: "Sign Out", type: "Active", press: this.onListItemPress.bind(this) })   
                    ]
                });

                this._oPopover.removeAllContent();
                this._oPopover.addContent(oList);

                let oEventSource = oEvent.getSource(),
                bActive = this.oMyAvatar.getActive();

                this.oMyAvatar.setActive(!bActive);

                if (bActive) {
                    this._oPopover.close();
                } else {
                    this._oPopover.openBy(oEventSource);
                }
            },



		    onPopoverClose: function () {
		 	    this.oMyAvatar.setActive(false);
		    },

		    onListItemPress: function () {
			    this.oMyAvatar.setActive(false);
			    this._oPopover.close();
		    },

            onNav: function(){
                this.oRouter.navTo("Cart", {
                    layout: "TwoColumnsMidExpanded"
                });
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