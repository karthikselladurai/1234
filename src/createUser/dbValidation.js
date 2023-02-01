const createUserValidation = {
    "type": "object",
    "properties": {

        "userFirstName": { "type": "string" },
        "userLastName": { "type": "string" },
        'userDob': { "type": "string" },
        "userMobileNumber": { "type": "number" },
        "userEmail": { "type": "string" },
        "userName": { "type": "string" },
        "userPassword": { "type": "string" },
    },
    "required": [],
    "definitions": {
        "non-empty-string": {
            "type": "string", "minLength": 1, "message": "Please validate mandatory field(s)"
        },
    }

}
module.exports = createUserValidation;