import { Injectable, signal } from '@angular/core';
export interface Notice { type:'error'|'success'|'info'; message:string }
@Injectable({providedIn:'root'}) export class NotificationService { readonly notice=signal<Notice|null>(null);private timer:number|null=null;show(message:string,type:Notice['type']='info'){this.clearTimer();this.notice.set({message,type});this.timer=window.setTimeout(()=>{this.notice.set(null);this.timer=null},5000)}clear(){this.clearTimer();this.notice.set(null)}private clearTimer(){if(this.timer!==null){clearTimeout(this.timer);this.timer=null}} }
