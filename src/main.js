import { createRouter, createWebHashHistory } from 'vue-router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import { VueSweetalert2 } from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

///FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar as solidStar, faChartColumn as solidChart} from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar} from '@fortawesome/free-regular-svg-icons'
import { faArrowUpLong as arrowUp} from '@fortawesome/free-solid-svg-icons'
import { faArrowDownLong as arrowDown} from '@fortawesome/free-solid-svg-icons'

///Notiwind
import Notifications from 'notiwind'

import App from './App.vue'
import SignUp from "./components/user/SignUp.vue"
import LogIn from "./components/user/LogIn.vue"
import DashBoard from "./components/DashBoard.vue"
import VueLazyLoad from 'vue3-lazyload'
import 'flowbite';
import './index.css'

/* add icons to the library */
library.add(solidStar, solidChart, regularStar, arrowUp, arrowDown)

// 1. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.

const routes = [
    { path: '/sign-up/', name: 'sign-up', component: SignUp,},
    { path: '/log-in/', name: 'log-in', component: LogIn },
    { path: '/dash-board/', name: 'dash-board', component: DashBoard },
]

// 2. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })
  
const pinia = createPinia()
const app = createApp(App)

app.component(
    'font-awesome-icon', FontAwesomeIcon,
    'SignUp', SignUp,
    'LogIn', LogIn,
    'DashBoard', DashBoard
);

app.use(router).use(pinia).use(MotionPlugin).use(VueLazyLoad).use(Notifications).use(VueSweetalert2).mount("#app")


