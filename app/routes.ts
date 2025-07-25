import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("components/login.tsx"), // → "/" yoluna denk gelir
    route("home", "routes/home.tsx"), // → "/home" yoluna denk gelir
] satisfies RouteConfig;
