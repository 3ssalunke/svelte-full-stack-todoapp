import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const get: RequestHandler = async(requestEvt) => {
    return api(requestEvt);
}

export const post: RequestHandler = async(requestEvt) => {
    return api(requestEvt);
}