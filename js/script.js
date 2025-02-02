document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');

    calculateBtn.addEventListener('click', calculateTax);
    resetBtn.addEventListener('click', resetCalculator);
});

function calculateTax() {
    // Get input values
    const income = parseFloat(document.getElementById('income').value);
    const accRate = parseFloat(document.getElementById('acc').value) / 100;
    const fees = parseFloat(document.getElementById('fees').value) || 0;

    // Validate inputs
    if (isNaN(income) || income < 0) {
        showError('Please enter a valid annual income');
        return;
    }

    // Calculate tax using NZ 2023-2024 brackets
    const tax = calculateIncomeTax(income);
    const accLevy = income * accRate;
    const total = tax + accLevy + fees;

    // Update display
    updateDisplay({
        weekly: total / 52,
        monthly: total / 12,
        yearly: total,
        tax,
        accLevy,
        fees
    });
}

function calculateIncomeTax(income) {
    // NZ 2023-2024 tax brackets
    let tax = 0;
    
    if (income > 180000) {
        tax += (income - 180000) * 0.39;
        income = 180000;
    }
    if (income > 70000) {
        tax += (income - 70000) * 0.33;
        income = 70000;
    }
    if (income > 48000) {
        tax += (income - 48000) * 0.30;
        income = 48000;
    }
    if (income > 14000) {
        tax += (income - 14000) * 0.175;
        income = 14000;
    }
    tax += income * 0.105;
    
    return tax;
}

function updateDisplay(values) {
    document.getElementById('weekly').textContent = `$${values.weekly.toFixed(2)}`;
    document.getElementById('monthly').textContent = `$${values.monthly.toFixed(2)}`;
    document.getElementById('yearly').textContent = `$${values.yearly.toFixed(2)}`;
    document.getElementById('taxAmount').textContent = `$${values.tax.toFixed(2)}`;
    document.getElementById('accAmount').textContent = `$${values.accLevy.toFixed(2)}`;
    document.getElementById('feesAmount').textContent = `$${values.fees.toFixed(2)}`;
}

function resetCalculator() {
    document.getElementById('income').value = '';
    document.getElementById('acc').value = '1.39';
    document.getElementById('fees').value = '0';
    updateDisplay({
        weekly: 0,
        monthly: 0,
        yearly: 0,
        tax: 0,
        accLevy: 0,
        fees: 0
    });
}

function showError(message) {
    alert(message);
}
