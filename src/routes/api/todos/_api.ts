import type { RequestEvent } from "@sveltejs/kit";

let todos: Todo[] = [];

export const api = async(requestEvt: RequestEvent) => {
    let body = {};
    let status = 200;
    let data: FormData;
    let text: string;
    let _todo;
    switch(requestEvt.request.method.toUpperCase()){
        case "GET":
            body = {
                message: "success",
                todos
            }
            break;
        case "POST":
            data = await requestEvt.request.formData();
            text = data.get("todo") as string;
            _todo = {
                uid: Math.floor(Math.random() * 10000),
                created_at: new Date(),
                text,
                done: false
            }
            todos.push(_todo);
            body = {
                message: "success",
                todo: _todo
            };
            status = 201;
            break
        case "PATCH":
            data = await requestEvt.request.formData();
            text = data.get("todo") as string;
            let done = data.has("done") ? !!data.get("done") : false;
            todos = todos.map(todo => {
                if(todo.uid === parseInt(requestEvt.params.uid)){
                    if(text) todo.text = text;
                    todo.done = done;
                    _todo = todo;
                }
                return todo;
            })
            body = {
                message: "success",
                todo: _todo
            }
            status = 200;
            break;
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== parseInt(requestEvt.params.uid));
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