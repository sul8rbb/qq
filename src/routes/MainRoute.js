import recommend from "../pages/recommend/recommend"
import toplist from "../pages/topList/topList"
import search from "../pages/search/search"

const routes = [
    {
        path: '/main/recommend',
        component: recommend
    },
    {
        path: '/main/toplist',
        component: toplist
    },
    {
        path: '/main/search',
        component: search
    },
    {
        path: '*',
        redirect: '/main/recommend'
    }
]

export default routes;