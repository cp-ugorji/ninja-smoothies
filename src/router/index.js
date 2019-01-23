import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import AddSmoothie from '@/components/AddSmoothie';
import EditSmoothie from '@/components/EditSmoothie';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/add-smoothie',
            name: 'AddSmoothie',
            component: AddSmoothie
        },
        {
            //:smoothie_slug is a parameter
            path: '/edit-smoothie/:smoothie_slug',
            name: 'EditSmoothie',
            component: EditSmoothie
        }
    ]
})