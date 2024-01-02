import React from "react";
import {
    Backdrop,
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
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
import { UploadFileType } from "../../types/uploadFile.js";
import { useLoginMutation } from "../../RTKQueryApis/auth.api";
const cx = classNames.bind(styles);

function createData(userName: string, passWord: string) {
    return { userName, passWord };
}
const rows = [
    createData("hoangson", "1234"),
    createData("hoang son", "1234"),
    createData("hoang son1", "1234"),
    createData("hoang son2", "1234"),
    createData("utc", "1234"),
];
function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pendingLogin, setPendingLogin] = useState<boolean>(false);
    const [login,data] = useLoginMutation();

    const [isLogin, setLogin] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>("");
    const [passWord, setPassWord] = useState<string>("");
    const [image, setImage] = useState<UploadFileType>({
        name: "",
        src: defaultAvatar,
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
            let response = await login(postData);
            console.log(response)
            // if (response.isSuccess == true) {
            //     dispatch(login(response.data));
            //     navigate(configRoutes.home);
            // }
        } catch (err) {
            setPendingLogin(false);
            // toastErrorList(err?.response?.data);
        }
    };
    const handleLoginFacebook = async () => {
        // if (validate() == false) return null;
        try {
            setPendingLogin(true);
            let response = await authApi.loginFacebook();
            // if (response.isSuccess == true) {
            //     // dispatch(login(response.data));
            //     navigate(configRoutes.home);
            // }
        } catch (err) {
            setPendingLogin(false);
            console.log("err", err);
        }
    };
    const handleRegister = async () => {
        if (validate() == false) return null;
        try {
            let fileId = null;
            if (image.file) {
                var uploadFile = await uploadFiles([image.file], "/chat/UploadImage");
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
            // if (response.isSuccess) {
            //     dispatch(login(response.data));
            //     navigate(configRoutes.home);
            // } else {
            //     setPendingLogin(false);
            // }
        } catch (err) {
            setPendingLogin(false);
            // toastErrorList(err?.response?.data);
        }
    };
    const showPreview = (files : File[]) => {
        if (files && files.length >= 1) {
            let f = files[0];
            var url = URL.createObjectURL(f);
            // let reader = new FileReader();
            // reader.onload = (x) => {
            //     setImage({
            //         imageFile: f,
            //         imageName: f.name,
            //         imageSrc: x.target.result,
            //     });
            // };
            // reader.readAsDataURL(f);
            setImage({
                file: f,
                name: f.name,
                src: url,
            });
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
            <div className={cx("wrap-content")}>
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
                                                        alt={image.name}
                                                    />
                                                    <h4>Add an avatar</h4>
                                                </div>
                                            </label>
                                        )}
                                    />
                                    <img
                                        className={cx("avatar")}
                                        src={image.src ?? defaultAvatar}
                                        alt={image.name}
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
                <div className={cx("text")}>Some accounts you can try:</div>
                <TableContainer sx={{ width: "unset", maxHeight: "150px" }}>
                    <Table stickyHeader sx={{ width: "300px" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="right">
                                    Password
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.userName}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.userName}
                                    </TableCell>
                                    <TableCell align="right">{row.passWord}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pendingLogin}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
export default LoginPage;
