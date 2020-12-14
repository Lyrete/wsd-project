import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e);
    }
  }

  const requestTimingMiddleware = async({ request, session }, next) => {
    
    await next();
    
    let id = await session.get('loggedUser');

    if(!id){
        id = 'anonymous'
    }

    console.log(`${new Date()}: ${request.method} ${request.url.pathname}`);
    console.log(`Request made by user with id ${id}`)
    
  }

  const authMiddleware = async({request, response, session}, next) => {
        
    if(request.url.pathname === '/favicon.ico'){
        response.status = 404;        
    }else if(!(request.url.pathname === '/' || request.url.pathname.startsWith('/api') || request.url.pathname.startsWith('/auth/')) && !(await session.get('loggedUser'))){
        //redirect requests that aren't allowed by non-authed users
        response.redirect('/auth/login');
    } else {
      await next();
    }
  };

const serveStaticFiles = async (context, next) => {
    if (context.request.url.pathname.startsWith('/static')) {
      const path = context.request.url.pathname.substring(7);
  
      await send(context, path, {
        root: `${Deno.cwd()}/static`
      });
  
    } else {
      await next();
    }
}

export { errorMiddleware, authMiddleware, requestTimingMiddleware, serveStaticFiles };