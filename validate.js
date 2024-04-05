
function enableValidation(options){
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEls) => {
        formEls.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        // look for all inputs inside of form 
        // loop through all the inputs to see if all are valid
        // if input is not valid
        // get validation message
        // add error classs to input
        // display error message
        // disable buton
        // if all inputs are valid
        // enable button
        // reset error messages
        

    });
   
}


 const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };
  

  enableValidation(config);