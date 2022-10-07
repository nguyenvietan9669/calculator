import classnames from 'classnames/bind'
import styles from './Main.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons'

import Button from "../../components/Button";
import { useState } from 'react';
import clickAudio from '../../assets/click.mp3'


const cx = classnames.bind(styles)

function Main() {
    const myArr = ['+','-','x','/',0,1,2,3,4,5,6,7,8,9,'AC','.','=']
    const [number1,setNumber1] = useState('')
    const [number2,setNumber2] = useState('')
    const [calculation,setCalcullation] = useState()
    const [isResult,setIsResult] = useState(false)
    const [result,setResult] = useState(null)

    const reset = () => {
        setIsResult(false)
        setNumber2('')
        setResult(null)
    }

    const handleClick = (e) => {
        const audio = new Audio(clickAudio)
        audio.play()
        if(e.target.innerText === '=')
        {
            if(number1 !== null && number2 && calculation){
                if(calculation === '+'){
                    const total =  parseFloat(number1) +  parseFloat(number2) 
                    setResult(total)
                }
                if(calculation === '-'){
                    const total =  parseFloat(number1) -  parseFloat(number2) 
                    setResult(total)

                }
                if(calculation === 'x'){
                    const total =  parseFloat(number1) *  parseFloat(number2) 
                    setResult(total)
                }
                if(calculation === '/'){
                    if(number2 === '0')
                    {
                        return
                    }
                    const total =  parseFloat(number1) / parseFloat(number2) 
                    setResult(total)
                }
                setIsResult(true)
            }
        }

        if(e.target.innerText === 'AC')
        {
            setNumber1('')
            setCalcullation('')
            reset()
        }

        if(e.target.className.includes('isCalculation'))
        {
            if(result !== null || result === 0){
                setCalcullation(e.target.innerText)
                setNumber1(result)
                reset()
            }else if(number1){
                setCalcullation(e.target.innerText)
            }
        }

        if(e.target.className.includes('isNumber') || e.target.innerText === '.'){
           if(!calculation){
            setNumber1(prev => {
                return prev + e.target.innerText
            })
           }else if(!result) {
            setNumber2(prev => {
                return prev += e.target.innerText
            })
           }
       }
    }

    const handleDelete = () => {
        if(!isResult){
            if(calculation){
                setNumber2(prev => {
                    return prev.slice(0,-1)
                })
            }else {
                setNumber1(prev => {
                    return prev.slice(0,-1)
                })
            }
        }
    }

    return ( <div className={cx('wrapper')} >
        <div className={cx('screen')}>
            <div className={cx('number1')}>
                {number1}
            </div>
            <div className={cx('calculation')}>
                {calculation}
            </div>
            <div className={cx('number2')}>
                {number2}
            </div>
            <div className={cx('equal')}>
                {isResult ? '=' : ''}
            </div>
            <div className={cx('result')}>
                {result}
            </div>
        </div>
       <div className={cx('keyboard')}>
         {myArr.map((item,index) => {      
             return <Button
                         key={index}
                         isEqual = {item === '=' ? true : false} 
                         isNumber = {typeof item === 'number' ? true : false}
                         isCalculation = {['+','-','x','/'].includes(item) ? true : false}
                         onClick = {handleClick}
                     >
                         {item}
                     </Button>
         })}
         <Button  className={cx('delete')} onClick = {handleDelete}>
            <FontAwesomeIcon icon={faDeleteLeft}/>
        </Button>
       </div>
    </div> );
}

export default Main;