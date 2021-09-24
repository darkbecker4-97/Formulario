let IagoValidator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        IagoValidator.clearErros();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = IagoValidator.checkInput(input);
            if (check !== true) {
                send = false;
                IagoValidator.showError(input, check);
                //exibir o erro
            }
        }

        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo obrigatório.';
                        }
                        break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'Mínimo ' + rDetails[1] + ' caracteres';
                        }
                        break;
                    case 'email':
                        if (input.value != '') {
                            let regex = /\S+@\S+\.\S+/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail não é válido!';
                            }
                        }
                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErros: () => {
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};


let form = document.querySelector('.iagoValidator');
form.addEventListener('submit', IagoValidator.handleSubmit);
