import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import StudentListView from '../views/StudentListView.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import EventFormView from '@/views/event/EventFormView.vue'
import OrganizerFormView from '@/views/event/OrganizerFormView.vue'
import OrganizerListView from '@/views/OrganizerListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ 
        page: parseInt((route.query?.page as string) || '1'),
        pageSize: parseInt((route.query.pageSize as string) || '2')
      })
    },
    {
      path: '/organizers',
      name: 'organizer-list-view',
      component: OrganizerListView,
      props: (route) => ({ 
        page: parseInt((route.query?.page as string) || '1'),
        pageSize: parseInt((route.query.pageSize as string) || '2')
      })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: EventFormView
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: OrganizerFormView
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    },
    {
      path: '/students',
      name: 'student-list-view',
      component: StudentListView
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        // put API call here
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEventById(id)
        .then((response) => {
          //need to setup the data for the event
          eventStore.setEvent(response.data)
        }).catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: '404-resource-view',
              params: { resource: 'event' }
            }
          } else {
            return { name: 'network-error-view' }
          }
        })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true
        },
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
