sap.ui.define([
    'sap/ui/core/Fragment',
    "sap/ui/core/mvc/Controller",
    'sap/m/library',
	"sap/m/MessageToast",
	"sap/m/VariantItem",
    "sap/ui/core/format/DateFormat"
], (Fragment, Controller, mLibrary, MessageToast, VariantItem,DateFormat) => {
    "use strict";
    var that;
    var SharingMode = mLibrary.SharingMode;
    return Controller.extend("testchk.controller.View1", {
        onInit() {
            that = this;
            that._oVM = that.getView().byId("vm");
            that.onData();


        },
        onData: function () {
            
            var oModel = that.getOwnerComponent().getModel();
            oModel.read("/obj_status", {
                success: function (res) {
                    // that.res = res;
                    var fModel = new sap.ui.model.json.JSONModel(res);
                    that.getView().setModel(fModel);

                },
                error: function (er) {
                    console.log(er);
                }
            })

        },
        onClick: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = that.getView();

                var oModel = that.getOwnerComponent().getModel();
            oModel.read("/Variant", {
                success: function (res) {
                    // that.res = res;
                    // var fModel = new sap.ui.model.json.JSONModel(res);
                    // that.getView().setModel(fModel);
                   var select =that._oVM.getSelectedKey()
                    var result = res.results;
                    const results = result.filter(obj1 =>obj1.User === select )
                    sap.ui.getCore().byId("popList").getItems().forEach(ele=>{
                        if(ele.getContent()[0].getText() === "ID"){
                            ele.getContent()[0].setEnabled(JSON.parse(results[0].ID));
                        }
                        else if(ele.getContent()[0].getText() === "LOC"){
                            ele.getContent()[0].setEnabled(JSON.parse(results[0].LOC));
                        }
                        else if(ele.getContent()[0].getText() === "PROD"){
                            ele.getContent()[0].setEnabled(JSON.parse(results[0].PROD));
                        }
                        else if(ele.getContent()[0].getText() === "MATERIAL"){
                            ele.getContent()[0].setEnabled(JSON.parse(results[0].MATERIAL));
                        }
                    })

                },
                error: function (er) {
                    console.log(er);
                }
            })

            if (!that._pPopover) {
                this._pPopover = Fragment.load({
                    name: "testchk.view.test",
                    controller: this
                }).then(function (oPopover) {
                    that.oPopover = oPopover;
                    oView.addDependent(that.oPopover);

                    that.oPopover.attachAfterClose(that.onCheck.bind(that));
                    that.oPopover.bindElement("/");
                    return that.oPopover;
                });
            }
            that._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },
        onOK: function () {
            var items = sap.ui.getCore().byId("myPopover").getContent()[0].getItems()
            var arr = []
            items.forEach(x => {
                if (x.getContent()[0].getSelected()) {
                    var obj = {};
                    obj.Name = x.getContent()[0].getText();
                    arr.push(obj);
                }
            })
            that.getOwnerComponent().getModel().callFunction("/delete", {
                method: "GET",
                success: function (res) {
                    console.log(res);
                    // that.onData();
                    that.validCall(arr);
                },
                error: function (er) {
                    // console.log(er);
                    // that.onData();
                }
            })


        },
        validCall: async function (arr) {
            var oModel = that.getOwnerComponent().getModel();

            await oModel.callFunction('/validation', {

                method: "GET",
                urlParameters: {
                    FLAG: "C",
                    Data: JSON.stringify(arr)
                },
                success: function (oData) {
                    that.onData();
                   var Data = JSON.parse(oData.validation)
                   var tModel = new sap.ui.model.json.JSONModel(Data)
                   that.byId("tab").setModel(tModel);
                   that.byId("tab").setVisible(true);

                },
                error: function (error) {
                    sap.m.MessageBox.error(error);
                    that.onData();
                }
            })
        },
        onCheck: function (oEvent) {
            var select = oEvent.oSource.mProperties;
            var arr1 = [
            //     {
            //     ID: select.text,
            //     STATUS: (select.selected).toString()
            // }
        ];

            sap.ui.getCore().byId("popList").getItems().forEach(ele=>{
               var obj ={};
               obj.ID = ele.getContent()[0].getText();
               obj.STATUS = ele.getContent()[0].getSelected().toString();
               arr1.push(obj);
            })

            that.getOwnerComponent().getModel().callFunction("/status", {
                method: "GET",
                urlParameters: {
                    Data: JSON.stringify(arr1)
                },
                success: function (res) {
                    console.log(res);
                    that.onData();
                },
                error: function (er) {
                    console.log(er);
                    that.onData();
                }
            })
        },
        formatDateTime: function (sDate) {
            if (!sDate) return "";
            var oDate = new Date(sDate); // Parse the string into a JavaScript Date object
            var oDateFormat = DateFormat.getDateTimeInstance({ style: "medium" });
            return oDateFormat.format(oDate); // Format the date into a user-friendly string
          },
        // onOK: function () {
        //     var items = sap.ui.getCore().byId("myPopover").getContent()[0].getItems()
        //     var arr = []
        //     items.forEach(x => {
        //         if (x.getContent()[0].getSelected()) {
        //             var obj = {};
        //             obj.Name = x.getContent()[0].getText();
        //             arr.push(obj);
        //         }
        //     })
        //     that.getOwnerComponent().getModel().read("/Output", {
        //         success: function (res) {
        //             that.valid = res.results;
        //             if (that.valid.length > 0) {
        //                 var arr1 = [];

        //                 const differentObjects = [
        //                     ...arr.filter(obj1 => 
        //                         !that.valid.some(obj2 => obj1.Name === obj2.OBJECT)),
        //                     ...that.valid.filter(obj2 => 
        //                         !arr.some(obj1 => obj1.Name === obj2.OBJECT ))
        //                 ];
        //                 differentObjects.forEach(x=>{
        //                     var obj = {
        //                         "Name":x.OBJECT
        //                     }
        //                     arr1.push(obj);

        //                 })

        //                  const unique = arr.filter(obj1 =>
        //                     that.valid.some(obj2 => obj1.Name === obj2.OBJECT)
        //                 );


        //                 that.validCall(arr1,unique);
        //             }
        //             else {
        //                 var arr1 = [];
        //                 var arr2 = arr;

        //                 that.validCall(arr1,arr2)
        //             }
        //         },
        //         error: function (er) {
        //             console.log(er + "Unable to Load Data from validation.")
        //         }

        //     })

        // },
        // validCall: async function (arr1,arr2) {
        //     var oModel = that.getOwnerComponent().getModel();
        //     if (that.valid.length > 0) {
        //         await oModel.callFunction('/validation', {

        //             method: "GET",
        //             urlParameters: {
        //                 FLAG : "D",
        //                 Data: JSON.stringify(arr1)
        //             },
        //             success: function (oData) {

        //                 sap.m.MessageToast.show("Data Edited Successfully");

        //             },
        //             error: function (error) {
        //                 sap.m.MessageBox.error(error);
        //             }
        //         })

        //         await oModel.callFunction('/validation', {   
        //             method: "GET",
        //             urlParameters: {
        //                 FLAG: "E",
        //                 Data: JSON.stringify(arr2)
        //             },
        //             success: function (oData) {
        //                 sap.m.MessageToast.show("Data Edited Successfully");
        //             },
        //             error: function (error) {
        //                 sap.m.MessageBox.error(error);
        //             }
        //         })
        //     }

        //     else {
        //         await oModel.callFunction('/validation', {
        //             method: "GET",
        //             urlParameters: {
        //                 FLAG: "C",
        //                 Data: JSON.stringify(arr2)
        //             },
        //             success: function (oData) {
        //                 sap.m.MessageToast.show("Data Edited Successfully");
        //             },
        //             error: function (error) {
        //                 sap.m.MessageBox.error(error);
        //             }
        //         })
        //     }
        // }

       
    _showMessagesMessage: function(sMessage) {
        MessageToast.show(sMessage, {
            closeOnBrowserNavigation: true
        });
    },
    _checkCurrentVariant: function() {
        var sSelectedKey = this._oVM.getSelectedKey();
        var oItem = this._oVM.getItemByKey(sSelectedKey);
        if (!oItem) {
            var sKey = this._oVM.getStandardVariantKey();
            if (sKey) {
                this._oVM.setSelectedKey(sKey);
            }
        }
    },
    _updateItems: function(mParams) {
        if (mParams.deleted) {
            mParams.deleted.forEach(function(sKey) {
                    var oItem = this._oVM.getItemByKey(sKey);
                    if (oItem) {
                        this._oVM.removeItem(oItem);
                        oItem.destroy();
                    }
            }.bind(this));
        }

        if (mParams.hasOwnProperty("def")) {
            this._oVM.setDefaultKey(mParams.def);
        }

        this._checkCurrentVariant();
    },
    _createNewItem: function(mParams) {
        var sKey = "key_" + Date.now();

        var oItem = new VariantItem({
            key: sKey,
            title: mParams.name,
            executeOnSelect: mParams.execute,
            author: "sample",
            changeable: true,
            remove: false
        });

        if (mParams.hasOwnProperty("public") && mParams.public) {
            oItem.setSharing(SharingMode.Public);
        }
        if (mParams.def) {
            this._oVM.setDefaultKey(sKey);
        }

        this._oVM.addItem(oItem);

        this._showMessagesMessage("New view '" + oItem.getTitle() +  "' created with key:'" + sKey + "'.");
    },
    onPress: function(event) {
        this._oVM.setModified(!this._oVM.getModified());
    },
    onManage: function(event) {
        var params = event.getParameters();
        this._updateItems(params);
    },
    onSelect: function(event) {
        var params = event.getParameters();
        var sMessage = "Selected Key: " + params.key;
        this._showMessagesMessage(sMessage);
        this._oVM.setModified(false);
    },
    onSave: function(event) {
        var params = event.getParameters();
        if (params.overwrite) {
            var oItem = this._oVM.getItemByKey(params.key);
            this._showMessagesMessage("View '" + oItem.getTitle() +  "' updated.");
        } else {
            this._createNewItem(params);
        }

        this._oVM.setModified(false);
    }

    });
});