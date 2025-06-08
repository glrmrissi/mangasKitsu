
export async function fetchApi(url) {
    try {
        const response = await fetch(url);
        if(!response.ok) {throw new Error(`Erro ${response.error}`)};
        return await response.json();
    } catch {
        console.error(`Error, and repeting process `);
        return null
    }
}

