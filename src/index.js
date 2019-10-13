function expressionCalculator(expr) {
    const priorityOperation = { 
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    const calculation = (a, b, operation) => {
        switch(operation) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': if (b !== 0) {
                return a / b;
            }
                throw Error("TypeError: Division by zero.");
            default: throw Error("Error: Incorrect operation.");
        }
    };

    let reversePolishNotation = (expr) => {
        let arrayOfExpression = [];
        const expression = expr.replace(/\s/g, '').split('');
        const expressionLength = expression.length;
       
        let number = '';
        for (let i = 0; i < expressionLength; i++) {
            if (expression[i] !== '/' && expression[i] !== '*' && expression[i] !== '+' && expression[i] !== '-' && expression[i] !== '(' && expression[i] !== ')' ) {
                number += expression[i];
            } else {
                arrayOfExpression.push(number);
                number = '';
                arrayOfExpression.push(expression[i]);
            }
        }
        arrayOfExpression.push(number);
        arrayOfExpression.filter(el => el !== '');
         
        var countOfOpenBrackets = 0;
        var countOfCloseBrackets = 0;

        for (var i = 0; i < arrayOfExpression.length; i++) {
            if (arrayOfExpression[i] == "(") {
                countOfOpenBrackets++;
            } else if (arrayOfExpression[i] == ")") {
                countOfCloseBrackets++;
            }
        }
        if (countOfOpenBrackets !== countOfCloseBrackets) {
            throw Error("ExpressionError: Brackets must be paired");
        }

        let stack = [];

        const rpn = arrayOfExpression
            .reduce((acc, el) => {
                if (Number(el) || el === '0') {
                    acc.push(el);
                }

                if (el in priorityOperation) {
                    while (stack[stack.length - 1] in priorityOperation && priorityOperation[el] <= priorityOperation[stack[stack.length - 1]])
                        acc.push(stack.pop());
                    stack.push(el);
                }

                if (el == '(') {
                    stack.push(el);
                }

                if (el == ')') {
                    while (stack[stack.length - 1] != '(')
                        acc.push(stack.pop());
                    stack.pop();
                }

                return acc;
            }, []);
        return rpn.concat(stack.reverse());     
    };
   
    const rpn = reversePolishNotation(expr);
    
    let stack = [];
    for (let i = 0; i < rpn.length; i++) {
        if (priorityOperation[rpn[i]]) {
            let temp = calculation(stack[stack.length - 2], stack[stack.length - 1], rpn[i]);
            stack.pop();
            stack.pop();
            stack.push(temp);
        } else {
            stack.push(Number(rpn[i]));
        }
    }
    return stack[0];
}

module.exports = {
    expressionCalculator
}
