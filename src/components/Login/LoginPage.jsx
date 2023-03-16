import { Button, CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authApi from "../../api/authApi";
import { addAvatar, defaultAvatar, logo } from "../../assets/img";
import { login } from "../../features/AuthSlice";
import { toastError, toastErrorList, uploadFiles } from "../../generals/utils.js";
import helper from "../../generals/helper";
import { configRoutes } from "../../routes/routes";
import UploadFile from "../ui-kit/UploadFile/UploadFile";
import styles from "./LoginPage.module.scss";
import useKey from "../../hooks/useKey";
const cx = classNames.bind(styles);
function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pendingLogin, setPendingLogin] = useState(false);
    const [isLogin, setLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [image, setImage] = useState({
        imageName: null,
        imageSrc: defaultAvatar,
        imageFile: null,
    });
    const [displayName, setDisplayName] = useState("");
    const validate = () => {
        // let tmp = {};
        // tmp.userName = userName == "" ? true : false;
        // tmp.userName = userName == "" ? true : false;
        // return Object.values(tmp).every((x) => x == true);
        if (!userName) {
            toastError("UserName is null");
            return false;
        }
        if (!passWord) {
            toastError("Password is null");
            return false;
        }
        if (isLogin == false) {
            if (!displayName) {
                toastError("DisplayName is null");
                return false;
            }
        }
        return true;
    };
    const handleLogin = async () => {
        if (validate() == false) return null;
        try {
            let postData = {
                userName: userName,
                passWord: passWord,
            };
            setPendingLogin(true);
            let response = await authApi.login(postData);
            if (response.isSuccess == true) {
                dispatch(login(response.data));
                navigate(configRoutes.home);
            }
        } catch (err) {
            setPendingLogin(false);
            toastErrorList(err?.response.data);
        }
    };
    const handleLoginFacebook = async () => {
        // if (validate() == false) return null;
        try {
            setPendingLogin(true);
            let response = await authApi.loginFacebook();
            if (response.isSuccess == true) {
                // dispatch(login(response.data));
                navigate(configRoutes.home);
            }
        } catch (err) {
            setPendingLogin(false);
            console.log("err", err);
        }
    };
    const handleRegister = async () => {
        if (validate() == false) return null;
        try {
            let fileId = null;
            if (image.imageFile) {
                var uploadFile = await uploadFiles([image.imageFile], "/chat/UploadImage");
                fileId = uploadFile.data.data[0].id;
            }
            let postData = {
                userName: userName,
                passWord: passWord,
                displayName: displayName,
                avatarFileId: fileId,
            };
            setPendingLogin(true);
            let response = await authApi.register(postData);
            if (response.isSuccess) {
                dispatch(login(response.data));
                navigate(configRoutes.home);
            } else {
                setPendingLogin(false);
            }
        } catch (err) {
            setPendingLogin(false);
            toastErrorList(err?.response.data);
        }
    };
    const showPreview = (files) => {
        if (files && files.length >= 1) {
            let f = files[0];
            let reader = new FileReader();
            reader.onload = (x) => {
                setImage({
                    imageFile: f,
                    imageName: f.name,
                    imageSrc: x.target.result,
                });
            };
            reader.readAsDataURL(f);
        }
    };
    useKey(
        "Enter",
        () => {
            if (isLogin) {
                handleLogin();
            } else if (!isLogin) handleRegister();
        },
        [userName, passWord, displayName]
    );
    return (
        <div className={cx("wrapper")}>
            <div className={cx("logo")}>
                <img src={logo} alt="logo" />
            </div>
            <div className={cx("content")}>
                <p className={cx("title")}>Connect with your favourite people</p>
                <form noValidate>
                    {!isLogin ? (
                        <input
                            value={displayName}
                            placeholder="Display name"
                            type={"text"}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    ) : null}
                    <input
                        value={userName}
                        placeholder="Username"
                        type={"text"}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        value={passWord}
                        placeholder="Password"
                        type={"password"}
                        onChange={(e) => setPassWord(e.target.value)}
                    />
                    <div>
                        {!isLogin ? (
                            <div className={cx("image-container")}>
                                <UploadFile
                                    onUploaded={showPreview}
                                    renderComponent={(idInput) => (
                                        <label htmlFor={idInput}>
                                            <div className={cx("icon-upload")}>
                                                <img
                                                    width={50}
                                                    height={50}
                                                    src={addAvatar}
                                                    alt={image.imageName}
                                                />
                                                <h4>Add an avatar</h4>
                                            </div>
                                        </label>
                                    )}
                                />
                                <img
                                    className={cx("avatar")}
                                    src={image.imageSrc ?? defaultAvatar}
                                    alt={image.imageName}
                                />
                            </div>
                        ) : null}
                    </div>
                </form>
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
                disabled={pendingLogin}
            >
                {pendingLogin ? (
                    <CircularProgress
                        sx={{
                            color: helper.getColorFromName("secondaryIcon"),
                            marginRight: "10px",
                        }}
                        size={15}
                    />
                ) : null}
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
                    disabled={pendingLogin}
                >
                    {isLogin ? "Register new account" : "Have an account"}
                </Button>
                {/* <Button
                    sx={{
                        borderRadius: "30px",
                        textTransform: "none",
                        fontSize: "15px",
                    }}
                    color="error"
                    variant="contained"
                    size="large"
                    disabled={pendingLogin}
                >
                    Login with Gmail
                </Button>
                <Button
                    sx={{
                        borderRadius: "30px",
                        fontSize: "15px",
                        textTransform: "none",
                        background: "rgb(13,77,210)",
                        background:
                            "linear-gradient(22deg, rgba(13,77,210,0.9363095580028886) 0%, rgba(250,45,253,1) 100%)",
                    }}
                    variant="contained"
                    size="large"
                    disabled={pendingLogin}
                    onClick={handleLoginFacebook}
                >
                    Login with Facebook
                </Button> */}
            </div>
            <div className={cx("footer")}>
                <a data-track="Not on Facebook?" href="https://www.facebook.com/r.php">
                    Not on Facebook?
                </a>
                <span className={cx("divide")}>|</span>
                <a
                    data-track="Forgot Password"
                    href="https://www.facebook.com/login/identify?ctx=recover"
                >
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
