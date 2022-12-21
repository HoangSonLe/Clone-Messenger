import { memo } from "react";
import { MessageGroup } from "../Message/Message";

function addHours(hours) {
    let date = Date.now();
    var result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
}
function addDays(days) {
    let date = Date.now();
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    console.log(result);
    return result;
}
const message = ({ userId, date = Date.now(), isMyMessage = true }) => ({
    id: Math.random(),
    userId: 1,
    text: "LalalalaLalalalaLalalala",
    reactList: [
        {
            reactTypeIcon: "",
            userReact: "Hoang Huy",
        },
    ],
    createDateTime: date,
    isMyMessage: isMyMessage,
});
const groupMessage = ({ date = Date.now() }) => ({
    id: Math.random(),
    date,
    messageList: [
        message(1, addHours(0), true),
        message(1, addHours(0), true),
        message(1, addHours(1), true),
        message(2, addHours(5), false),
    ],
});

const listMes = [
    groupMessage(addDays(-3)),
    groupMessage(addDays(-2)),
    groupMessage(addDays(-1)),
];
function MessageList({}) {
    console.log(12);
    return (
        <div>
            {listMes.map((i, index) => (
                <MessageGroup data={i} key={index} />
            ))}
        </div>
    );
}
export default memo(MessageList);
