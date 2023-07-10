function fetchApi(url) {
    const api_key =
        'live_izA6GD11r4kRXskFA7bDeTZEhEShLEUT7Ezk2xTLQTc1GXZr7HYK9vlvpPTWHB6v';

    return fetch(url, {
        headers: {
            'x-api-key': api_key,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.log('Error:', error);
            throw error;
        });
}
export function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds';
    return fetchApi(url);
}

export function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return fetchApi(url);
}