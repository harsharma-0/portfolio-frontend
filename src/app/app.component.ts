import { Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { filter } from 'rxjs';
import { PortfolioStore } from './core/services/portfolio.store';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BackTopComponent, ToastComponent } from './shared/components/ui.components';

@Component({selector:'app-root',standalone:true,imports:[RouterOutlet,NavbarComponent,FooterComponent,ToastComponent,BackTopComponent],templateUrl:'app.component.html',styleUrl:'app.component.scss'})
export class AppComponent {
  private readonly destroyRef=inject(DestroyRef);
  private animationContext?:gsap.Context;
  constructor(store:PortfolioStore,router:Router){
    store.load();
    afterNextRender(()=>{
      if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      gsap.registerPlugin(ScrollTrigger);
      const animate=()=>requestAnimationFrame(()=>{
        this.animationContext?.revert();
        this.animationContext=gsap.context(()=>gsap.utils.toArray<HTMLElement>('.section-heading,.panel').forEach(element=>gsap.from(element,{y:20,opacity:0,duration:.55,ease:'power2.out',clearProps:'transform,opacity',scrollTrigger:{trigger:element,start:'top 90%',once:true}})));
      });
      animate();
      router.events.pipe(filter(event=>event instanceof NavigationEnd),takeUntilDestroyed(this.destroyRef)).subscribe(animate);
      this.destroyRef.onDestroy(()=>this.animationContext?.revert());
    });
  }
}
