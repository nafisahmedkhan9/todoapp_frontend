// eslint-disable-next-line
import $ from 'jquery'

export const validateInput = (value, validation_type) => {
    switch (validation_type.toLowerCase()) {
        case "text":
            return verifyLength(value, 1)
        case "email":
            return verifyEmail(value)
        case "number":
            return verifyNumber(value)
        case "phone":
            return verifyExactLength(value, 10)
        case "website":
            return verifyWebsite(value)
        case "url":
            return verifyUrl(value)
        case "pincode":
            return verifyExactLength(value, 6)
        case "array":
            return veryArray(value)
        case "json_object":
            return verifyJsonObject(value)
        default:
            console.log("validation type is invalid")
            break;
    }
}

// function that verify json object
export const verifyJsonObject = (value) => {
    return value && Object.keys(value).length > 0
}

// function that verify length of array
export const veryArray = (value) => {
    return value.length > 0
}

// function that verifies if a string has a given length or not
export const verifyLength = (value, length) => {
    if (value === null || value === undefined) return true
    if (value.toString().length >= length) {
        return true;
    }
    return false;
};

// function that verifies if a string has a given length or not
export const verifyExactLength = (value, length) => {
    if (value === null || value === undefined) return true
    if (value.toString().length == length) {
        return true;
    }
    return false;
};

// function that verifies if value contains only numbers
export const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (value && numberRex.test(value)) {
        return true;
    }
    return false;
};

// function that verifies if value is web address
export const verifyWebsite = value => {
    var webAddressRex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    if (value && webAddressRex.test(value)) {
        return true;
    }
    return false;
};

// verifies if value is a valid URL
export const verifyUrl = value => {
    try {
        new URL(value);
        return true;
    } catch (_) {
        return false;
    }
};

export const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
        return true;
    }
    return false;
};

export function removeReference(data) {
    return JSON.parse(JSON.stringify(data));
}

export const clickEvent = (id) => {
    $("#" + id).trigger('click');
}

export const dateFormat = (date) => {
    return date.format("YYYY-MM-DD")
}

export async function apiAction(url, method, data, token) {
    let options = {
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token,
        }
    }
    if (method.toLowerCase() === "get" || method.toLowerCase() === "delete") {
        delete options["body"]
    }
    try {
        let response = await fetch(url, options)
        if (response.ok) {
            let apiResponse = await response.json()
            return { isSuccess: response.ok, statusCode: response.status, response: apiResponse }
        } else {
            return { isSuccess: response.ok, statusCode: response.status, response: { message: response.statusText } }
        }
    } catch (error) {
        console.log("error response", url, error.message)
        return { isSuccess: false, statusCode: error.statusCode, response: error }
    }
}

export async function apiActionFormData(url, method, data, token) {
    var formData = new FormData();
    for (var key in data) {
        formData.append(key, data[key])
    }
    let options = {
        body: formData,
        method: method,
        headers: {
            "Authorization": "Token " + token,
        }
    }
    try {
        let response = await fetch(url, options)
        let apiResponse = await response.json()
        if (response.status === 200 || response.status === 201) {
            return apiResponse
        } else {
            return { message: JSON.stringify(apiResponse) }
        }
    } catch (error) {
        console.log(error, "response")
        return error
    }
}

export const capitalization = (string) => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return ''
    }
}