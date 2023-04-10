/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "logaligroup/invoices/model/models",
    "./controller/HelloDialog"
],
function (UIComponent,Device,models,HelloDialog) {
    "use strict";

    return UIComponent.extend("logaligroup.invoices.Component", {
        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // enable routing
            this.getRouter().initialize();

            // set the device model
          //  this.setModel(models.createDeviceModel(), "device");
            this.setModel(models.createRecipient()) ;
            this._helloDialog = new HelloDialog(this.getRootControl());
                       
        },

        exit : function(){
            this._helloDialog.destroy() ; 
            delete this._helloDialog;
        },

        onOpenDialog : function(){
            this._helloDialog.open();
        }
    });
}
);