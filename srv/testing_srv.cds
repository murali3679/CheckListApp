using testing from '../db/testing';

service CatalogService {

    // entity Objects as projection on testing.objects;
    entity obj_status as projection on testing.obj_status;
    entity Output as projection on testing.Output;
    function validation(FLAG:String,Data : String) returns String;
    function status(Data:String) returns String;
}