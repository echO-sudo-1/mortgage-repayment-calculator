// 1. SELECT DOM ELEMENTS

// a. Input form (left side)
const clearButton = document.getElementById('clear-all-btn');
const mortgageForm = document.getElementById('mortgage-form');

// Mortgage Amount
const mortgageAmount = document.getElementById('mortgage-amount');
const errorAmount = document.getElementById('error-amount');

// Mortgage Term + Interest Rate (side by side)
const mortgageTerm = document.getElementById('mortgage-term');
const errorTerm = document.getElementById('error-term');
const interestRate = document.getElementById('interest-rate');
const errorRate = document.getElementById('error-rate');

// Mortgage Type (radio group)
const typeRepayment = document.getElementById('type-repayment');
const typeInterestOnly = document.getElementById('type-interest-only');
const errorType = document.getElementById('error-type');

// b. Results panel (right side)
const resultsEmpty = document.getElementById('results-empty');
const resultsCompleted = document.getElementById('results-completed');
const monthlyRepayment = document.getElementById('monthly-repayment');
const totalRepayment = document.getElementById('total-repayment');


// 2. HELPER FUNCTIONS

// Hides all error messages and removes red borders from inputs.
// Reused by both the submit handler and the "Clear All" button,
// so the error state logic only lives in one place.
function clearErrors() {
    errorAmount.hidden = true;
    errorTerm.hidden = true;
    errorRate.hidden = true;
    errorType.hidden = true;
    mortgageAmount.parentElement.classList.remove('input-error');
    mortgageTerm.parentElement.classList.remove('input-error');
    interestRate.parentElement.classList.remove('input-error');
}


// 3. EVENT LISTENERS


mortgageForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Step 1: reset all previous error states first
    clearErrors();

    let hasError = false;

    // Step 2: check each field again
    if (!mortgageAmount.value) {
        errorAmount.hidden = false;
        mortgageAmount.parentElement.classList.add('input-error');
        hasError = true;
    }
    if (!mortgageTerm.value) {
        errorTerm.hidden = false;
        mortgageTerm.parentElement.classList.add('input-error');
        hasError = true;
    }
    if (!interestRate.value) {
        errorRate.hidden = false;
        interestRate.parentElement.classList.add('input-error');
        hasError = true;
    }
    if (!typeRepayment.checked && !typeInterestOnly.checked) {
        errorType.hidden = false;
        hasError = true;
    }

    // Step 3: stop here if any field is invalid
    if (hasError) return;

    // Step 4: calculate the monthly repayment and total repayment
    const principal = parseFloat(mortgageAmount.value);
    const monthlyRate = (parseFloat(interestRate.value) / 100) / 12;
    const numberOfPayments = parseInt(mortgageTerm.value) * 12;

    let monthlyRepaymentResult;

    if (typeRepayment.checked) {
        // Repayment mortgage formula: M = P x [r(1+r)^n] / [(1+r)^n - 1]
        const x = Math.pow(1 + monthlyRate, numberOfPayments);
        monthlyRepaymentResult = (principal * (monthlyRate * x)) / (x - 1);
    } else {
        // Interest-only mortgage formula: M = P x r
        monthlyRepaymentResult = principal * monthlyRate;
    }

    const totalRepaymentResult = monthlyRepaymentResult * numberOfPayments;

    // Step 5: display the results
    resultsEmpty.hidden = true;
    resultsCompleted.hidden = false;
    monthlyRepayment.textContent = monthlyRepaymentResult.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });
    totalRepayment.textContent = totalRepaymentResult.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });
});

clearButton.addEventListener('click', function () {
    // Reset all form fields
    mortgageForm.reset();
    // Remove any visible errors
    clearErrors();
    // Show the empty results panel again
    resultsCompleted.hidden = true;
    resultsEmpty.hidden = false;
});
