import {AuthDataType} from "../../types/types";
import {baseAPI} from "../baseAPI";
import axios from "axios";

export const authAPI = {
    async login({login, password}: AuthDataType) {
        try {
            const {data} = await baseAPI.post("/account/login", {
                login, password,
            });
            localStorage.setItem("accessToken", data.accessToken);
            return {success: true}
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.message, success: false,
                };
            } else {
                console.log("Unexpected error:", e);
            }

        }
    },

    async getInfo() {
        try {
            const {data} = await baseAPI.get("/account/info");
            return {data: data.eventFiltersInfo, success: true};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.message, success: false,
                };
            } else {
                console.log("Unexpected error:", e);
            }
        }
    },
};
