import React, { useEffect, useState } from 'react';
import Screen from './components/Screen/Screen';
import Button from './components/Button/Button';
import PastListTag from './components/PastListTag/PastListTag';

function Calculator() {

    const [curr, setCurr] = useState('');
    const [expression, setExpression] = useState('');
    const [pastList, setPastList] = useState([]);

    useEffect(() => {
        const historical = JSON.parse(localStorage.getItem('react-calculator'));
        if (historical) return setPastList(historical);
    }, [])

    useEffect(() => {
        if (pastList.length > 0) {
            if (expression.length > 0) setTimeout(() => clear(), 2000);
            localStorage.setItem('react-calculator', JSON.stringify(pastList))
        }
    }, [pastList])

    function buttonView() {
        const keys = [
            ['C', '←', 'x²', '/'],
            [7, 8, 9, 'X'],
            [4, 5, 6, '+'],
            [1, 2, 3, '-'],
            ['.', 0, '=']
        ];
        return (
            keys.map((a, b) => {
                return a.map((c, d) => {
                    return (<Button key={`${c.toString()}`} char={c} onKeyDown={handleKeyboard} onClick={handleClick} />)
                })
            })
        )
    }

    function clear() {
        setCurr('');
        return setExpression('');
    }

    function handleKeyboard(event) {
        const key = event.keyCode;
        if (key === 48 || key === 96) return handleClick(0);
        if (key === 49 || key === 97) return handleClick(1);
        if (key === 50 || key === 98) return handleClick(2);
        if (key === 51 || key === 99) return handleClick(3);
        if (key === 52 || key === 100) return handleClick(4);
        if (key === 53 || key === 101) return handleClick(5);
        if (key === 54 || key === 102) return handleClick(6);
        if (key === 55 || key === 103) return handleClick(7);
        if (key === 56 || key === 104) return handleClick(8);
        if (key === 57 || key === 105) return handleClick(9);
        if (key === 110 || key === 188 || key === 190 || key === 194) return handleClick('.');
        if (key === 8) return handleClick('←');
        if (key === 13) return handleClick('=');
        if (key === 107) return handleClick('+');
        if (key === 109) return handleClick('-');
        if (key === 111) return handleClick('/');
    }

    function handleClick(char = '') {
        if (char === 'C') return clear();

        let flag = true;
        if (typeof char !== 'number') {
            if (expression.length === 0) return flag = false;

            if (expression[expression.length - 1] === '.') return flag = false;

            if (char === 'x²') {
                let current = Number(curr);
                setExpression(expression.slice(0, expression.length - curr.toString().length) + curr + 'X' + curr)
                return setCurr(current * current)
            }

            for (let i of ['+', '-', '/', 'X']) {
                if (expression[expression.length - 1] === i) return flag = false;
                else flag = true;
            }
        }
        if (!flag) return;

        if (typeof char === 'number') {
            if (expression[expression.length - 1] === '/'
                || expression[expression.length - 1] === 'X'
                || expression[expression.length - 1] === '+'
                || expression[expression.length - 1] === '-')
                setCurr(char);
            else setCurr(prevState => prevState + char.toString());
        } else {
            if (char !== '.' && Number(expression[expression.length - 1]) !== NaN) setCurr(eval(expression.replaceAll('X', '*')));
            if (char === '.') {
                setCurr(curr + char);
            }
        }

        if (char === '←') {
            if (expression[expression.length - 1] === '/'
                || expression[expression.length - 1] === 'X'
                || expression[expression.length - 1] === '+'
                || expression[expression.length - 1] === '-')
                setExpression(prevState => prevState.slice(0, -1));
            else {
                setCurr(prevState => prevState.toString().slice(0, -1));
                setExpression(prevState => prevState.toString().slice(0, -1));
            }
        }
        else setExpression(prevState => prevState + char);

        if (char === '=') {
            const result = eval(expression.replaceAll('X', '*'));
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
        return setPastList(prevState => {
            const itemAlreadyExists = prevState.some(pastItem => {
                return pastItem.date === item.date && pastItem.expression === item.expression;
            });

            if (itemAlreadyExists) {
                return prevState;
            }

            return [...prevState, item];
        });
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
            {
                pastList && pastList.length > 0
                    ? <PastListTag info={pastList} />
                    : <React.Fragment></React.Fragment>
            }
        </main>
    )
}

export default Calculator;