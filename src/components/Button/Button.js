import classnames from 'classnames/bind'
import styles from './Button.module.scss'


const cx = classnames.bind(styles)

function Button({className,children,onClick,isNumber,isEqual,isCalculation}) {
    return ( <div className={cx('wrapper',{[className]:className,isEqual,isNumber,isCalculation})} onClick = {onClick}>
        {children}
    </div> );
}

export default Button;