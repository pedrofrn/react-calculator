import React from 'react';
import Screen from './components/Screen/Screen';
import Button from './components/Button/Button';

function Calculator() {

    function buttonView() {
        const keys = [
            ['C', 'x²', '←', '/'],
            [7, 8, 9, 'X'],
            [4, 5, 6, '+'],
            [1, 2, 3, '-'],
            [',', 0, '=']
        ];
        return (
            <div className='row'>
                {
                    keys.map((a, b) => {
                        
                        return a.map((c, d) => {
                            return (<Button char={c} />)
                        })
                    })
                }
            </div>
        )
    }
    return (
        <main>
            <div className='Screen'>
                <Screen />
                {buttonView()}
            </div>
            <div className='keyboard'>
                <div className='row'>
                    <Button char={'C'} />
                    <Button char={'x²'} />
                    <Button char={'←'} />
                    <Button char={'/'} />
                </div>
                <div className='row'>
                    <Button char={7} />
                    <Button char={8} />
                    <Button char={9} />
                    <Button char={'X'} />
                </div>
                <div className='row'>
                    <Button char={4} />
                    <Button char={5} />
                    <Button char={6} />
                    <Button char={'+'} />
                </div>
                <div className='row'>
                    <Button char={1} />
                    <Button char={2} />
                    <Button char={3} />
                    <Button char={'-'} />
                </div>
                <div className='row'>
                    <Button char={','} />
                    <Button char={0} />
                    <Button char={'='} />
                </div>
            </div>
        </main>
    )
}

export default Calculator;