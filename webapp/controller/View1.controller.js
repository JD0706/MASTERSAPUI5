sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.applists.controller.View1", {
            onInit: function () {
                var oJsonModel = new sap.ui.model.json.JSONModel();
                oJsonModel.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJsonModel);
            }
        });
    });