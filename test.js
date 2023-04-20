const {validate} = require("./auth/jwt");

let decode = {id: "208cb130-df5c-11ed-ac85-499cebfd2388", username: "user2", iat: 1681985879, exp: 1681989479}

let log = async (decode) => {
    let response = await validate(decode);
    console.log(response)
}

log(decode);


