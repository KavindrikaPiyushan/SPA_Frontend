import {api} from "../index";

export const login = (data) =>api.post("/api/admins/login",data);
export const verify = ()=>api.get("/api/admins/verify");
export const logout = ()=>api.post("/api/admins/logout");
