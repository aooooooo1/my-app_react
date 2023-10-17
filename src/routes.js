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
    component: HomePage
  },
  {
    path:'/admin',
    component: AdminPage,
    admin : true
  },
  {
    path:'/blogs',
    component: ListPage
  },
  {
    path:'/blogs/create',
    component: CreatePage,
    admin : true
  },
  {
    path:'/blogs/:id/edit',
    component: EditPage,
    admin : true
  },
  { //게시글 클릭시 상세페이지,하지만 :id 부분에는 어떤것도 
    //들어올수있다.(create가 들어올수있음)그래서 맨밑으로 이동한다.
    path:'/blogs/:id',
    component: ShowPage
  },
  {
    path:'*',
    component: NotFoundPage
  }
];
export default routes;