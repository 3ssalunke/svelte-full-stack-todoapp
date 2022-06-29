import type { RequestEvent } from "@sveltejs/kit";

let todos: Todo[] = [];

export const api = async(requestEvt: RequestEvent) => {
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
            const data = await requestEvt.request.formData();
            const text = data.get("todo") as string;
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