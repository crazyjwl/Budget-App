/**
* BUDGET CONTROLLER
**/
var budgetController = (function() {

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type){
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems :{
      inc : [],
      exp : []
    },
    totals : {
      inc : 0,
      exp : 0
    },
    budget : 0,
    percentage : -1
  }

  return {
    addItem : function(type, desc, val){
      var newItem, ID;

      //[1,2,4,5,8] next ID = 9
      //ID = last ID +1
      // create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }else {
        ID = 0;
      }


      // create new item based on 'inc' or 'exp'
      if (type === 'inc') {
        newItem = new Income(ID, desc, val);
      }else if (type === 'exp'){
        newItem = new Expense(ID, desc, val);
      }

      // push it into data structure
      data.allItems[type].push(newItem);

      //return the new element
      return newItem;
    },

    deleteItem : function(type, id) {
      var ids, index;
      //id = 3
      //[1 2 3 6 8], index = 2
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudge : function() {

      // calculate the total income and expense
      calculateTotal('inc');
      calculateTotal('exp');

      // calculate the budget : income - expense
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }


    },

    getBudget : function(){
      return {
        budget : data.budget,
        totalInc : data.totals.inc,
        totalExp : data.totals.exp,
        percentage : data.percentage
      }
    },

    testing : function(){
      console.log(data);
    }
  };

})();

/**
* UI CONTROLLER
**/
var UIController = (function() {

  var DOMStrings = {
    inputType : '.add_type',
    inputDescription : '.add_description',
    inputValue : '.add_value',
    inputBtn : '.add_btn',
    incomeContainer : '.income_list',
    expenseContainer : '.expense_list',
    budgetLabel : '.budget_value',
    incomeLabel : '.budget_income_value',
    expenseLabel : '.budget_expense_value',
    percentageLabel : '.budget_expense_percentage',
    container : '.container'
  }

  return {
    getInput : function(){
      return {
        type : document.querySelector(DOMStrings.inputType).value, //this will be either inc or exp
        description : document.querySelector(DOMStrings.inputDescription).value,
        value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
      }
    },
    addListItem : function(obj, type){

      var html, newHtml, element;

      // create HTML strings with placeholder text
      if (type === 'inc'){
        html = '<div class="item clearfix" id="inc-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_delete"><button class="item_delete_btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = DOMStrings.incomeContainer;
      } else if (type === 'exp') {
        html = '<div class="item clearfix" id="exp-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_percentage">66%</div><div class="item_delete"><button class="item_delete_btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = DOMStrings.expenseContainer;
      }

      // Replace the placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
    },

    clearFields : function(){
      var field, fieldArr;

      field = document.querySelectorAll(DOMStrings.inputDescription + ',' +DOMStrings.inputValue);

      // convert elements into an array
      fieldArr = Array.prototype.slice.call(field);

      fieldArr.forEach(function(current) {
        current.value = "";
      });

      fieldArr[0].focus();

    },

    displayBudget : function(obj){
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;
      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '---';
      }
    },

    getDOMStrings : function(){
      return DOMStrings;
    }
  };
})();

/**
* GLOBAL APP CONTROLLER
**/

var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListener = function(){
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(e){
      if (e.keyCode === 13 || e.witch === 13) {
        ctrlAddItem();
      }
    });
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };

  var updateBudget = function(){
    //1. Calculate the budget
    budgetCtrl.calculateBudge();

    //2. Return the budget
    var budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  var ctrlAddItem = function(){
    var input, newItem;

    //1. Get the field input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //3. Add the item into the UI
      UICtrl.addListItem(newItem, input.type);

      //4. clear input fields
      UICtrl.clearFields();

      //5. Calculate and update budget
      updateBudget();
    }
  };

  var ctrlDeleteItem = function(e) {
    var itemID, splitID;
    itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      // inc-1 ---> ["inc", "1"]
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // delete the item from data structure
      budgetCtrl.deleteItem(type, ID);
      // delete the item from the UI

      // update and show the new budget

    }
  };

  return {
    init : function(){
      console.log("Started!");
      UICtrl.displayBudget({
        budget : 0,
        totalInc : 0,
        totalExp : 0,
        percentage : -1
      });
      setupEventListener();
    }
  };


})(budgetController, UIController);

controller.init();
