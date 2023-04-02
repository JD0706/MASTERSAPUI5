sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment'
           
], 

function(Controller, MessageToast,Fragment ) {

    'use strict';

   
    return Controller.extend("logaligroup.invoices.controller.HelloPanel",{

        onInit: function() {
                             
        },

        onShowHellow : function () {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg",[sRecipient]);
            MessageToast.show(sMsg);
           
         },
         onOpenDialog: function(){
            const oView = this.getView();
            if (!oView.byId("helloDialog")){
                Fragment.load({
                    id: oView.getId(),
                    name: "logaligroup.invoices.view.HelloDialog",
                    controller:this
                }).then(function(oDialog){
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            }else {
              this.byId("helloDialog").open();
            }
           
         },
     onCloseDialog : function(){
        this.byId("helloDialog").close();

     }
    });

    
}); 