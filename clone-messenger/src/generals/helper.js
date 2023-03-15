import moment from "moment/moment";
import { Colors as ColorObject, FontWeights } from "../components/GlobalStyles/colors";
const helper = {};

let getColorFromName = (name) => {
    let c = "#ffffff";
    if (!name) {
        return c;
    }
    if (!ColorObject[name]) {
        throw `"${name}" is not in ColorObject`;
    }
    return ColorObject[name];
};
helper.getColorFromName = getColorFromName;

let getFontWeightFromName = (name) => {
    let c = "bold";
    if (!name) {
        return c;
    }
    if (!FontWeights[name]) {
        throw `"${name}" is not in FontWeightObject`;
    }
    return FontWeights[name];
};
helper.getFontWeightFromName = getFontWeightFromName;

helper.isValidSearchString = (str) => {
    return str !== null && str !== undefined && str !== "";
};
helper.getNumberInString = (value) => {
    if (value == null) {
        console.log("Error value string", value);
        return 0;
    }
    let s = value.toString().replace(/[^0-9]/g, "");
    return parseInt(s);
};
const secondsDiff = (dateBefore, dateAfter) => {
    return Math.floor((dateAfter - dateBefore) / 1000);
};
const minutesDiff = (dateBefore, dateAfter) => {
    return Math.floor(secondsDiff(dateBefore, dateAfter) / 60);
};
const hoursDiff = (dateBefore, dateAfter) => {
    return Math.floor(minutesDiff(dateBefore, dateAfter) / 60);
};
const dateDiff = (dateBefore, dateAfter) => {
    return Math.floor(hoursDiff(dateBefore, dateAfter) / 24);
};
const monthsDiff = (dateBefore, dateAfter) => {
    return Math.floor(dateDiff(dateBefore, dateAfter) / 30);
};
const yearsDiff = (dateBefore, dateAfter) => {
    return Math.floor(monthsDiff(dateBefore, dateAfter) / 365);
};
helper.yearsDiff = yearsDiff;
helper.monthsDiff = monthsDiff;
helper.dateDiff = dateDiff;
helper.hoursDiff = hoursDiff;
helper.minutesDiff = minutesDiff;
helper.secondsDiff = secondsDiff;
helper.timeNotification = (datetime) => {
    const now = new Date(Date.now());
    const time = moment(datetime).toDate();
    let timeString = "";
    if (yearsDiff(time, now) > 0) {
        timeString = `${yearsDiff(time, now)} năm`;
    } else if (monthsDiff(time, now) > 0) {
        timeString = `${monthsDiff(time, now)} tháng`;
    } else if (dateDiff(time, now) > 0) {
        if (dateDiff(time, now) >= 7) timeString = `${Math.floor(dateDiff(time, now) / 7)} tuần`;
        else timeString = `${dateDiff(time, now)} ngày`;
    } else if (hoursDiff(time, now) > 0) {
        timeString = `${hoursDiff(time, now)} giờ`;
    } else if (minutesDiff(time, now) > 0) {
        timeString = `${minutesDiff(time, now)} phút`;
    } else if (secondsDiff(time, now) >= 0) {
        if (secondsDiff(time, now) > 30) timeString = `${secondsDiff(time, now)} giây`;
        else timeString = "Vừa xong";
    }
    return timeString;
};
helper.messageTimeDisplay = (datetime) => {
    const now = new Date(Date.now());
    const time = moment(datetime);
    let timeString = "";
    if (dateDiff(time, now) <= 7) {
        let format = "ddd LT";
        timeString = moment(datetime).format(format);
    } else {
        let format = "DD/MM/YY, LT";
        timeString = moment(datetime).format(format);
    }
    return timeString;
};
helper.messageTimeToolTipDisplay = (datetime) => {
    const now = new Date(Date.now());
    const time = moment(datetime);
    let timeString = "";
    if (dateDiff(time, now) <= 7) {
        let format = "dddd hh:mma";
        timeString = moment(datetime).format(format);
    } else {
        let format = "MMMM D, YYYY [at] LT";
        timeString = moment(datetime).format(format);
    }
    return timeString;
};
export default helper;
