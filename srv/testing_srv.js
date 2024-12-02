const { array } = require("@sap/cds");
const cds = require("@sap/cds");
const { Timestamp } = require("@sap/cds/lib/core/classes");
const { obj_status } = cds.entities('CatalogService');
const { Output } = cds.entities('CatalogService');
module.exports = srv => {

    srv.on("validation", async (req, res) => {
        var Data = JSON.parse(req.data.Data);
        var F = (req.data.FLAG);
        // Data.forEach(async y => {
        let ar = [];
        if (F == "C") {
            for (var i = 0; i < Data.length; i++) {
                if (Data[i].Name == "LOC") {
                    try {
                        var obj = {
                            "TYPE": "S",
                            "OBJECT": "LOC",
                            "ID": "1",
                            "TIME": new Date().toString(),
                            "NUMBER": 1,
                            "MESSAGE": "SUCCESS",
                            "LOG_NO": "LOC",
                            "LOG_MSG_NO": 0,
                            "MESSAGE_V1": "",
                            "MESSAGE_V2": "",
                            "MESSAGE_V3": "",
                            "MESSAGE_V4": "",
                            "MESSAGE_V5": "",
                            "MESSAGE_V6": "",
                            "MESSAGE_V7": "",
                            "MESSAGE_V8": "",
                            "MESSAGE_V9": "",
                            "MESSAGE_V10": ""
                        };

                        let res = await cds.run(INSERT.into("TESTING_OUTPUT").entries(obj));
                        ar.push(res);
                        console.log(res);
                    } catch (error) {
                        console.error(error);
                        return error;
                    }
                }

                if (Data[i].Name == "PROD") {
                    try {
                        var obj1 = {
                            "TYPE": "E",
                            "OBJECT": "PROD",
                            "ID": "2",
                            "TIME": new Date().toString(),
                            "NUMBER": 2,
                            "MESSAGE": "SUCCESS1",
                            "LOG_NO": "PROD",
                            "LOG_MSG_NO": 0,
                            "MESSAGE_V1": "",
                            "MESSAGE_V2": "",
                            "MESSAGE_V3": "",
                            "MESSAGE_V4": "",
                            "MESSAGE_V5": "",
                            "MESSAGE_V6": "",
                            "MESSAGE_V7": "",
                            "MESSAGE_V8": "",
                            "MESSAGE_V9": "",
                            "MESSAGE_V10": ""
                        };
                        let res1 = await cds.run(INSERT.into("TESTING_OUTPUT").entries(obj1));
                        ar.push(res1)
                        console.log(res1);
                        // const result = { message: "Successfully Created " }
                        // return JSON.stringify(res1)
                    } catch (error) {
                        console.log(error)
                    }
                }
                if (Data[i].Name == "ID") {
                    try {
                        var obj2 = {
                            "TYPE": "W",
                            "OBJECT": "ID",
                            "ID": "3",
                            "TIME": new Date().toString(),
                            "NUMBER": 3,
                            "MESSAGE": "SUCCESS2",
                            "LOG_NO": "ID",
                            "LOG_MSG_NO": 0,
                            "MESSAGE_V1": "",
                            "MESSAGE_V2": "",
                            "MESSAGE_V3": "",
                            "MESSAGE_V4": "",
                            "MESSAGE_V5": "",
                            "MESSAGE_V6": "",
                            "MESSAGE_V7": "",
                            "MESSAGE_V8": "",
                            "MESSAGE_V9": "",
                            "MESSAGE_V10": ""
                        };
                        let res2 = await cds.run(INSERT.into("TESTING_OUTPUT").entries(obj2));
                        console.log(res2);
                        ar.push(res2)
                        // const result = { message: "Successfully Created " }
                        // return JSON.stringify(res2)
                    } catch (error) {
                        console.error(error);
                        return error;
                    }
                }
                if (Data[i].Name == "MATERIAL") {
                    try {
                        var obj4 = {
                            "TYPE": "I",
                            "OBJECT": "MATERIAL",
                            "TIME": new Date().toString(),
                            "ID": "4",
                            "NUMBER": 4,
                            "MESSAGE": "SUCCESS1",
                            "LOG_NO": "MATERIAL",
                            "LOG_MSG_NO": 0,
                            "MESSAGE_V1": "",
                            "MESSAGE_V2": "",
                            "MESSAGE_V3": "",
                            "MESSAGE_V4": "",
                            "MESSAGE_V5": "",
                            "MESSAGE_V6": "",
                            "MESSAGE_V7": "",
                            "MESSAGE_V8": "",
                            "MESSAGE_V9": "",
                            "MESSAGE_V10": ""
                        };
                        let res4 = await cds.run(INSERT.into("TESTING_OUTPUT").entries(obj4));
                        ar.push(res4)
                        console.log(res4);
                        // const result = { message: "Successfully Created " }
                        // return JSON.stringify(res1)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            // return JSON.stringify(ar);
        }
        if (F == "E") {
            for (var i = 0; i < Data.length; i++) {
                if (Data[i].Name == "LOC") {
                    try {
                        var obj = {
                            "ID": "5",
                            "TYPE": "S",
                            "TIME": new Date().toString(),
                            "NUMBER": 11,
                            "MESSAGE": "EDITED",
                            "LOG_NO": "LOC",
                            "LOG_MSG_NO": 10,
                            "MESSAGE_V1": "",
                            "MESSAGE_V2": "",
                            "MESSAGE_V3": "",
                            "MESSAGE_V4": "",
                            "MESSAGE_V5": "",
                            "MESSAGE_V6": "",
                            "MESSAGE_V7": "",
                            "MESSAGE_V8": "",
                            "MESSAGE_V9": "",
                            "MESSAGE_V10": ""
                        };

                        let res = await UPDATE(Output).set(obj).where({ OBJECT: Data[i].Name });
                        console.log(res);
                    } catch (error) {
                        console.error(error);
                        return error;
                    }
                }

                if (Data[i].Name == "PROD") {
                    try {
                        var obj1 = {
                            "ID": "6",
                            "TYPE": "E",
                            "TIME": new Date().toString(),
                            "NUMBER": 12,
                            "MESSAGE": "EDITED",
                            "LOG_NO": "PROD",
                            "LOG_MSG_NO": 20,
                            "MESSAGE_V1": "",
                            "MESSAGE_V2": "",
                            "MESSAGE_V3": "",
                            "MESSAGE_V4": "",
                            "MESSAGE_V5": "",
                            "MESSAGE_V6": "",
                            "MESSAGE_V7": "",
                            "MESSAGE_V8": "",
                            "MESSAGE_V9": "",
                            "MESSAGE_V10": ""
                        };
                        let res1 = await UPDATE(Output).set(obj1).where({ OBJECT: Data[i].Name });
                        console.log(res1);
                    } catch (error) {
                        console.log(error)
                    }
                }
                if (Data[i].Name == "ID") {
                    try {
                        var obj2 = {
                            "ID": "7",
                            "TYPE": "W",
                            "TIME": new Date().toString(),
                            "NUMBER": 13,
                            "MESSAGE": "EDITED",
                            "LOG_NO": "ID",
                            "LOG_MSG_NO": 30,
                            "MESSAGE_V1": "",
                            "MESSAGE_V2": "",
                            "MESSAGE_V3": "",
                            "MESSAGE_V4": "",
                            "MESSAGE_V5": "",
                            "MESSAGE_V6": "",
                            "MESSAGE_V7": "",
                            "MESSAGE_V8": "",
                            "MESSAGE_V9": "",
                            "MESSAGE_V10": ""
                        };
                        let res2 = await UPDATE(Output).set(obj2).where({ OBJECT: Data[i].Name });
                        console.log(res2);
                    } catch (error) {
                        console.error(error);
                        return error;
                    }
                }
                if (Data[i].Name == "MATERIAL") {
                    try {
                        var obj4 = {
                            "ID": "8",
                            "TYPE": "I",
                            "TIME": new Date().toString(),
                            "NUMBER": 14,
                            "MESSAGE": "EDITED",
                            "LOG_NO": "MATERIAL",
                            "LOG_MSG_NO": 40,
                            "MESSAGE_V1": "",
                            "MESSAGE_V2": "",
                            "MESSAGE_V3": "",
                            "MESSAGE_V4": "",
                            "MESSAGE_V5": "",
                            "MESSAGE_V6": "",
                            "MESSAGE_V7": "",
                            "MESSAGE_V8": "",
                            "MESSAGE_V9": "",
                            "MESSAGE_V10": ""
                        };
                        let res4 = await UPDATE(Output).set(obj4).where({ OBJECT: Data[i].Name });
                        ar.push(res4)
                        console.log(res4);
                    } catch (error) {
                        console.log(error)
                    }
                }
            }

        }
        if (F == "D") {
            for (var i = 0; i < Data.length; i++) {
                if (Data[i].Name == "LOC") {
                    try {
                        let res = await DELETE(Output).where({ OBJECT: Data[i].Name });
                        console.log(res);
                    } catch (error) {
                        console.error(error);
                        return error;
                    }
                }

                if (Data[i].Name == "PROD") {
                    try {
                        let res1 = await DELETE(Output).where({ OBJECT: Data[i].Name });
                        console.log(res1);
                    } catch (error) {
                        console.log(error)
                    }
                }
                if (Data[i].Name == "ID") {
                    try {
                        let res2 = await DELETE(Output).where({ OBJECT: Data[i].Name });
                        console.log(res2);

                    } catch (error) {
                        console.error(error);
                        return error;
                    }
                }
                if (Data[i].Name == "MATERIAL") {
                    try {
                        let res4 = await DELETE(Output).where({ OBJECT: Data[i].Name });
                        ar.push(res4)
                        console.log(res4);
                    } catch (error) {
                        console.log(error)
                    }
                }
            }

        }
        let fData = await SELECT(Output)
        return JSON.stringify(fData);
    });
    srv.on('status', async (req, res) => {
var arr =[];
        var D = JSON.parse(req.data.Data);
        try {
            for(var i = 0;i<D.length;i++){
            let id = D[i].ID;
            let status = D[i].STATUS;
            //  let response_ = await cds.run(`UPDATE TESTING_OBJ_STATUS set STATUS =${status} where ID =${id}`)
            let response_ = await UPDATE(obj_status).set({ STATUS: status }).where({ ID: id });

            console.log(res);

            obj = {value:response_};
            arr.push(obj);
            
            }
            return arr;
        }
        catch (e) {
            console.log(e)
            return (e);  
        }


    });
    srv.on('delete', async (req, res) => {

        try {
            let response1_ = await DELETE.from(Output)
            console.log(res);
            return {
                Message: "Successfully Deleted." 
            };
        }
        catch (e) {
            console.log(e)
            return {
                Response: e,
                Message: "Deletion Failed."
            };
        }
    })
}                    