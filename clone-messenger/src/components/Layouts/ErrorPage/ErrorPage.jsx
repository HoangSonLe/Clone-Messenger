import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { logo } from "../../../assets/img";
import helper from "../../../generals/helper";
import { configRoutes } from "../../../routes/routes";
import styles from "./ErrorPage.module.scss";
const cx = classNames.bind(styles);
function ErrorPage() {
  return (
    <div className={cx("wrapper")}>
      <img src={logo} alt="logo" />
      <div className={cx("content")}>
        <p className={cx("title")}>This page isn't available</p>
        <p className={cx("text")}>
          The link you followed may be broken, or the page may have been
          removed.
        </p>
      </div>
      <Link to= {configRoutes.home}>
        <Button
          sx={{
            borderRadius: "30px",
            backgroundColor: helper.getColorFromName("lightBlue"),
          }}
          variant="contained"
          size="large"
        >
          Return to messenger.com
        </Button>
      </Link>
    </div>
  );
}
export default ErrorPage;
