import React, { useEffect, useState } from 'react';
import Screen from './components/Screen/Screen';
import Button from './components/Button/Button';

function Calculator() {

    const [curr, setCurr] = useState('');
    const [expression, setExpression] = useState('');

    function buttonView() {
        const keys = [
            ['C', '←', 'x²', '/'],
            [7, 8, 9, 'X'],
            [4, 5, 6, '+'],
            [1, 2, 3, '-'],
            [',', 0, '=']
        ];
        return (
            keys.map((a, b) => {
                return a.map((c, d) => {
                    return (<Button key={`${c.toString()}`} char={c} onClick={handleClick} />)
                })
            })
        )
    }

    function handleClick(char) {
        if (char === 'C') {
            setCurr('');
            return setExpression('');
        }
        
        if (typeof char === 'number') {
            if (expression[expression.length - 1] === '/'
                || expression[expression.length - 1] === 'X'
                || expression[expression.length - 1] === '+'
                || expression[expression.length - 1] === '-')
                setCurr(char);
            else setCurr(prevState => prevState + char.toString());
        }
                
        if (char === '←') {
            if (expression[expression.length - 1] === '/'
                || expression[expression.length - 1] === 'X'
                || expression[expression.length - 1] === '+'
                || expression[expression.length - 1] === '-')
                setExpression(prevState => prevState.slice(0, -1));
            else {
                setCurr(prevState => prevState.slice(0, -1));
                setExpression(prevState => prevState.slice(0, -1));
            }
        }
        else setExpression(prevState => prevState + char);
    }

    return (
        <main>
            <div className='Screen'>
                <Screen curr={curr} expression={expression} />
            </div>
            <div className='keyboard'>
                <div className='keys'>
                    {buttonView()}
                </div>
            </div>
        </main>
    )
}

export default Calculator;