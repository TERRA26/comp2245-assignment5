document.addEventListener('DOMContentLoaded', () => {
    const countryInput = document.getElementById('country');
    const lookupBtn = document.getElementById('lookup');
    const lookupCitiesBtn = document.getElementById('lookupCities');
    const resultDiv = document.getElementById('result');

    const fetchData = async (lookupType) => {
        const country = countryInput.value.trim();
        const url = `world.php?country=${encodeURIComponent(country)}${lookupType === 'cities' ? '&lookup=cities' : ''}`;

        try {
            resultDiv.innerHTML = 'Loading...';

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text();
            resultDiv.innerHTML = data;
        } catch (error) {
            resultDiv.innerHTML = `Error: ${error.message}`;
        }
    };

    lookupBtn.addEventListener('click', () => fetchData('country'));
    lookupCitiesBtn.addEventListener('click', () => fetchData('cities'));

    countryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchData('country');
        }
    });
});