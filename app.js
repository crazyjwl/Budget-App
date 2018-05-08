/**
* BUDGET CONTROLLER
**/
var budgetController = (function() {


})();

/**
* UI CONTROLLER
**/
var UIController = (function() {


})();

/**
* GLOBAL APP CONTROLLER
**/

var controller = (function(bugetCtrl, UICtrl) {

  var crtlAddItem = function(){

    //1. Get the field input data

    //2. Add the item to the budget controller

    //3. Add the item into the UI

    //4. Calculate the budget

    //5. Display the budget on the UI

  }

  document.querySelector('.add_btn').addEventListener('click', crtlAddItem);
  document.addEventListener('keypress', function(e){
    if (e.keyCode === 13 || e.witch === 13) {
      crtlAddItem();
    }
  });

})(budgetController, UIController);
