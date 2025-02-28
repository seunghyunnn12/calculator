document.addEventListener('DOMContentLoaded', function () {

    const screen = document.querySelector('#display')
    const btns = document.querySelectorAll('#buttons button')

    let expression = ''



    btns.forEach(btn => {
        btn.addEventListener('click', () => handleInput(btn.textContent))
    })

    function handleInput(val) {

        const lastChar = expression.slice(-1)
        if (isNumberOrDot(val)) {
            appendToExpression(val)
        } else if (isOpertaor(val)) {
            if (!isOpertaor(lastChar))
                appendToExpression(val)
        } else if (val === 'C') {
            clearExpression()
        } else if (val === '=') {
            calculateResult()
        }
    }

    //숫자인지 확인하는 함수
    function isNumberOrDot(val) {
        return !isNaN(val) || val === '.'
    }

    function isOpertaor(val) {
        return "+-*/".includes(val)
    }

    function appendToExpression(val) {
        expression += val
        screen.value = expression
    }

    //'C' 버튼누르면 초기화하는거
    function clearExpression() {
        expression = ''
        screen.value = '0'
    }

    function calculateResult() {
        try {
            const result = eval(expression)
            if (isFinite(result)) {
                expression = String(result)
                screen.value = expression
            } else {
                throw new Error('계산오류입니다')
            }
        } catch {
            clearExpression()
            screen.value = "Error"
        }

    }
})