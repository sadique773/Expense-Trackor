document.addEventListener("DOMContentLoaded",()=>{
    const expenseForm = document.getElementById("expense-form")
    const expenseName = document.getElementById("expense-name")
    const expenseAmount = document.getElementById("expense-amount")
    const expenseList = document.getElementById("expense-list")
    const totalamountdisplay = document.getElementById("total-amount")


    let expenses = [];
        

    expenseForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const name = expenseName.value.trim();
        const amount = parseInt(expenseAmount.value.trim());

        if(name !== "" && !isNaN(amount) && amount >0){
            const newExpense = {
                id:Date.now(),
                name:name,
                amount:amount,
            }
            expenses.push(newExpense);
            saveExpensesTolocal();
            saveExpenses();
            calculatTotalamount();
        }
    })





    function saveExpenses(){
        expenseList.innerHTML = ""
        if(expenses.length){
            expenses.forEach((expense)=>{
                let li = document.createElement("li");
                li.innerHTML = `${expense.name} - ₹${expense.amount}<button class="delete" dataId=${expense.id}>Delete</button>`
                expenseList.append(li);
            })
            
        }
    }

    expenseList.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON"){
            const selectid = parseInt(e.target.getAttribute("dataId"));
            const index = expenses.findIndex((expense)=>expense.id === selectid);
            if (index !== -1) { 
                expenses.splice(index, 1); 
            }
            saveExpensesTolocal();
            saveExpenses();
            calculatTotalamount();
        }
    })


    function saveExpensesTolocal(){
        localStorage.setItem("expenses", JSON.stringify(expenses));
        expenseName.value = ""
        expenseAmount.value =""
    }

    function calculatTotalamount(){
        let sum =0;
      expenses.forEach((expense)=>{
        sum+=expense.amount;
      })
      totalamountdisplay.textContent =`${sum.toFixed(2)}`
    }



})