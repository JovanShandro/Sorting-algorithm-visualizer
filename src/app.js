import Vue from 'vue';
import App from './components/App.vue';
import './style.css';
 
new Vue({
    render: (el) => el(App)
}).$mount('#app');