let cid = [
    ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25],
    ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
];
let price;

document.getElementById('purchase-btn').addEventListener('click', function() {
    price = parseFloat(document.getElementById('price').value);
    let cash = parseFloat(document.getElementById('cash').value);
    if (cash < price) {
        document.getElementById('change-due').textContent = "Customer does not have enough money to purchase the item";
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cash === price) {
        document.getElementById('change-due').textContent = "No change due - customer paid with exact cash";
        return;
    }
    

    function checkCashRegister(price, cash, cid) {
        const currencyUnit = [
            ["PENNY", 0.01], ["NICKEL", 0.05], ["DIME", 0.1], ["QUARTER", 0.25],
            ["ONE", 1], ["FIVE", 5], ["TEN", 10], ["TWENTY", 20], ["ONE HUNDRED", 100]
        ];

        let changeDue = cash - price;
        let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);

        if (changeDue > totalCid) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        } else if (changeDue.toFixed(2) === totalCid) {
            return { status: "CLOSED", change: cid };
        } else {
            let changeArray = [];
            for (let i = currencyUnit.length - 1; i >= 0; i--) {
                let coinName = currencyUnit[i][0];
                let coinValue = currencyUnit[i][1];
                let coinTotal = cid[i][1];
                let coinCount = (coinTotal / coinValue).toFixed(2);
                let coinToReturn = 0;

                while (changeDue >= coinValue && coinCount > 0) {
                    changeDue -= coinValue;
                    changeDue = changeDue.toFixed(2);
                    coinCount--;
                    coinToReturn++;
                }

                if (coinToReturn > 0) {
                    changeArray.push([coinName, coinToReturn * coinValue]);
                }
            }

            if (changeDue > 0) {
                return { status: "INSUFFICIENT_FUNDS", change: [] };
            } else {
                return { status: "OPEN", change: changeArray };
            }
        }
    }

    let result = checkCashRegister(price, cash, cid);
    let changeDueElement = document.getElementById('change-due');
    if (result.status === "INSUFFICIENT_FUNDS") {
        changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (result.status === "CLOSED") {
        changeDueElement.textContent = `Status: CLOSED ${result.change.map(item => `${item[0]}: $${item[1]}`).join(' ')}`;
    } else {
        changeDueElement.textContent = `Status: OPEN ${result.change.map(item => `${item[0]}: $${item[1]}`).join(' ')}`;
    }
});