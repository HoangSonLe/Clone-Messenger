import { useSelector } from "react-redux";

const useRefreshToken = () => {
    const { token } = useSelector((state) => state.auth);
    return token;
};
export default useRefreshToken;