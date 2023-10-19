import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import ShowPage from "./pages/ShowPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage"
const routes = [ //객체배열
  {
    path:'/',
    element: <HomePage/>,
  },
  {
    path:'/admin',
    element: <AdminPage/>,
    admin : true
  },
  {
    path:'/blogs',
    element: <ListPage/>,
  },
  {
    path:'/blogs/create',
    element: <CreatePage/>,
    admin : true
  },
  {
    path:'/blogs/:id/edit',
    element: <EditPage/>,
    admin : true
  },
  { //게시글 클릭시 상세페이지,하지만 :id 부분에는 어떤것도 
    //들어올수있다.(create가 들어올수있음)그래서 맨밑으로 이동한다.
    path:'/blogs/:id',
    element: <ShowPage/>,
  },
  {
    path:'*',
    element: <NotFoundPage/>,
  }
];
export default routes;