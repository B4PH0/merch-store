import { Application } from 'express';

export function listRoutes(app: Application): Array<string> {
    const routes: Array<string> = [];

    const addRoutes = (prefix: string, layer: any) => {
        if (layer.route) {
            const route = layer.route;
            const methods = Object.keys(route.methods).filter(
                (method) => method !== '_all'
            );
            methods.forEach((method) => {
                routes.push(`${prefix}${route.path} - ${method.toUpperCase()}`);
            });
        } else if (layer.name === 'router' && layer.handle.stack) {
            layer.handle.stack.forEarch((stackItem: any) => {
                addRoutes(`${prefix}${layer.regexp}`, stackItem);
            })
        };
    };
    app._router.stack.forEach((stackItem: any) => {
        addRoutes('', stackItem);
    })
    return routes;
};
