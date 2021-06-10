import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { routeNames } from "@/utility";
import AdminGallery from "@/modules/admin-gallery/AdminGallery.vue";
import AdminLogin from "@/modules/admin-login/AdminLogin.vue";
import AdminOverview from "@/modules/admin-overview/AdminOverview.vue";
import ClientGallery from "@/modules/client-gallery/ClientGallery.vue";
import ClientLogin from "@/modules/client-login/ClientLogin.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/:catchAll(.*)",
        redirect: routeNames.adminLogin,
    },
    {
        path: routeNames.adminLogin,
        name: "Admin Login",
        component: AdminLogin,
    },
    {
        path: routeNames.adminGallery,
        name: "Admin Gallery",
        component: AdminGallery,
    },
    {
        path: routeNames.adminOverview,
        name: "Admin Overview",
        component: AdminOverview,
    },
    {
        path: routeNames.clientGallery,
        name: "Client Gallery",
        component: ClientGallery,
    },
    {
        path: routeNames.clientLogin,
        name: "Client Login",
        component: ClientLogin,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
