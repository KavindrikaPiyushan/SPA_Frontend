import {api} from "../index";

export const login = (data) =>api.post("/api/admins/login",data);
