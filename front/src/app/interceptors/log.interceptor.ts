import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { Article } from '../interfaces/article';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('log interceptor', req);

  const modifiedReq = req.clone({
    headers: req.headers.set('toto', `titi`),
  });
  return next(modifiedReq).pipe(
    map((res) => {
      console.log('res: ', res);
      if (
        res instanceof HttpResponse &&
        req.method === 'GET' &&
        req.url === '/api/articles'
      ) {
        console.log('ok');
        const newRes = res.clone({
          body: [
            ...(res.body as Article[]).map((a) => {
              return { ...a, price: a.price * 2 };
            }),
            // { id: 'a1', name: 'rere', price: 1.99, qty: 100 },
          ],
        });
        return newRes;
      }
      return res;
    })
  );
};
