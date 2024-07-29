document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('smoothieForm');
    form.addEventListener('change', calculateTotal);
});

function calculateTotal() {
    const size = document.getElementById('size').value;
    const sizePrices = { small: 5, medium: 7, large: 9 };
    let total = sizePrices[size];

    const ingredients = document.querySelectorAll('input[name="ingredients"]:checked');
    ingredients.forEach(ingredient => {
        total += parseFloat(ingredient.dataset.price);
    });

    const addOns = document.querySelectorAll('input[name="addOns"]:checked');
    addOns.forEach(addOn => {
        total += parseFloat(addOn.dataset.price);
    });

    const sweetener = document.getElementById('sweetener').value;
    const sweetenerPrices = { none: 0, sugar: 0.5, agave: 0.75, maple: 1 };
    total += sweetenerPrices[sweetener];

    document.getElementById('smoothieTotal').innerText = `Total: $${total.toFixed(2)}`;
}

function orderSmoothie() {
    const size = document.getElementById('size').value;
    const ingredients = document.querySelectorAll('input[name="ingredients"]:checked');
    const addOns = document.querySelectorAll('input[name="addOns"]:checked');
    const sweetener = document.getElementById('sweetener');

    let ingredientList = [];
    let addOnList = [];
    let totalPrice = 0;

    ingredients.forEach((ingredient) => {
        const price = parseFloat(ingredient.getAttribute('data-price'));
        ingredientList.push(ingredient.value);
        totalPrice += price;
    });

    addOns.forEach((addOn) => {
        const price = parseFloat(addOn.getAttribute('data-price'));
        addOnList.push(addOn.value);
        totalPrice += price;
    });

    const sizePrices = {
        small: 5,
        medium: 7,
        large: 9
    };

    totalPrice += sizePrices[size];

    const sweetenerPrice = parseFloat(sweetener.options[sweetener.selectedIndex].getAttribute('data-price')) || 0;
    totalPrice += sweetenerPrice;

    const smoothieDescription = `You have ordered a ${size} smoothie with: ${ingredientList.join(', ')}. Add-Ons: ${addOnList.join(', ')}. Sweetener: ${sweetener.options[sweetener.selectedIndex].text}.`;
    const smoothieTotal = `Total Price: $${totalPrice.toFixed(2)}`;

    document.getElementById('smoothieDescription').innerText = smoothieDescription;
    document.getElementById('smoothieTotal').innerText = smoothieTotal;
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const description = document.getElementById('smoothieDescription').innerText;
    const total = document.getElementById('smoothieTotal').innerText;

    doc.text('Smoothie Order Bill', 10, 10);
    doc.text(description, 10, 20);
    doc.text(total, 10, 30);

    doc.save('smoothie_order_bill.pdf');
}
