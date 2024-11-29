sap.ui.define([
    'sap/ui/core/Fragment',
    "sap/ui/core/mvc/Controller"
], (Fragment, Controller) => {
    "use strict";
    var that;
    return Controller.extend("testchk.controller.View1", {
        onInit() {
            that = this;
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

            if (!that._pPopover) {
                this._pPopover = Fragment.load({
                    name: "testchk.view.test",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("/");
                    return oPopover;
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
            that.getOwnerComponent().getModel().read("/Output", {
                success: function (res) {
                    that.valid = res.results;
                    if (that.valid.length > 0) {


                        // var arr1 = [];
                        // var arr2 = [];

                        const unique = arr.filter(obj1 =>
                            that.valid.some(obj2 => obj1.Name === obj2.OBJECT)
                        );

                        // arr.forEach(x => {
                        //     that.valid.forEach(y => {
                        //         if (x.Name == y.OBJECT) {
                        //             arr1.push(x);
                        //         }
                        //         else {

                        //             arr2.push(x);
                        //         }
                        //     })
                        // })
                        // const unique = arr2.filter((item, index, self) =>
                        //     index === self.findIndex((t) => t.Name === item.Name)
                        // );
                        that.validCall(unique);
                    }
                    else {
                        // var arr2 = arr;
                        // var arr1 = [];
                        that.validCall(arr)//some
                    }
                },
                error: function (er) {
                    console.log(er + "Unable to Load Data from validation.")
                }

            })

        },
        validCall: async function (arr) {
            var oModel = that.getOwnerComponent().getModel();
            if (that.valid.length > 0) {
                await oModel.callFunction('/validation', {
                  
                    method: "GET",
                    urlParameters: {
                        FLAG : "D",
                        Data: JSON.stringify(arr)
                    },
                    success: function (oData) {

                        sap.m.MessageToast.show("Data Edited Successfully");

                    },
                    error: function (error) {
                        sap.m.MessageBox.error(error);
                    }
                })

                await oModel.callFunction('/validation', {   
                    method: "GET",
                    urlParameters: {
                        FLAG: "E",
                        Data: JSON.stringify(arr)
                    },
                    success: function (oData) {
                        sap.m.MessageToast.show("Data Edited Successfully");
                    },
                    error: function (error) {
                        sap.m.MessageBox.error(error);
                    }
                })
            }

            else {
                await oModel.callFunction('/validation', {
                    method: "GET",
                    urlParameters: {
                        FLAG: "C",
                        Data: JSON.stringify(arr)
                    },
                    success: function (oData) {
                        sap.m.MessageToast.show("Data Edited Successfully");
                    },
                    error: function (error) {
                        sap.m.MessageBox.error(error);
                    }
                })
            }
        },
        onCheck: function (oEvent) {
            var select = oEvent.oSource.mProperties;
            var arr1 = [{
                ID: select.text,
                STATUS: (select.selected).toString()
            }];

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
        }

    });
});