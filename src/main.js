import { createRouter, createWebHashHistory } from 'vue-router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import SignUp from "./components/SignUp.vue"
import LogIn from "./components/LogIn.vue"
import GetPkmns from "./components/TasksPkmn.vue"
import 'flowbite';
import './index.css'
import './pkmn-list.scss'

// 1. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.

const routes = [
    { path: '/sign-up/', component: SignUp },
    { path: '/log-in/', component: LogIn },
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
    'SignUp', SignUp,
    'LogIn', LogIn,
    'GetPkmns', GetPkmns
);

app.use(router).use(pinia).mount("#app")


