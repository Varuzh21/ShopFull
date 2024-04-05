sap.ui.define([
  "sap/ui/core/mvc/Controller"
  ],
  function (Controller) {
    "use strict";

    return Controller.extend("com.shop.controller.DetailDetail", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.getOwnerComponent()
          .getRouter()
          .getRoute("DetailDetail")
          .attachPatternMatched(this._onDetailMatch, this);
      },

      _onDetailMatch: function (oEvent) {
        this.categorisId = oEvent.getParameter("arguments").categorisId;
        this.productId = oEvent.getParameter("arguments").productId;
        this.layout = oEvent.getParameter("arguments").layout;
        this.getView().getModel("AppView").setProperty("/layout", this.layout);
        this.getProduct();
      },

      getProduct: function () {
        const path = `/Product(${this.productId})`;
        this.getView().bindElement({
          path: path,
        });
      },

      handleFullScreen: function () {
        const sNextLayout = this.getView()
          .getModel("AppView")
          .getProperty("/actionButtonsInfo/endColumn/fullScreen");
        this.getView()
          .getModel("AppView")
          .setProperty("/actionButtonsInfo/endColumn/fullScreen", !sNextLayout);
        !sNextLayout
          ? this.getView()
              .getModel("AppView")
              .setProperty("/layout", "EndColumnFullScreen")
          : this.getView()
              .getModel("AppView")
              .setProperty("/layout", "ThreeColumnsMidExpanded");
      },

      handleClose: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        this.getView()
          .getModel("AppView")
          .setProperty("/layout", "TwoColumnsMidExpanded");
        oRouter.navTo("Detail");
      },

    //   onPress: function () {
    //     const oModel = this.getView().getModel();
    //     const parameters = {productid: this.productId};
    //     const oBatchRequest = {
    //       batchGroupId: "myBatch",
    //       changesetId: "myChangeset",
    //       requests: [],
    //     };
    //     oBatchRequest.requests.push(
    //       oModel.createBindingContext({
    //         path: "/addShopCart",
    //       })
    //     );
    //     oModel
    //       .submitBatch("myBatch")
    //       .then(function (oResponse) {})
    //       .catch(function (oError) {});
    //   },
    

    onPress: async function () {
      try {
            const oModel = this.getView().getModel();
            const oContext = this.getView().getBindingContext();
            const sProductId = this.productId;

            const oBinding = this.getView().getModel().createBindingContext('/ShopCart("0e00fee7-f6a7-4fe5-9e00-a6e641af8d68")?$expand=product,user')

            // Ensure the binding context is deferred
            const oBindingContext = await oModel.bindContext('/ShopCart("0e00fee7-f6a7-4fe5-9e00-a6e641af8d68")?$expand=product,user', oBinding, { $$groupId: "myBatch" })

            // Set parameters
            oBindingContext.setParameter("product_ID", sProductId);

            // Execute the action
            const result = await oBindingContext.execute();
    
            console.log(result);
      } catch (error) {
            console.error(error);
      }
        // const oModel = this.getView().getModel();
        // const oContext = this.getView().getBindingContext();
        // const parameters = {productid: this.productId};

        // const oBindingContext = oModel.createBindingContext("/ShopCart");

        // // const oBindingContext = new sap.ui.model.odata.v4.ODataContextBinding()
        // // oBindingContext.setParameter("path", "/ShopCart");
        // const oBatchRequest = {
        //   batchGroupId: "myBatch",
        //   changesetId: "myChangeset",
        //   requests: [parameters],
        // };

        // oBatchRequest.requests.push(oBindingContext);

        // oModel.submitBatch("myBatch")
        //     .then(function (oResponse) {
        //     })
        //     .catch(function (oError) {
        //         console.error("Error occurred while submitting batch request:", oError);
        //     });
        },
    });
  }
);