function eval() {
    return;
}

function spaceMaker(expr) {
   return expr.match(/\d+|\S/g)
}

function isNumber(char) {
    return char !== undefined && /^[0-9]+$/.test(char)
}

function expressionCalculator(expr) {

    let tokens = spaceMaker(expr);
    let position = 0;

    function getElem() {
        return tokens[position];
    }

    function nextElem() {
        position++;
    }

    function basicCalculate() {
        let calcExpr = multCalculate();
        let temp = getElem();

        while (temp === '+' || temp === '-') {
            nextElem();
            let right = multCalculate();
            calcExpr = {type: temp, left: calcExpr, right: right};
            temp = getElem();
        }

        return calcExpr;
    }

    function multCalculate() {
        let calcExpr = simpleCalculate();
        let temp = getElem();

        while (temp === '*' || temp === '/') {
            nextElem();
            let right = simpleCalculate();
            calcExpr = {type: temp, left: calcExpr, right: right};
            temp = getElem();
        }

        return calcExpr;
    }

    function simpleCalculate() {
        let temp = getElem();

        if(isNumber(temp)) {
            nextElem();
            return {type: 'number', value: temp}
        } else if (temp === '(') {
            nextElem();
            let calcExpr = basicCalculate();
            if(getElem() !== ')') {
                throw new SyntaxError("ExpressionError: Brackets must be paired");
            }
            nextElem();
            return calcExpr;
        } else {
            throw new SyntaxError('sosiska')
        }
    }

    let result = basicCalculate();

    if (position !== tokens.length)
        throw new SyntaxError("ExpressionError: Brackets must be paired");

    function flatting(object) {
        switch(object.type){
            case 'number' : return parseInt(object.value);
            case '+' : return flatting(object.left) + flatting(object.right);
            case '-' : return flatting(object.left) - flatting(object.right);
            case '*' : return flatting(object.left) * flatting(object.right);
            case '/' :
                if (flatting(object.right) === 0) {
                    throw new TypeError("TypeError: Division by zero.")
                }
                return flatting(object.left) / flatting(object.right);
        }
    }

    return flatting(result);
}

module.exports = {
    expressionCalculator
}
