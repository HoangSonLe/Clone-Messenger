import { toast } from "react-toastify";
import swal from "sweetalert";

const defaultOnClick = (e) => {
    e.preventDefault();
    swal("Updating!", "This feature is developing!", "info");
};

const toastError = (err) => {
    toast.error("Error.Please try again");
    toast.error(err);
    console.log(err);
};
export { defaultOnClick, toastError };
