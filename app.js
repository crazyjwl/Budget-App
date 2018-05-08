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

  var data = {
    allItems :{
      inc : [],
      exp : []
    },
    totals : {
      inc : 0,
      exp : 0
    }
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
    inputBtn : '.add_btn'
  }

  return {
    getInput : function(){
      return {
        type : document.querySelector(DOMStrings.inputType).value, //this will be either inc or exp
        description : document.querySelector(DOMStrings.inputDescription).value,
        value : document.querySelector(DOMStrings.inputValue).value
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

    document.querySelector(DOM.inputBtn).addEventListener('click', crtlAddItem);
    document.addEventListener('keypress', function(e){
      if (e.keyCode === 13 || e.witch === 13) {
        crtlAddItem();
      }
    });
  };



  var crtlAddItem = function(){
    var input, newItem;

    //1. Get the field input data
    input = UICtrl.getInput();

    //2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. Add the item into the UI

    //4. Calculate the budget

    //5. Display the budget on the UI

  }

  return {
    init : function(){
      console.log("Started!");
      setupEventListener();
    }
  };


})(budgetController, UIController);

controller.init();
