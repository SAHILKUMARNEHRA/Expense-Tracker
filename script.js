let expenses = [];
let totalAmount = 0;

function addExpense() {
    const descriptionInput = document.getElementById('descriptionInput');
    const amountInput = document.getElementById('amountInput');
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid description and amount!');
        return;
    }

    const expense = {
        id: Date.now(),
        description: description,
        amount: amount
    };

    expenses.push(expense);
    totalAmount += amount;

    updateUI();
    descriptionInput.value = '';
    amountInput.value = '';
}

function deleteExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    totalAmount -= expense.amount;
    expenses = expenses.filter(exp => exp.id !== id);

    updateUI();
}

function updateUI() {
    const expenseList = document.getElementById('expenseList');
    const totalAmountElement = document.getElementById('totalAmount');

    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="expense-details">
                <span class="expense-description">${expense.description}</span>
                <span class="expense-amount">₹${expense.amount.toFixed(2)}</span>
            </div>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenseList.appendChild(li);
    });

    totalAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
}