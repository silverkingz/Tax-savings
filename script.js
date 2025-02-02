function calculate() {
    // Get input values
    const income = parseFloat(document.getElementById('income').value);
    const accRate = parseFloat(document.getElementById('acc').value) / 100;
    const fees = parseFloat(document.getElementById('fees').value) || 0;

    // Validate inputs
    if (isNaN(income) || income < 0) {
        alert('Please enter a valid annual income');
        return;
    }

    // Calculate income tax (NZ 2023-2024 brackets)
    let tax = 0;
    
    if (income > 180000) {
        tax += (income - 180000) * 0.39;
        tax += (180000 - 70000) * 0.33;
        tax += (70000 - 48000) * 0.30;
        tax += (48000 - 14000) * 0.175;
        tax += 14000 * 0.105;
    } else if (income > 70000) {
        tax += (income - 70000) * 0.33;
        tax += (70000 - 48000) * 0.30;
        tax += (48000 - 14000) * 0.175;
        tax += 14000 * 0.105;
    } else if (income > 48000) {
        tax += (income - 48000) * 0.30;
        tax += (48000 - 14000) * 0.175;
        tax += 14000 * 0.105;
    } else if (income > 14000) {
        tax += (income - 14000) * 0.175;
        tax += 14000 * 0.105;
    } else {
        tax += income * 0.105;
    }

    // Calculate ACC levy
    const accLevy = income * accRate;
    
    // Calculate total deductions
    const total = tax + accLevy + fees;

    // Update display
    document.getElementById('weekly').textContent = `NZ$ ${(total / 52).toFixed(2)}`;
    document.getElementById('monthly').textContent = `NZ$ ${(total / 12).toFixed(2)}`;
    document.getElementById('yearly').textContent = `NZ$ ${total.toFixed(2)}`;
    document.getElementById('tax').textContent = `NZ$ ${tax.toFixed(2)}`;
    document.getElementById('acclevy').textContent = `NZ$ ${accLevy.toFixed(2)}`;
    document.getElementById('otherfees').textContent = `NZ$ ${fees.toFixed(2)}`;
}

function reset() {
    document.getElementById('income').value = '';
    document.getElementById('acc').value = '1.39';
    document.getElementById('fees').value = '0';
    document.getElementById('weekly').textContent = 'NZ$ 0.00';
    document.getElementById('monthly').textContent = 'NZ$ 0.00';
    document.getElementById('yearly').textContent = 'NZ$ 0.00';
    document.getElementById('tax').textContent = 'NZ$ 0.00';
    document.getElementById('acclevy').textContent = 'NZ$ 0.00';
    document.getElementById('otherfees').textContent = 'NZ$ 0.00';
}
