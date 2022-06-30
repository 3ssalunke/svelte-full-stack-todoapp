import type { RequestEvent } from "@sveltejs/kit";

let todos: Todo[] = [];

export const api = async(requestEvt: RequestEvent) => {
    let data: FormData;
    let text: string;
    switch(requestEvt.request.method.toUpperCase()){
        case "GET":
            return {
                body: {
                    message: "success",
                    todos
                },
                status: 200
            }
        case "POST":
            data = await requestEvt.request.formData();
            text = data.get("todo") as string;
            todos.push({
                uid: Math.floor(Math.random() * 10000),
                created_at: new Date(),
                text,
                done: false
            });
            return {
                status: 303,
                headers: {
                    location: "/"
                }
            }
        case "PATCH":
            data = await requestEvt.request.formData();
            text = data.get("todo") as string;
            todos = todos.map(todo => {
                if(todo.uid === parseInt(requestEvt.params.uid)){
                    todo.text = text
                }
                return todo;
            })
            return {
                status: 303,
                headers: {
                    location: "/"
                }
            };
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== parseInt(requestEvt.params.uid));
            return {
                status: 303,
                headers: {
                    location: "/"
                }
            }
        default:
            return {
                status: 500,
                body: {}
            };
    }
}