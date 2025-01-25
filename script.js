const expenseAmount = document.getElementById('expense-amount');
const expenseName = document.getElementById('expense-name');
const expenseCategory = document.getElementById('expense-category');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');

addExpenseButton.addEventListener('click', () => {
    const amount = expenseAmount.value;
    const name = expenseName.value;
    const category = expenseCategory.value;

    if (amount && name && category) {
        const expenseItem = document.createElement('div');
        const expenseText = document.createElement('span');
        expenseText.textContent = `${name} (${category}) - $${amount}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            expenseList.removeChild(expenseItem);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            expenseName.value = name;
            expenseAmount.value = amount;
            expenseCategory.value = category;
            expenseList.removeChild(expenseItem);
        });

        expenseItem.appendChild(expenseText);
        expenseItem.appendChild(editButton);
        expenseItem.appendChild(deleteButton);
        expenseList.appendChild(expenseItem);

        // Clear the inputs
        expenseAmount.value = '';
        expenseName.value = '';
        expenseCategory.value = 'Food';
    } else {
        alert('Please fill in all fields.');
    }
});
