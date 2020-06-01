document.addEventListener('DOMContentLoaded', () => {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
});

const createCard = (content) => {
    const col = document.createElement('div');
    col.classList.add('col', 's12', 'm6');
    const card = document.createElement('div');
    card.classList.add('card-panel', 'pink', 'lighten-2');
    const cardContent = document.createElement('span');
    cardContent.classList.add('white-text');
    cardContent.innerText = content;
    card.append(cardContent);
    col.append(card);
    return col;
};

const getNews = () => {
    const value = document.querySelector('#range').value;
    fetch('/api/news', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({data: value})
    })
        .then(res => res.json())
        .then(data => {
            const row = document.querySelector('.row');
            row.innerHTML = '';
            data.forEach(n => {
                row.append(createCard(n));
            });
            history.pushState(null, null, `/news?limit=${value}`);
        })
        .catch(err => console.error(err));
};