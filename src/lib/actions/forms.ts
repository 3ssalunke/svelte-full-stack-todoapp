export const enhance = (form: HTMLFormElement, {result}: {result: Function}) => {
    const handleSubmit = async(e: Event) => {
        e.preventDefault();

        try {
            const body = new FormData(form);
            let res = await fetch(form.action, {
                method: form.method,
                headers: {
                    accept: "application/json"
                },
                body
            });
            if(res.ok) {
                result(await res.json(), form);
                // console.log("API response - ", await res.json());
            }else console.error("Fetch Error - ", await res.text());
        } catch (error) {
            console.error("Could not submit the form ", error);
        }
    }
    form.addEventListener("submit", handleSubmit);

    return {
        destroy(){
            form.removeEventListener("submit", handleSubmit);
        }
    }
}