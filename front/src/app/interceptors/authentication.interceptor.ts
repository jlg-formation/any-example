import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('intercept');
  const token = '123';
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(newReq);
};
