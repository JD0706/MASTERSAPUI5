sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        function getGroupHeader(oGroup){
                var groupHeaderListItem =new sap.m.GroupHeaderListItem({
                    title: oGroup.key,
                    upperCase :true
                })
                return groupHeaderListItem;
            }

           function onSelectedRows(oEvent){
            var standartListItem = this.getView().byId("standardList")
            var selectedItems = standartListItem.getSelectedItems();

            var i18nModel= this.getView().getModel("i18n").getResourceBundle();

            if(selectedItems.length === 0){
                sap.MessageToast.show(i18nModel,getText("noSelection"))
             } else{
                var textMessage = i18nModel.getText("selection")
                for( var i in selectedItems){
                var context =    selectedItems[i].getBindingContext();
                var oContext = context.getObject();
                textMessage=textMessage + "-" + oContext.Material;
               
                }
                sap.m.MessageToast.show(textMessage)
              }
            }
              function  onDeleteSelectedRows(oEvent){

                var standartListItem = this.getView().byId("standardList")
                var selectedItems = standartListItem.getSelectedItems();

                var i18nModel= this.getView().getModel("i18n").getResourceBundle();
                if(selectedItems.length === 0){
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"))
                 } else{
                    var textMessage = i18nModel.getText("selection")
                    var model =this.getView().getModel();
                    var products = model.getProperty("/Products")

                    var arrayId =[];
                    for(var i in selectedItems){
                        var context =    selectedItems[i].getBindingContext();
                        var oContext = context.getObject();
                        arrayId.push(oContext.Id) ;
                        textMessage=textMessage + "-" + oContext.Material;
                    }

                    products = products.filter(function(p){
                        return !arrayId.includes(p.Id)
                    })
                   model.setProperty("/Products",products);
                   standartListItem.removeSelection();
                   sap.m.MessageToast.show(textMessage);
              }
            }

        
        return Controller.extend("logaligroup.applists.controller.View1", {
            onInit: function () {
                var oJsonModel = new sap.ui.model.json.JSONModel();
                oJsonModel.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJsonModel);
        },
            getGroupHeader :getGroupHeader,
            onSelectedRows :onSelectedRows,
            onDeleteSelectedRows:onDeleteSelectedRows
        });
    })
    
    