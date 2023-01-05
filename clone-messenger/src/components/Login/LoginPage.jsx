import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authApi from "../../api/authApi";
import { logo } from "../../assets/img";
import { login } from "../../features/AuthSlice";
import helper from "../../generals/helper";
import { configRoutes } from "../../routes/routes";
import styles from "./LoginPage.module.scss";
const cx = classNames.bind(styles);
function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLogin, setLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [displayName, setDisplayName] = useState("");

    const handleLogin = async () => {
        try {
            let postData = {
                userName: userName,
                passWord: passWord,
            };
            let response = await authApi.login(postData);
            if (response) {
                dispatch(login(response.data));
                navigate(configRoutes.home);
            }
        } catch (err) {
            console.log("err", err);
        }
    };
    const handleRegister = () => {};
    return (
        <div className={cx("wrapper")}>
            <div className={cx("logo")}>
                <img src={logo} alt="logo" />
            </div>
            <p className={cx("title")}>Connect with your favourite people</p>
            <div className={cx("content")}>
                {!isLogin ? (
                    <input value={displayName} placeholder="Display name" type={"text"} onChange={(e) => setDisplayName(e.target.value)} />
                ) : null}
                <input value={userName} placeholder="Username" type={"text"} onChange={(e) => setUserName(e.target.value)} />
                <input value={passWord} placeholder="Password" type={"password"} onChange={(e) => setPassWord(e.target.value)} />
            </div>
            <Button
                sx={{
                    borderRadius: "30px",
                    fontSize: "15px",
                    textTransform: "none",
                    backgroundColor: helper.getColorFromName("lightBlue"),
                }}
                variant="contained"
                size="large"
                onClick={isLogin ? handleLogin : handleRegister}
            >
                Continue
            </Button>
            <div className={cx("buttons")}>
                <Button
                    sx={{
                        borderRadius: "30px",
                        textTransform: "none",
                        fontSize: "15px",
                    }}
                    variant="outlined"
                    size="large"
                    onClick={(e) => setLogin((prevState) => !prevState)}
                >
                    {isLogin ? "Register new account" : "Have an account"}
                </Button>
                <Button
                    sx={{
                        borderRadius: "30px",
                        textTransform: "none",
                        fontSize: "15px",
                    }}
                    color="error"
                    variant="contained"
                    size="large"
                >
                    Login with Gmail
                </Button>
                <Button
                    sx={{
                        borderRadius: "30px",
                        fontSize: "15px",
                        textTransform: "none",
                        background: "rgb(13,77,210)",
                        background: "linear-gradient(22deg, rgba(13,77,210,0.9363095580028886) 0%, rgba(250,45,253,1) 100%)",
                    }}
                    variant="contained"
                    size="large"
                >
                    Login with Facebook
                </Button>
            </div>
            <div className={cx("footer")}>
                <a data-track="Not on Facebook?" href="https://www.facebook.com/r.php">
                    Not on Facebook?
                </a>
                <span className={cx("divide")}>|</span>
                <a data-track="Forgot Password" href="https://www.facebook.com/login/identify?ctx=recover">
                    Forgotten password
                </a>
                <span className={cx("divide")}>|</span>
                <a data-track="Data Privacy" href="https://www.facebook.com/privacy/policy/">
                    Privacy Policy
                </a>
                <span className={cx("divide")}>|</span>
                <a data-track="Terms" href="https://www.facebook.com/legal/terms/">
                    Terms
                </a>
                <span className={cx("divide")}>|</span>
                <a data-track="Cookies Policy" href="https://www.facebook.com/policies/cookies/">
                    Cookies Policy
                </a>
                <span className={cx("divide")}>|</span>
                <span> © Meta 2023</span>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}
export default LoginPage;
