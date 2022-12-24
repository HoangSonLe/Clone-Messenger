import swal from "sweetalert";

const defaultOnClick = (e) => {
    e.preventDefault();
    swal("Updating!", "This feature is developing!", "info");
};

export { defaultOnClick };
