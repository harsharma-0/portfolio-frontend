import { Injectable, signal } from '@angular/core';
@Injectable({providedIn:'root'}) export class LoadingService { private count=0; readonly active=signal(false); start(){this.active.set(++this.count>0)} stop(){this.count=Math.max(0,this.count-1);this.active.set(this.count>0)} }
