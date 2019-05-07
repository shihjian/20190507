import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/HelloWorld';
import dashboard from '@/components/dashboard';
import Login from '@/components/pages/Login';
import Signout from '@/components/pages/Signout';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/orders';
import Itemdata from '@/components/pages/Itemdata';
import Homepage from '@/components/Homepage'
import CustomerOrders from '@/components/pages/CustomerOrders';
import Allproducts from '@/components/Allproducts'
import customer_checkout from '@/components/pages/customer_checkout'
import OrderInfo from '@/components/pages/OrderInfo'
import payment from '@/components/pages/payment'
import Categories from '@/components/Categories'
Vue.use(VueRouter);
export default new VueRouter({
    routes:[
    {
        path:'*',
        redirect:'/',
        
    },
    {
        path:'/login',
        name:'Login',
        component:Login,
    
    },
    {
        path:'/admin',
        name:'dashboard',
        component:dashboard,
        children:[
            {
                path:'Products',
                name:'Products',
                component:Products,
                
            },
            {
                path:'Orders',
                name:'Orders',
                component:Orders,
                meta:{requiresAuth:true},
            },

        ],
        
        
    },
    

    {
        path:'/',
        name:'home',
        component:Homepage,
        children:[
            {
                path:'/',
                name:'Allproducts',
                component:Allproducts,
            },
            {
                path: 'itemdata/:itemId',
                name: 'Itemdata',
                component:Itemdata,
            },
            {
                path: 'Categories',
                name: 'Categories',
                component:Categories,
            },

        ],
        
        
    },

    {
        path:'/customer_checkout',
        name:'customercheckout',
        component:customer_checkout,
        children:[
            {
                path:'',
                name:'OrderInfo',
                component:OrderInfo,
            },
            {
                path: 'payment/:orderId',
                name: 'Payment',
                component:payment,
            },
        ]
    },
    
    ],
});