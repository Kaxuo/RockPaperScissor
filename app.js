class Calculator {
    // the paremeters here are just " where do we put the previous operant and current one "
    // facon don't l'objet sera créé / moule , objet = cake , objet aura forme du moule
    constructor(previousOperandButtons, currentOperandButtons) {
        this.previousOperandButtons = previousOperandButtons
        this.currentOperandButtons = currentOperandButtons
        this.clear()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        // so that operation is selected when they clear 
        this.operation = ''
    }

    delete() {
        // second to last number (-1)
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        //  string or else, it will just "add" + , and not put behind , we want them to be appended , not added
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        // if no number has been selected, return will make you not do it 
        // dans un tableau qui contient tous les character d'operation , return la position de celui que tu donne en parametre => ex dernier operateur est / => return [1] , si pas dans le tableau , ce sera -1
        if (["*","/","+","-"].indexOf(this.currentOperand[this.currentOperand.length(-1)]))  
        // check substrings 
        if (this.currentOperand === "") return
        // this line , if something is in previous operation, it will "compute "
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        // result of the operation ! the computation result , we use parseFloat , to convert string to number
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // if we dont have value value , we cancel the function with return
        if (isNaN(prev) || isNaN(current)) return
        // this.operation = those case 
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            // anytime, none of these values are selected , invalind => return , it wont do any "computation "
            default:
                return
        }
        this.currentOperand = computation
        this.operation = ''
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandButtons.innerText = this.currentOperand
        this.previousOperandButtons.innerText = `${this.previousOperand} ${this.operation}`
    }
}




const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButtons = document.querySelector("[data-equals]")
const deleteButtons = document.querySelector("[data-delete]")
const allClearButtons = document.querySelector("[data-all-clear]")
const previousOperandButtons = document.querySelector("[data-previous-operand]")
const currentOperandButtons = document.querySelector("[data-current-operand]")

// object calculator
const calculator = new Calculator(previousOperandButtons, currentOperandButtons)

// calculator + fonction => executer fonction A PARTIR de calculator et non SUR calculator 

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        // number added to the const calculator, but does not display 
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButtons.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})