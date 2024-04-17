sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Popover",
    "sap/m/List",
    "sap/m/StandardListItem"
  ],
  function (BaseController, JSONModel, Popover, List, StandardListItem) {
    "use strict";

    return BaseController.extend("com.shop.controller.App", {
      onInit: function () {
        const model = new JSONModel({
          layout: "OneColumn",
          actionButtonsInfo: {
            midColumn: {
              fullScreen: false
            },
            endColumn: {
              fullScreen: false
            }
          },
        });
        this.getView().setModel(model, "AppView");
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
    });
  },
  
);