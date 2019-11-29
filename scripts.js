var pageStart = (function(){
    let money = {
        reset: function (){
            money.principal = Number(document.getElementById('principal').value);
            money.originalPrincipal = money.principal;
            money.interestRate = Number(document.getElementById('interestRate').value)/100;
            money.nCompounds = Number(document.getElementById('nCompounds').value);
            money.addToBalance = Number(document.getElementById('addToBalance').value);
            money.addToFrequency = Number(document.getElementById('addToFrequency').value);
            money.moneyGoal = Number(document.getElementById('moneyGoal').value);
            money.addedBalanceTotal = 0;
        }
    }

    function compound(){
        money.reset();
        document.getElementById('log').innerHTML = '<tr><th>Year</th><th>Balance</th><th>Interest</th><th>You Added</th></tr>';

        let year = 0;
        while (money.principal < money.moneyGoal){
            // Have to loop in order to add to the balance periodically.
            addRow(year);
            let n=0;
            for (let i=0; i<money.nCompounds; ++i){
                while (i >= money.nCompounds/money.addToFrequency * n){
                    n += 1;
                    money.principal += money.addToBalance;
                    money.addedBalanceTotal += money.addToBalance;
                }
                money.principal = money.principal*(1 + (money.interestRate/money.nCompounds));
            }
            ++year;
        }
        // Add final year after reaching goal.
        addRow(year);
        // Say how many years it will take.
        document.getElementById('yearsToHitGoal').innerHTML = 
            `It will take <b>${year}</b> years to have <b>$${money.moneyGoal}</b> by starting with <b>$${money.originalPrincipal}</b> with <b>${(money.interestRate*100).toFixed(2)}%</b> APY (compounding ${money.nCompounds}/yr) contributing <b>$${money.addToBalance}</b> every <b>${(365/money.addToFrequency).toFixed(2)}</b> days.`;

    }

    function addRow(i){
        document.getElementById('log').innerHTML += 
            `<tr>
                <td>${i}</td><td>$${money.principal.toFixed(2)}</td><td>$${(money.principal - money.addedBalanceTotal - money.originalPrincipal).toFixed(2)}</td><td>$${(money.addedBalanceTotal + money.originalPrincipal).toFixed(2)}</td>
            </tr>`;
    }

    let inputs = document.getElementsByClassName('form-control');
    for(let i=0; i<inputs.length; ++i){
        inputs[i].onchange = compound;
    }

    function pageStart(){
        compound();
    }

    return pageStart;
})();
