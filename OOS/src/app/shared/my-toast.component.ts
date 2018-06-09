import { Component, OnInit, NgModule } from "@angular/core";
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { Toast } from "angular2-toaster/src/toast";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToasterConfig } from "angular2-toaster/src/toaster-config";
@Component({
    selector: 'my-toast',
    template: `
        <toaster-container [toasterconfig]="config" > </toaster-container>
        <button type="button" (click)="popToast()"> pop toast </button>
        <button type="button">Click Me!</button>
    `,
    styleUrls: []
})
export class MyToastComponent  {
    private toasterService: ToasterService;

    constructor(toasterService: ToasterService) {
      this.toasterService = toasterService;
    }
    public config: ToasterConfig = 
    new ToasterConfig({
        showCloseButton: true, 
        tapToDismiss: false, 
        timeout: 0
    });

    popToast() {
        var toast: Toast = {
          type: 'info',
          title: 'Here is a Toast Title',
          body: 'Here is a Toast Body',
          showCloseButton: true,
          clickHandler: (t, isClosed): boolean => {
            console.log('i am clicked..', isClosed, t);
            
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                // window.scrollTo(0, 0);
                // document.body.scrollTop();

            
            // got clicked and it was NOT the close button!
            if (!isClosed) {
              
            }
            
            return true; // remove this toast !
          }
        };
        
        this.toasterService.pop(toast);
      }
}
@NgModule({
    imports: [BrowserAnimationsModule,ToasterModule],
    exports: [MyToastComponent],
    declarations: [MyToastComponent],
    bootstrap: [MyToastComponent],

    providers:[ToasterService]
})
export class MyToastModule { }
