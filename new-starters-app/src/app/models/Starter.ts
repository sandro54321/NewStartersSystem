export class Starter {
    _id:String;
    dateCreated:Date;
    firstName:String;
    lastName:String;
    email:String;
    jobTitle:String;
    employeeType:String;
    division:String;
    department:String;
    lineManager:String;
    location:String;
    floor:String;
    company:String;
    startDate:Date;
    state:String;
    ItState:String;
    propertyState:String
    baComplete: Boolean;
    srComplete: Boolean;
    hrComplete: Boolean;
    buildingAccess: Array<{_id: String, country:String,building:String, floor:String, room:String, officeArea:Boolean, equiptmentArea: Boolean, state: String}> = [];
    softwareRequest: Array<{_id: String, supplier:String,description:String,accountType:String, state: String}> = [];
    hardwareRequest: Array<{_id: String, manufacturer:String,model:String,deviceType:String, state: String}> = [];
}