import type { RequestHandler } from "@sveltejs/kit";

const todos: Todo[] = []

export const get: RequestHandler = async() => {
    return {
        status: 200,
        body: {
            message: "success",
            todos
        }
    }
}

export const post: RequestHandler = async({request}) => {
    const data = await request.formData()
    const text = data.get("todo") as string
    todos.push({
        created_at: new Date(),
        text,
        done: false
    })
    return {
        status: 303,
        headers: {
            location: "/"
        }
    }
}