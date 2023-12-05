import { HttpInterceptorFn } from '@angular/common/http';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('log interceptor', req);

  const modifiedReq = req.clone({
    headers: req.headers.set('toto', `titi`),
  });
  return next(modifiedReq);
};
