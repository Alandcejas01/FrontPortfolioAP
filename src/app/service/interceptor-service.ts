import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize, Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  constructor(private tokenService: TokenService, private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    this.spinner.show();
    let intReq = req;
    const token = this.tokenService.getToken();
    if(token != null){
      intReq = req.clone({
        headers: req.headers.set('Authorization','Bearer'+token)
      });
    }
    return next.handle(intReq).pipe(
      finalize( () => this.spinner.hide())
    );
  }
}

export const interceptorProvider = [{
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true
}];
