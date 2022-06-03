

const keys = document.querySelector('.calculator-buttons');
    keys.addEventListener('click', event => {
        const {target} = event;
        const {value} = target;
        if (!target.matches('button')) {
            return;
        } else {
            calculator.parseInput(value)
        }
    })

const calculator = {
    displayText: '0',
    prevTotal: null,

    parseInput(value) {
        if(this.displayText === '0'){
            this.displayText = ''
        }
        switch(value) {
            case '=' : 
                this.calcAnswer(this.displayText)
                break;
            case 'AC':
                this.clearAll()
                break;
            case '.' : 
                this.addDecimal(value)
                break;
            default: 
                this.addText(value)
                // break;
        }
    },

    addDecimal(value){
        if(this.displayText === '0'){
            this.addText('0.')
        } else if(this.prevTotal !== null || this.displayText.endsWith(value)){
            return
        } else if (this.displayText.endsWith('-') || this.displayText.endsWith('+') || this.displayText.endsWith('/') || this.displayText.endsWith('*')){
            this.displayText += '0.'
        } else if ((this.displayText.includes(value)) && !(this.displayText.includes('-') || this.displayText.includes('+') || this.displayText.includes('/') || this.displayText.includes('*'))) {
            return
        } else if(this.displayText.includes('-') || this.displayText.includes('+') || this.displayText.includes('/') || this.displayText.includes('*')){
                const regex = /[/*-+]/
                let separate = this.displayText.split(this.displayText.match(regex)[0])
                if(separate[1].includes(value)){
                    return
                } else {
                    this.addText(value)
                }
        }  
        else {
            this.addText(value)
        }
        
    },

    addText(value) {
        if(this.displayText === '0'){
            this.displayText = ''
        } else if(this.prevTotal !== null){
            this.displayText = this.prevTotal
            this.prevTotal = null
        }
        if(isNaN(+(value)) && isNaN(this.displayText)){
            if(isNaN(this.displayText.slice(-1))){
                return;
            }
        }
        this.displayText += value
        this.outputText(this.displayText)
    },
    
    outputText(text){
        document.querySelector('.calculator-screen').value = text
    },

    calcAnswer(equation){
        let result = Function("return " + equation)().toFixed(5)
        !(this.displayText == 0) && this.outputText(result)
        this.prevTotal = result
    }, 

    clearAll() {
        this.displayText = '0',
        this.prevTotal = null,
        this.outputText(this.displayText)
    }

}

