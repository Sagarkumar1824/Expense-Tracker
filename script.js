document.addEventListener('DOMContentLoaded', () => {
    let salary = 0;
    let totalExpenses = 0;

    const salaryForm = document.getElementById('salary-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const remainingDisplay = document.getElementById('remaining');
    const totalExpensesDisplay = document.getElementById('total-expenses');

    // Set salary
    salaryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputSalary = parseFloat(document.getElementById('salary').value.trim());

        if (!isNaN(inputSalary) && inputSalary > 0) {
            salary = inputSalary;
            updateRemaining();
            document.getElementById('salary').disabled = true;
            document.getElementById('set-salary-btn').disabled = true;
            document.getElementById('salary-status').innerText = `Salary set: $${salary.toFixed(2)}`;
        } else {
            alert("Please enter a valid salary amount.");
        }
    });

    // Add expenses
    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const desc = document.getElementById('description').value.trim();
        const amount = parseFloat(document.getElementById('amount').value.trim());
        
        if (desc && !isNaN(amount) && amount > 0) {
            if (amount > (salary - totalExpenses)) {
                alert("Not enough balance for this expense.");
                return;
            }

            const li = document.createElement('li');
            const amountId = 'amount-' + Date.now();

            li.innerHTML = `
                <span>${desc}</span>
                <span id="${amountId}">$ ${amount.toFixed(2)}</span>
                <button class="delete-btn">x</button>
            `;

            li.querySelector('.delete-btn').addEventListener('click', () => {
                const amtText = document.getElementById(amountId).innerText;
                const amtValue = parseFloat(amtText.replace('$', ''));
                totalExpenses -= amtValue;
                updateRemaining();
                li.remove();
            });

            expenseList.appendChild(li);
            totalExpenses += amount;
            updateRemaining();

            expenseForm.reset();
        } else {
            alert("Please enter a valid description and amount.");
        }
    });

    function updateRemaining() {
        const remaining = salary - totalExpenses;
        totalExpensesDisplay.innerText = totalExpenses.toFixed(2);
        remainingDisplay.innerText = remaining.toFixed(2);
    }
});
