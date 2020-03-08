export class Starter {
    _id:String;
    dateCreated:String;
    name:String;
    email:String;
    jobTitle:String;
    employeeType:String;
    division:String;
    department:String;
    lineManager:String;
    location:String;
    floor:String;
    company:String;
    startDate:String;
    state:String;
    buildingAccess: Array<{country:String,building:String, floor:String, room:String, officeArea:Boolean, equiptmentArea: Boolean, state: String}> = [];
    softwareRequest: Array<{supplier:String,description:String,accountType:String, state: String}> = [];
    hardwareRequest: Array<{manufacturer:String,model:String,deviceType:String, state: String}> = [];
}