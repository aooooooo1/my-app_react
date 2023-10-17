import PropTypes from 'prop-types';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
const Card = ({title1, children, onClick1}) =>{
    const to = useSelector((state)=>{
        return state.toast.toasts;
    });
    console.log('to',to);
    return (
        <div className="card mb-3 cursor-pointer" onClick={onClick1}>
            <div className="card-body py-1">
                <div className="d-flex justify-content-between align-items-center">
                    <div>{title1}</div>
                    {children && <div>{children}</div>}
                </div>
            </div>
        </div>              
    );
};
Card.propTypes = {
    title1: PropTypes.string.isRequired, 
    children: PropTypes.element,
    onClick: PropTypes.func,
};

Card.defaultProps = {
    title1: '데이터가 넘어오지 않았습니다.',
    children: null,
    onClick: () => {},
}

export default Card;