import main from "../components/main/main"
import topSongs from "../components/topSongs/topSongs"
import play from "../components/play/play"

const routes = [
    {
        path: '/main',
        component: main
    },
    {
        path: '/topSongs/:id',
        component: topSongs
    },
    {
        path: '/play/:id/:singerId/:songId',
        component: play
    },
    {
        path: '*',
        redirect: '/main'
    }
]

export default routes;