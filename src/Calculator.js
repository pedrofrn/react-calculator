import React, { useEffect, useState } from 'react';
import Screen from './components/Screen/Screen';
import Button from './components/Button/Button';
import { pastService } from './services/services';

function Calculator() {

    const [curr, setCurr] = useState('');
    const [expression, setExpression] = useState('');
    const [pastList, setPastList] = useState({});

    useEffect(() => {
        if (expression.length > 0) setTimeout(() => clear(), 2000);
        pastService(pastList);
    }, [pastList])

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

    function clear() {
        setCurr('');
        return setExpression('');
    }

    function handleClick(char = '') {
        if (char === 'C') return clear();

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

        if (char === '=') {
            const result = eval(expression);
            setCurr(result)
            setExpression(prevState => {
                createPastListItem(prevState + result);
                return prevState + result;
            })
        }
    }

    function createPastListItem(expression) {
        const date = new Date().toLocaleString()
        const item = {
            date: date,
            expression: expression
        };
        return setPastList(prevState => item)
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