namespace testing;

// entity objects{
//     key ID : Integer;
//         Name:String(50);
// };
entity obj_status {
    key ID     : String(50);
        STATUS : String(10);
}

entity Output {
        TYPE        : String(1);
        OBJECT      : String(50);
    key ID          : String(20);
        TIME        : String(200);
        NUMBER      : Integer64;
        MESSAGE     : String(220);
        LOG_NO      : String(20);
        LOG_MSG_NO  : Integer64;
        MESSAGE_V1  : String(50);
        MESSAGE_V2  : String(50);
        MESSAGE_V3  : String(50);
        MESSAGE_V4  : String(50);
        MESSAGE_V5  : String(50);
        MESSAGE_V6  : String(50);
        MESSAGE_V7  : String(50);
        MESSAGE_V8  : String(50);
        MESSAGE_V9  : String(50);
        MESSAGE_V10 : String(50);
};
