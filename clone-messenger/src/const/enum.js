const EMessageStatus = {
    Undefine: 0,
    Sending: 1,
    Sent: 2,
    Read: 3,
};

const EMessageReadStatus = {
    Undefine: 0,
    ReadOne: 1, //Chỉ mới đọc 1 người
    ReadSome: 2, //Có người đọc rồi, có người chưa đọc
    ReadAll : 3, // Đọc hết nhưng ko phải tin nhắn cuối
    ReadAllLast : 4, // Đọc hết và là tin nhắn cuối
};
const EUploadType = {
    OnlyClick: 1,
    OnlyDrop: 2,
    ClickAndDrop: 3,
};

export { EMessageStatus, EMessageReadStatus, EUploadType };
