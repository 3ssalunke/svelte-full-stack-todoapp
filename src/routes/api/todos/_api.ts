import type { RequestEvent } from "@sveltejs/kit";
import PrismaClient from "$lib/prisma"

const primsa = new PrismaClient()

export const api = async(requestEvt: RequestEvent) => {
    let body = {};
    let status = 200;
    let data: FormData;
    let text: string;

    switch(requestEvt.request.method.toUpperCase()){
        case "GET":
            body = {
                message: "success",
                todos: await primsa.todo.findMany()
            }
            break;
        case "POST":
            data = await requestEvt.request.formData();
            text = data.get("todo") as string;
            body = await primsa.todo.create({
                data: {
                    created_at: new Date(),
                    text,
                    done: false
                }
            });
            status = 201;
            break;
        case "PATCH":
            data = await requestEvt.request.formData();
            text = data.get("todo") as string;
            let done = data.get("done");
            let _data: any = {};
            if(text) _data.text = text
            if(done==="true") _data.done = true;
            if(done === "") _data.done = false;
            body = await primsa.todo.update({
                where: {uid: parseInt(requestEvt.params.uid)},
                data: _data
            });
            status = 200;
            break;
        case "DELETE":
            await primsa.todo.delete({where: {uid: parseInt(requestEvt.params.uid)}});
            body = {
                message: "success",
            }
            status = 200;
            break;
        default:
            break;
    }

    if (requestEvt.request.method.toUpperCase() !== "GET" &&
        requestEvt.request.headers.get("accept") !== "application/json") 
    {
        return {
            status: 303,
            headers: {
                location: "/"
            }
        };
    }

    return{
        status,
        body
    }
}