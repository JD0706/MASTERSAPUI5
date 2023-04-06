sap.ui.define([
    'sap/ui/core/mvc/Controller'
   
], function(Controller) {
    'use strict';

    return Controller.extend("logaligroup.invoices.controller.Details",{
     
        _onObjectMatch: function (oEvent) {
             this.getView().bindElement({
              path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
              model: "northwind"
            });
          },
    


        onInit: function(){
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
        }

    });
  
}); 