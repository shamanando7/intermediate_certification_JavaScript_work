
function addReview() {
    const productName = document.getElementById('productName').value;
    const reviewText = document.getElementById('reviewText').value;

    if (!productName || !reviewText) {
        alert('Заполните все поля для добавления отзыва.');
        return;
    }

    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const newReview = { product: productName, review: reviewText };
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    document.getElementById('productName').value = '';
    document.getElementById('reviewText').value = '';

    showReviews(); // Обновляем список после добавления

    alert('Отзыв успешно добавлен.');
}

function showReviews() {
    const productList = document.getElementById('productList');
    const reviewList = document.getElementById('reviewList');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // Очищаем списки
    productList.innerHTML = '';
    reviewList.innerHTML = '';

    // Заполняем список продуктов
    const uniqueProducts = [...new Set(reviews.map(review => review.product))];
    uniqueProducts.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = product;
        listItem.onclick = () => showProductReviews(product);
        productList.appendChild(listItem);
    });
}

function showProductReviews(product) {
    const reviewList = document.getElementById('reviewList');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const productReviews = reviews.filter(review => review.product === product);

    // Очищаем список отзывов
    reviewList.innerHTML = '';

    // Заполняем список отзывов по выбранному продукту
    productReviews.forEach(review => {
        const listItem = document.createElement('li');
        listItem.textContent = review.review;

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Удалить';
        deleteBtn.onclick = () => deleteReview(product, review.review);

        listItem.appendChild(deleteBtn);
        reviewList.appendChild(listItem);
    });
}

function deleteReview(product, reviewText) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const updatedReviews = reviews.filter(review => !(review.product === product && review.review === reviewText));
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));

    showReviews(); // Обновляем список после удаления
}

// Инициализация при загрузке страницы
showReviews();
