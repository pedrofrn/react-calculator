import React, { useEffect, useState } from 'react';
import Screen from './components/Screen/Screen';
import Button from './components/Button/Button';
import PastListTag from './components/PastListTag/PastListTag';

function Calculator() {

    /*
    falta:
    - aplicar funções de todos os botões da calculadora
    - validação de botões e cálculos
    - créditos
    - responsividade e ajustes de layout
    - ver deploy
    */
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
        
        let flag = true;
        if (typeof char !== 'number') {     
            if (expression.length === 0) return flag = false;
            
            for (let i of ['+', '-','/', 'X']) {
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
            if (Number(expression[expression.length - 1]) !== NaN) setCurr(eval(expression));
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