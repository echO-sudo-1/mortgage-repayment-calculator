//1-select DOM 

//a-Input form (left side)
const clearButton = document.getElementById('clear-all-btn');
//Mortgage Amount
const mortageForm = document.getElementById('mortgage-form');
const mortgageAmount = document.getElementById('mortgage-amount');
const errorAmount = document.getElementById('error-amount');
//Mortgage Term + Interest Rate side by side
const mortgageTerm = document.getElementById('mortgage-term');
const errorTerm = document.getElementById('error-term');
const interestRate = document.getElementById('interest-rate');
const errorRate = document.getElementById('error-rate');
//Mortgage Type (radio group)
const typeRepayment = document.getElementById('type-repayment');
const typeInterestOnly = document.getElementById('type-interest-only');
const errorType = document.getElementById('error-type');
//calculate button
const calculateBtn = document.getElementById('calculate-btn');

//b- Results panel (right side)
const resultsEmpty = document.getElementById('results-empty');
//Completed state: shown after a successful calculation
const resultsCompleted = document.getElementById('results-completed');
const monthlyRepayment = document.getElementById('monthly-repayment');
const totalRepayment = document.getElementById('total-repayment');

//2-Event Listeners
mortageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Step 1: reset all previous error states first
    errorAmount.hidden = true;
    errorTerm.hidden = true;
    errorRate.hidden = true;
    errorType.hidden = true;
    mortgageAmount.parentElement.classList.remove('input-error');
    mortgageTerm.parentElement.classList.remove('input-error');
    interestRate.parentElement.classList.remove('input-error');

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
// step 4: calculate the monthly repayment and total repayment
let principal = parseFloat(mortgageAmount.value);
let monthlyrate = (parseFloat(interestRate.value) / 100) / 12;
let numberOfPayments = parseInt(mortgageTerm.value) * 12;

let monthlyRepaymentResult;

if (typeRepayment.checked) {
    // Repayment mortgage formula: M = P × [r(1+r)^n] / [(1+r)^n - 1]
    const x = Math.pow(1 + monthlyrate, numberOfPayments);
    monthlyRepaymentResult = principal * (monthlyrate * x) / (x - 1);
}else {
    // Interest-only mortgage formula: M = P × r
    monthlyRepaymentResult = principal * monthlyrate;
}

const totalRepaymentResult = monthlyRepaymentResult * numberOfPayments;

});
