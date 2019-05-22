import Vue from 'vue'
import VueRouter from 'vue-router'
import StoryList from '@/components/StoryList'
import ShowStory from '@/components/ShowStory'
import AddStory from '@/components/AddStory'
import EditStory from '@/components/EditStory'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import firebase from 'firebase';

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
      {
        path: '/',
        name: 'StoryList',
        component: StoryList,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/show-story/:id',
        name: 'ShowStory',
        component: ShowStory,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/add-story',
        name: 'AddStory',
        component: AddStory,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/edit-story/:id',
        name: 'EditStory',
        component: EditStory,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          requiresGuest: true
        }
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup,meta: {
          requiresGuest: true
        }
      }
    ]
  })


// Nav Guard
router.beforeEach((to, from, next) => {
  console.log(to);
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;