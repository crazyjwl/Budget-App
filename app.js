/**
* BUDGET CONTROLLER
**/
var budgetController = (function() {


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

var controller = (function(bugetCtrl, UICtrl) {

  var DOM = UICtrl.getDOMStrings();

  var crtlAddItem = function(){

    //1. Get the field input data
    var input = UICtrl.getInput();
    console.log(input);
    //2. Add the item to the budget controller

    //3. Add the item into the UI

    //4. Calculate the budget

    //5. Display the budget on the UI

  }

  document.querySelector(DOM.inputBtn).addEventListener('click', crtlAddItem);
  document.addEventListener('keypress', function(e){
    if (e.keyCode === 13 || e.witch === 13) {
      crtlAddItem();
    }
  });

})(budgetController, UIController);
