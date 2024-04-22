sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/util/Storage"
], function(Controller, fLibrary, JSONModel, MessageBox, Storage) {
    'use strict';
    
    return Controller.extend("com.shop.controller.Cart",{

        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.getOwnerComponent().getRouter().getRoute("Cart").attachPatternMatched(this._onDetailMatch, this);
            const model = new JSONModel();
            this.getView().setModel(model, "TestModel");
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
            this._updateTotalAmount(fPrice);
            oContext.getModel().refresh();  
        },
        
        chackOut: async function () {
            const oTable = this.getView().byId("cartTable");
            const aItems = oTable.getItems();
            const aItemsData = [];
            let fTotalAmount = 0;

            aItems.forEach(function (oItem) {
                const oContext = oItem.getBindingContext();
                const oItemData = oContext.getObject();
                const fTotalPrice = parseFloat(oContext.getProperty("totalPrice"));
                fTotalAmount += fTotalPrice;
                aItemsData.push({
                    product: oItemData.ID,
                    quantity: oItemData.quantity,
                    totalPrice: oItemData.totalPrice
                })
            });

            try {
                this.generatePDF(aItemsData)
                const oModel = this.getView().getModel();
                const oBindingContext = oModel.bindContext('/addOrderItem(...)')
                oBindingContext.setParameter("allProductCart", aItemsData);
                const result = await oBindingContext.execute();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        },

        generatePDF: function(data){
            console.log(data);
            const rows = [];
            data.forEach(function (item) {
                const row = [];
                Object.keys(item).forEach(function (key) {
                row.push(item[key]);
            });
                rows.push(row);
            });

            const docDefinition = {
                content: [
                    {
                        style: "header",
                        alignment: "center",
                        text: "Shop"
                    }
                    , {
                table: {
                    headerRows: 1,
                    widths: ["*", "*","*"],
                    body: [
                        ["Id",  "Quantity", "Total Price"],
                         ...rows
                    ]
                }
            }
        ]
    };
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
                pdfDocGenerator.download("table.pdf");
        },

        onDelete: function(oEvent){
            const oButton = oEvent.getSource();
            const oItem = oButton.getParent();

            const oContext = oItem.getBindingContext();
            const sItemId = oContext.getProperty("ID");
    
            if(sItemId){
                oItem.getBindingContext().delete("$auto").then(function () {
                    MessageBox.success("SuccessFully Deleted");
                }.bind(this), function (oError) {
                    console.log("Deletion Error: ",oError);
                });
            }
        },

        _updateTotalAmount: function(oItem) {
            const oTable = this.getView().byId("cartTable");
            const aItems = oTable.getItems();
            let fTotalAmount = 0;

            aItems.forEach(function (oItem) {
                const oContext = oItem.getBindingContext();
                const fTotalPrice = parseFloat(oContext.getProperty("totalPrice"));
                fTotalAmount += fTotalPrice;
            });

            const Items = [fTotalAmount, oItem]

            const oTestModel = this.getView().getModel("TestModel");
            oTestModel.setProperty("/fTotalAmount", Items);
            oTestModel.refresh();
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