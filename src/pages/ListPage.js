import ShowPost from "../components/showPost";
const ListPage = () => {
    //기본으로 보여지는 ui
    return(
        <div>
            <div className="d-flex justify-content-between">
                <h1>Blogs</h1>
            </div>
            <ShowPost/>
        </div>
    )
};
export default ListPage;