sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
], function(Controller, fLibrary, JSONModel, MessageBox) {
    'use strict';
    
    return Controller.extend("com.shop.controller.Cart",{

        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.getOwnerComponent().getRouter().getRoute("Cart").attachPatternMatched(this._onDetailMatch, this);
            const model = new JSONModel({
                currency: "USD",
                fTotalAmount: 399.99571354
            });
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
            
            this.getView().byId("cardList").getBinding('items').refresh()
        },
        
        chackOut: async function () {
            const oTable = this.getView().byId("cartTable");
            const aItems = oTable.getItems();
            const aItemsData = [];
            const rows = []

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

                rows.push({
                    images: oItemData.images.url,
                    title: oItemData.title,
                    quantity: oItemData.quantity,
                    price: oItemData.price,
                    totalPrice: oItemData.totalPrice
                })
            });
 
            try {
                this.generatePDF(rows, fTotalAmount)
                const oModel = this.getView().getModel();
                const oBindingContext = oModel.bindContext('/addOrderItem(...)')
                oBindingContext.setParameter("allProductCart", aItemsData);
                const result = await oBindingContext.execute();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        },

        generatePDF: function(data, fTotalAmount) {
                let htmlContent = '<html> <body> <h1 style="text-align: left;">Order summary</h1>';

                htmlContent += '<div style="border: 1px solid rgba(0,0,0,0.34); width: 98%; height: auto; padding: 10px;">';
                htmlContent += '<div style="display: flex; justify-content: space-between;">';
                htmlContent += '<div style="display: flex;justify-content: space-between;width: 100%; flex-direction: column;">';
                    data.forEach(function(item) {
                        htmlContent += '<div style="display: flex; justify-content: space-between; padding-top: 15px">';
                        htmlContent += '<div style="display: flex">';
                        htmlContent += `<img src="${item.images}" style="width: 50px"/>`;
                        htmlContent += '<div>';
                        htmlContent += '<p>' + item.title  + '</p>';
                        htmlContent += '<p>' + 'Qty:'  + item.quantity  + '</p>';
                        htmlContent += '</div>';
                        htmlContent += '</div>'; 
                        htmlContent += '<p style="margin-right: 15px;">' + '$' + item.totalPrice + '</p>';
                        htmlContent += '</div>';
                    });
                htmlContent += '<p style="border: 1px solid rgba(0,0,0,0.26);">' + '</p>'
                
                htmlContent += '<div style="display: flex; padding-top: 15px">';

                htmlContent += '<div style="display: flex; justify-content: space-between; width: 100%">';
                htmlContent += '<p style="margin-left: 45px;">' + 'Total' + '</p>';
                htmlContent += '<p style="color: green; margin-right: 15px;">' + '$' + fTotalAmount  + '</p>';
                htmlContent += '</div>';

                htmlContent += '</div>';
                    
                htmlContent += '</div></div></div></body></html>';

                    const options = {
                        margin: 5,
                        filename: 'cart.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait' }
                    };


                html2pdf().from(htmlContent).set(options).save('table.pdf');
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
            this.getView().byId("cardList").getBinding('items').refresh()
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