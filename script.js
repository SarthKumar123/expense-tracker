const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expenses");

// Load form inputs and existing expenses on page load
document.addEventListener("DOMContentLoaded", () => {
  // Load saved form inputs
  const savedAmount = localStorage.getItem("amount") || "";
  const savedDescription = localStorage.getItem("description") || "";
  const savedCategory = localStorage.getItem("category") || "Movie"; // Default to "Movie"

  document.getElementById("amount").value = savedAmount;
  document.getElementById("description").value = savedDescription;
  document.getElementById("category").value = savedCategory;

  // Load existing expenses
  const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  storedExpenses.forEach(expense => {
    addExpenseToDOM(expense.amount, expense.description, expense.category);
  });
});

// Add Expense Button Event
document.getElementById("add-expense").addEventListener("click", () => {
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  if (!amount || !description || !category) {
    alert("Please fill out all fields.");
    return;
  }

  // Save the expense to localStorage
  saveExpenseToLocalStorage({ amount, description, category });

  // Add expense to DOM
  addExpenseToDOM(amount, description, category);

  // Clear form inputs
  form.reset();
});

// Save form inputs to localStorage on input change
document.getElementById("amount").addEventListener("input", () => {
  localStorage.setItem("amount", document.getElementById("amount").value);
});

document.getElementById("description").addEventListener("input", () => {
  localStorage.setItem("description", document.getElementById("description").value);
});

document.getElementById("category").addEventListener("change", () => {
  localStorage.setItem("category", document.getElementById("category").value);
});

// Function to add an expense to the DOM
function addExpenseToDOM(amount, description, category) {
  const expenseItem = document.createElement("li");
  expenseItem.className = "expense-item";

  expenseItem.innerHTML = `
    ${amount} - ${category} - ${description}
    <button onclick="deleteExpense(this)">Delete Expense</button>
    <button onclick="editExpense(this)">Edit Expense</button>
  `;

  expenseList.appendChild(expenseItem);
}

// Function to save an expense to localStorage
function saveExpenseToLocalStorage(expense) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to delete an expense
function deleteExpense(button) {
  const expenseItem = button.parentElement;
  const [amount, category, ...descArr] = expenseItem.textContent.split(" - ");
  const description = descArr.join(" ").replace("Delete ExpenseEdit Expense", "").trim();

  // Remove from localStorage
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const updatedExpenses = expenses.filter(
    exp => !(exp.amount == amount && exp.category == category && exp.description == description)
  );
  localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

  // Remove from DOM
  expenseList.removeChild(expenseItem);
}

// Function to edit an expense
function editExpense(button) {
  const expenseItem = button.parentElement;

  // Parse the content of the expense item excluding button texts
  const textContent = Array.from(expenseItem.childNodes)
    .filter(node => node.nodeType === Node.TEXT_NODE) // Only get text nodes
    .map(node => node.textContent.trim())
    .join("");

  const [amount, category, ...descArr] = textContent.split(" - ");
  const description = descArr.join(" ").trim();

  // Populate the form fields with the parsed data
  document.getElementById("amount").value = amount.trim();
  document.getElementById("description").value = description.trim();
  document.getElementById("category").value = category.trim();

  // Save to localStorage
  localStorage.setItem("amount", amount.trim());
  localStorage.setItem("description", description.trim());
  localStorage.setItem("category", category.trim());

  // Remove the old expense item to avoid duplication
  expenseList.removeChild(expenseItem);
}
