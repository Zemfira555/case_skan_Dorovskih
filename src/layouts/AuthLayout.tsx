import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {getInfo} from "../store/slices/authSlice";
import {useAppDispatch, useAppSelector} from "../store/store";

const AuthLayout: React.FC = () => {
    const {info} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        if (!info) {
            dispatch(getInfo());
        }
    }, [info, dispatch]);

    React.useEffect(() => {
        if (info !== null) {
            setIsLoaded(true);
        }
    }, [info]);

    React.useEffect(() => {
        if (isLoaded && info === null) {
            navigate("/login");
        }
    }, [info, navigate, isLoaded]);

    return (<div>
            <Outlet/>
        </div>);
};

export default AuthLayout;
