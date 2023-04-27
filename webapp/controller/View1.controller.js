sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

          function onValidate(oEvent){

            var inputEmployee = this.byId("inputEmployee");
            var valueEmployee = inputEmployee.getValue();

            if(valueEmployee.length === 6){

              //  inputEmployee.setDescription("OK");
                this.byId("labelCountry").setVisible(true);
                this.byId("slCountry").setVisible(true);

            }else{

           //   inputEmployee.setDescription("Not OK")
                this.byId("labelCountry").setVisible(false);
                this.byId("slCountry").setVisible(false);
            }

          }
          function onFilter(){
             var oJson = this.getView().getModel("jsonCountries").getData();
             var filters = [];
             if(oJson.employeeId !==""){
               filters.push(new sap.ui.model.Filter("EmployeeID", "EQ" ,oJson.employeeId))
           }
             if(oJson.countrykey !==""){
               filters.push(new sap.ui.model.Filter("Country", "EQ" ,oJson.countrykey))
           }
           var oTable =this.getView().byId("tableEmployee");
           var oBinding = oTable.getBinding("items")
           oBinding.filter(filters);
          }

          function  onClearFilter() {
           var oModel = this.getView().getModel("jsonCountries");
           oModel.setProperty("/employeeId","")
           oModel.setProperty("/countrykey","")
          } 
          
          function showPostaCode(oEvent){
            var itemPressed = oEvent.getSource();
            var context = itemPressed.getBindingContext("jsonEmployees");
            var object  =  context.getObject() ;
            sap.m.MessageToast.show(object.PostalCode);

          }

            return Controller.extend("logaligroup.employees.controller.View1", {
          
              onAfterRendering: function () {
               var oView = this.getView();
             
              var i18nBundle = oView.getModel("i18n").getResourceBundle();
            

            
              var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/mockdata/Employees.json",false);
                oView.setModel(oJSONModel,"jsonEmployees");


                var oJSONModelCountries = new sap.ui.model.json.JSONModel();
                oJSONModelCountries.loadData("./localService/mockdata/Countries.json",false);
                oView.setModel(oJSONModelCountries,"jsonCountries");

                var oJsonModelConfig = new sap.ui.model.json.JSONModel({

                  visibleID :true,
                  visibleName :true,
                  visibleCity :false,
                  visiblebtnShowCity :true,
                  visiblebtnHideCity :false

                })
                oView.setModel(oJsonModelConfig,"jsonModelConfig");

            },
            onValidate  : onValidate,
            onFilter:onFilter,
            onClearFilter:onClearFilter,
            showPostaCode:showPostaCode
        });
    });
