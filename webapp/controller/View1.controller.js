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

             function onshowCity(oEvent){
                var oJsonModelConfig=this.getView().getModel("jsonModelConfig")
                oJsonModelConfig.setProperty("/visibleCity",true);
                oJsonModelConfig.setProperty("/visibleBtnShowCity",false);
                oJsonModelConfig.setProperty("/visibleBtnHideCity",true);
             }

             function onHideCity(oEvent){
              var oJsonModelConfig=this.getView().getModel("jsonModelConfig")
              oJsonModelConfig.setProperty("/visibleCity",false);
              oJsonModelConfig.setProperty("/visibleBtnShowCity",true);
              oJsonModelConfig.setProperty("/visibleBtnHideCity",false);
           }

           function showOrders(oEvent){
            var ordersTable = this.getView().byId("ordersTable")
             ordersTable.destroyItems();

             var itemPressed = oEvent.getSource();
             var oContext = itemPressed.getBindingContext("jsonEmployees");
             var object = oContext.getObject();
             var orders = object.Orders;

             var orderItems= [];

             for (var i in orders){
              orderItems.push( new sap.m.ColumnListItem({
                 cells : [
                   new sap.m.Label({text :orders[i].OrderID}),
                   new sap.m.Label({text :orders[i].Freight}),
                   new sap.m.Label({text :orders[i].ShipAddress}),
                 ]
              }))
             }
               /**  */
             var newTable = new sap.m.Table({
              width:"auto",
              columns :[
                   new sap.m.Column({
                    header : new sap.m.Label({ 
                      text:"{i18n>orderID}"
                    })
                  }),
                  new sap.m.Column({
                    header : new sap.m.Label({ 
                      text:"{i18n>freight}"
                    })
                  }),
                  new sap.m.Column({
                    header : new sap.m.Label({ 
                      text:"{i18n>shipAddress}"
                    })
                  })
                    
              ],
              items : orderItems
              } ).addStyleClass("sap.UiSmallMargin")
             ordersTable.addItem(newTable);

               
              
             var newTableJSON =new sap.m.Table();
             newTableJSON .setWidth("auto");
             newTableJSON .addStyleClass("sapUiSmallMargin"); 

             var columnOrderID =new sap.m.Column();
             var labelOrderID =new sap.m.Label(); 
             labelOrderID.bindProperty("text","i18n>orderID");
             columnOrderID.setHeader(labelOrderID);
             newTableJSON.addColumn(columnOrderID)

             var columnFreight =new sap.m.Column();
             var labelFreight =new sap.m.Label(); 
             labelFreight.bindProperty("text","i18n>freight");
             columnFreight.setHeader(labelFreight);
             newTableJSON.addColumn(columnFreight)

             var columnShipAddress =new sap.m.Column();
             var labelShipAddress =new sap.m.Label(); 
             labelShipAddress.bindProperty("text","i18n>shipAddress");
             columnShipAddress.setHeader(labelShipAddress);
             newTableJSON.addColumn(columnShipAddress);

             

             var columnListItem = new sap.m.ColumnListItem();
             
             var cellOrderID = new sap.m.Label();
             cellOrderID.bindProperty("text","jsonEmployees>OrderID");
             columnListItem.addCell(cellOrderID)

             var cellFreight = new sap.m.Label();
             cellFreight.bindProperty("text","jsonEmployees>Freight");
             columnListItem.addCell(cellFreight);

             var cellShipAddress = new sap.m.Label();
             cellShipAddress.bindProperty("text","jsonEmployees>ShipAddress");
             columnListItem.addCell(cellShipAddress);

             var oBindingInfo = {
              model: "jsonEmployees",
              path: "Orders",
              template: columnListItem
             };

              newTableJSON.bindAggregation( "items", oBindingInfo);
              newTableJSON.bindElement( "jsonEmployees>" + oContext.getPath());
              ordersTable.addItem(newTableJSON);


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
                  visibleBtnShowCity :true,
                  visibleBtnHideCity :false
                  

                })
                oView.setModel(oJsonModelConfig,"jsonModelConfig");

            },
            onValidate  : onValidate,
            onFilter:onFilter,
            onClearFilter:onClearFilter,
            showPostaCode:showPostaCode,
            onshowCity: onshowCity,
            onHideCity:onHideCity,
            showOrders:showOrders
        });
    });
