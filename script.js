async function fetchQuoteData() {
    document.getElementById('quote-card').classList.add('hidden');
    document.getElementById('loadingCard').classList.remove('hidden');
    document.getElementById('copyQuote').innerHTML = '<i class="fas fa-copy"></i> Copy';
    document.getElementById('copyQuote').disabled = false;

    try {
        const response = await fetch('https://qts-api.caliph.workers.dev/api/generate/quotes-anime');
        const quote = await response.json();

        const charImage = document.getElementById('charImage');
        const imageLoader = document.getElementById('imageLoader');
        charImage.style.display = 'none';
        imageLoader.style.display = 'block';

        const img = new Image();
        img.src = quote.img;
        img.onload = () => {
            charImage.src = quote.img;
            charImage.style.display = 'block';
            imageLoader.style.display = 'none';
        };
        img.onerror = () => {
            charImage.style.display = 'none';
            imageLoader.style.display = 'none';
        }

        document.title = `${quote.quotes} - ${quote.char_name}`;

        document.getElementById('charName').textContent = quote.char_name;
        document.getElementById('quote').textContent = `"${quote.quotes}"`;
        document.getElementById('anime').textContent = `Anime: ${quote.anime}`;
        document.getElementById('episode').textContent = `Episode: ${quote.episode}`;
        document.getElementById('date').textContent = `Date: ${quote.date}`;
    
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        document.getElementById('loadingCard').classList.add('hidden');
        document.getElementById('quote-card').classList.remove('hidden');
    }
}

document.getElementById('newQuote').addEventListener('click', () => {
    fetchQuoteData();
    document.getElementById('quote-card').classList.add('animate__animated', 'animate__bounce');
    setTimeout(() => {
        document.getElementById('quote-card').classList.remove('animate__bounce');
    }, 500);
});

document.getElementById('shareQuote').addEventListener('click', async () => {
    const quote = document.getElementById('quote').textContent;
    const charName = document.getElementById('charName').textContent;
    const shareData = {
        title: 'Anime Quote',
        text: `${quote} - ${charName}`,
    };

    try {
        await navigator.share(shareData);
    } catch (error) {
        console.error('Share API error:', error);
    }
});

document.getElementById('copyQuote').addEventListener('click', () => {
    const charName = document.getElementById('charName').textContent;
    const quote = document.getElementById('quote').textContent;
    const anime = document.getElementById('anime').textContent;	
    navigator.clipboard.writeText(`${quote}\n\n- ${charName}\n${anime}`);
    document.getElementById('copyQuote').textContent = 'Copied!';
    document.getElementById('copyQuote').disabled = true;

});