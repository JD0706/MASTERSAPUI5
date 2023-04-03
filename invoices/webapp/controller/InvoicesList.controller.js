sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function(Controller,JSONModel) {
    'use strict';
    return Controller.extend("logaligroup.invoices.controller.InvoicesList",{
     onInit :  function(){
        let oViewModel = new JSONModel({
            usd:"USD",
            eur:"EUR"       
         });
        this.getView().setModel(oViewModel, "currency");     
     }
    });
});  