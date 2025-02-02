document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');

    calculateBtn.addEventListener('click', calculateTax);
    resetBtn.addEventListener('click', resetCalculator);
});

function calculateTax() {
    // Get input values
    const income = parseFloat(document.getElementById('income').value);
    const accRate = parseFloat(document.getElementById('acc-rate').value) / 100;
    const otherFees = parseFloat(document.getElementById('other-fees').value) || 0;

    // Validate inputs
    if (isNaN(income) || income < 0) {
        alert('Please enter a valid annual income');
        return;
    }

    // Calculate tax using NZ 2023-2024 brackets
    let tax = 0;
    const brackets = [
        { min: 0, max: 14000, rate: 0.105 },
        { min: 14001, max: 48000, rate: 0.175 },
        { min: 48001, max: 70000, rate: 0.30 },
        { min: 70001, max: 180000, rate: 0.33 },
        { min: 180001, rate: 0.39 }
    ];

    let remainingIncome = income;
    
    for (const bracket of brackets) {
        if (remainingIncome <= 0) break;
        
        const taxable = bracket.max 
            ? Math.min(remainingIncome, bracket.max - bracket.min + 1)
            : remainingIncome;
            
        tax += taxable * bracket.rate;
        remainingIncome -= taxable;
    }

    // Calculate ACC and totals
    const accLevy = income * accRate;
    const totalDeductions = tax + accLevy + otherFees;

    // Update display
    updateResults({
        weekly: totalDeductions / 52,
        monthly: totalDeductions / 12,
        yearly: totalDeductions,
        tax,
        accLevy,
        otherFees
    });
}

function updateResults(values) {
    document.getElementById('weekly').textContent = `$${values.weekly.toFixed(2)}`;
    document.getElementById('monthly').textContent = `$${values.monthly.toFixed(2)}`;
    document.getElementById('yearly').textContent = `$${values.yearly.toFixed(2)}`;
    document.getElementById('tax-amount').textContent = `$${values.tax.toFixed(2)}`;
    document.getElementById('acc-amount').textContent = `$${values.accLevy.toFixed(2)}`;
    document.getElementById('fees-amount').textContent = `$${values.otherFees.toFixed(2)}`;
}

function resetCalculator() {
    document.getElementById('income').value = '';
    document.getElementById('acc-rate').value = '1.39';
    document.getElementById('other-fees').value = '0';
    updateResults({
        weekly: 0,
        monthly: 0,
        yearly: 0,
        tax: 0,
        accLevy: 0,
        otherFees: 0
    });
}
