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

helper.getNumberInString = (value) => {
  let s = value.toString().replace(/[^0-9]/g, "");
    return parseInt(s);
};
export default helper;
