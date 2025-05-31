const { Types } = require("mongoose");
const status = require("../models/status");
const rule = require("../models/rule");
const user = require("../models/user");
const work = require("../models/work");
const DEFAULTDATA = [
    {model:status,data:[{_id:new Types.ObjectId("000000000000000000000001"),name:"active"},{_id:new Types.ObjectId("000000000000000000000002"),name:"inactive"}]},
    {model:rule,data:[{_id:new Types.ObjectId("000000000000000000000001"),name:"admin"},{_id:new Types.ObjectId("000000000000000000000002"),name:"user"}]},
    {model:work,data:[{_id:new Types.ObjectId("000000000000000000000001"),name:"PO"},{_id:new Types.ObjectId("000000000000000000000009"),name:"developper"}]},
    {model:user,data:[{
        _id:new Types.ObjectId("000000000000000000000001"),
        name:"mertina",
        login:"mertinaclaudietoto@gmail.com",
        passWord:"$2b$10$9scdzPACJsEvw.lxxjF.eO2HfaKLUFdxI824pFxDqiq105Cj32Smu",
        status: new Types.ObjectId("000000000000000000000001"),
        rule: new Types.ObjectId("000000000000000000000001"),
        work: new Types.ObjectId("000000000000000000000001")
        }]}
]
module.exports = { DEFAULTDATA };
