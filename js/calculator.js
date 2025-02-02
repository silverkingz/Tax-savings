// NZ Tax Calculator Logic
function calculateTax() {
    // DOM Elements
    const incomeInput = document.getElementById('income');
    const accRateInput = document.getElementById('acc-rate');
    const otherFeesInput = document.getElementById('other-fees');
    
    // Input Values
    const income = parseFloat(incomeInput.value);
    const accRate = parseFloat(accRateInput.value) / 100;
    const otherFees = parseFloat(otherFeesInput.value) || 0;

    // Validation
    if (!validateInputs(income, accRate, otherFees)) return;

    // Tax Calculation
    const tax = calculateNZIncomeTax(income);
    const accLevy = income * accRate;
    const totalDeductions = tax + accLevy + otherFees;

    // Update UI
    updateDisplay({
        weekly: totalDeductions / 52,
        monthly: totalDeductions / 12,
        yearly: totalDeductions,
        tax,
        accLevy,
        otherFees
    });
}

// Updated Tax Calculation Function
function calculateNZIncomeTax(income) {
    let tax = 0;
    
    // NZ 2023-2024 Tax Brackets
    if (income > 180000) {
        tax += (income - 180000) * 0.39;
        tax += 110000 * 0.33;  // 180k - 70k
        tax += 22000 * 0.30;   // 70k - 48k
        tax += 34000 * 0.175;  // 48k - 14k
        tax += 14000 * 0.105;
    } else if (income > 70000) {
        tax += (income - 70000) * 0.33;
        tax += 22000 * 0.30;   // 70k - 48k
        tax += 34000 * 0.175;  // 48k - 14k
        tax += 14000 * 0.105;
    } else if (income > 48000) {
        tax += (income - 48000) * 0.30;
        tax += 34000 * 0.175;  // 48k - 14k
        tax += 14000 * 0.105;
    } else if (income > 14000) {
        tax += (income - 14000) * 0.175;
        tax += 14000 * 0.105;
    } else {
        tax += income * 0.105;
    }
    
    return tax;
}

// Rest of the code remains the same
function validateInputs(income, accRate, otherFees) {
    if (isNaN(income) || income < 0) {
        alert('Please enter a valid annual income');
        return false;
    }
    if (isNaN(accRate) || accRate < 0) {
        alert('Please enter a valid ACC rate');
        return false;
    }
    if (isNaN(otherFees) || otherFees < 0) {
        alert('Please enter valid additional fees');
        return false;
    }
    return true;
}

function updateDisplay(values) {
    document.getElementById('weekly').textContent = `NZ$ ${values.weekly.toFixed(2)}`;
    document.getElementById('monthly').textContent = `NZ$ ${values.monthly.toFixed(2)}`;
    document.getElementById('yearly').textContent = `NZ$ ${values.yearly.toFixed(2)}`;
    document.getElementById('tax-amount').textContent = `Income Tax: NZ$ ${values.tax.toFixed(2)}`;
    document.getElementById('acc-amount').textContent = `ACC Levy: NZ$ ${values.accLevy.toFixed(2)}`;
    document.getElementById('fees-amount').textContent = `Other Fees: NZ$ ${values.otherFees.toFixed(2)}`;
}

function resetCalculator() {
    document.getElementById('income').value = '';
    document.getElementById('acc-rate').value = '1.39';
    document.getElementById('other-fees').value = '0';
    updateDisplay({
        weekly: 0,
        monthly: 0,
        yearly: 0,
        tax: 0,
        accLevy: 0,
        otherFees: 0
    });
}
