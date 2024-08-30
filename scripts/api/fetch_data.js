export async function getPhotographers() {
    const src = 'data/photographers.json';
    try {
        const response = await fetch(src);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.debug(json);
        return json;
    } catch (error) {
        console.error(error.message);
    }
}
