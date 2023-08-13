async function fetchQuoteData() {
    const quoteCard = document.getElementById('quote-card');
    const loadingCard = document.getElementById('loadingCard');
    const copyQuoteButton = document.getElementById('copyQuote');
    const errorCard = document.getElementById('errorCard');

    quoteCard.classList.add('d-none');
    loadingCard.classList.remove('d-none');
    copyQuoteButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
    copyQuoteButton.disabled = false;
    errorCard.classList.add('d-none');

    try {
        const response = await fetch('https://qts-api.caliph.workers.dev/api/generate/quotes-anime');
        const quote = await response.json();

        const charImage = document.getElementById('charImage');
        const imageLoader = document.getElementById('imageLoader');
        charImage.style.display = 'none';
        imageLoader.style.display = 'block';

        const img = new Image();
        img.src = `https://i0.wp.com/${quote.img.replace('https://', '')}`;
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
        quoteCard.classList.remove('d-none');
    
    } catch (error) {
        console.error(error);
        errorCard.classList.remove('d-none');
    } finally {
        loadingCard.classList.add('d-none');
    }
}

document.getElementById('newQuote').addEventListener('click', () => {
    fetchQuoteData();
    const quoteCard = document.getElementById('quote-card');
    quoteCard.classList.add('animate__animated', 'animate__bounce');
    setTimeout(() => {
        quoteCard.classList.remove('animate__bounce');
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
    const copyQuoteButton = document.getElementById('copyQuote');
    copyQuoteButton.textContent = 'Copied!';
    copyQuoteButton.disabled = true;
});
