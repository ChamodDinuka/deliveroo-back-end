const messages = {
    invalid_params: {
        status: 404,
        message: 'Invalid parameter'
    },
    server_error: {
        status: 500,
        message: 'Server error'
    },
};

const success = function (req, res, data, friendly_message) {
    const resp = {
        status: true,
        code: 0,
        message: 'Success',
        friendly_message: 'Success',
        data: data
    };

    if (friendly_message) {
        resp.friendly_message = friendly_message;
    }

    res.status(200);
    res.json(resp);
    return;
};

const fail = function (req, res, message, friendly_message, data) {
    const resp = {
        status: false,
        code: message.code,
        message: message.message,
        friendly_message: 'You have a error',
        data: data || {}
    };

    if (friendly_message) {
        resp.friendly_message = friendly_message;
    }

    res.status(message.status);
    res.json(resp);
    return;
};

exports.success = success;
exports.fail = fail;
exports.messages = messages;