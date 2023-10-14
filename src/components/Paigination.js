import propTypes from 'prop-types'

//  numberOfPages=페이지 갯수
const Paigination = ({currentPage , numberOfPages, onClickGetPosts, limit})=>{
    
    const CurSet = Math.ceil(currentPage/limit);//세트구함
    const countSet = Math.ceil(numberOfPages/limit);
    const startPage = limit * (CurSet -1 ) + 1; //시작할때 페이지 넘버구함 1,6,11 ...
    const numberOfPagesForSet = CurSet === countSet ? numberOfPages%limit : limit;
    return(
        <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            {CurSet !== 1 && <li className="page-item">
                <div className="page-link cursor-pointer" onClick={()=>onClickGetPosts(startPage-limit)}>Previous</div>
                </li>}
            {Array(numberOfPagesForSet).fill(startPage).map((value,index)=>value+index)    
                .map((pageNumber)=>{
                    return <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                <div className="page-link cursor-pointer" onClick={()=>{
                                    onClickGetPosts(pageNumber);
                                }}>{pageNumber}</div>
                            </li> 
                })}
            {CurSet !== countSet && <li className="page-item">
            <div className="page-link cursor-pointer" onClick={()=>onClickGetPosts(startPage+limit)}>Next</div>
            </li>}
        </ul>
        </nav>
    )
}
Paigination.propTypes = {
    currentPage : propTypes.number,
    numberOfPages : propTypes.number.isRequired,
    limit: propTypes.number
}
Paigination.defaultProps = {
    currentPage : 1, 
    limit: 5
}
export default Paigination;