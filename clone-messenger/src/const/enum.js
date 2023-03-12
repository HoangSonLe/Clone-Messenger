const EMessageStatus = {
    Undefine: 0,
    Sending: 1,
    Sent: 2,
    Read: 3,
};

const EMessageReadStatus = {
    Undefine: 0,
    ReadOne: 1,
    ReadAll: 2,
};
const EUploadType = {
    OnlyClick: 1,
    OnlyDrop: 2,
    ClickAndDrop: 3,
};

export { EMessageStatus, EMessageReadStatus, EUploadType };
