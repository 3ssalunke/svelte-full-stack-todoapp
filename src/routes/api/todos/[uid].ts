import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api"

export const del: RequestHandler = async(requestEvt) => {
    return api(requestEvt);
}