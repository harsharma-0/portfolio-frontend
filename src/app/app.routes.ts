import { Routes } from '@angular/router';
export const routes:Routes=[
 {path:'',loadComponent:()=>import('./features/home/home.component').then(m=>m.HomeComponent),title:'Harsh Vishwakarma — Python & Angular Developer'},
 {path:'projects',loadComponent:()=>import('./features/projects/projects.component').then(m=>m.ProjectsComponent),title:'Projects'},
 {path:'projects/:slug',loadComponent:()=>import('./features/project-detail/project-detail.component').then(m=>m.ProjectDetailComponent)},
 {path:'skills',loadComponent:()=>import('./features/skills/skills.component').then(m=>m.SkillsComponent),title:'Skills'},
 {path:'experience',loadComponent:()=>import('./features/experience/experience.component').then(m=>m.ExperienceComponent),title:'Experience'},
 {path:'services',loadComponent:()=>import('./features/services/services.component').then(m=>m.ServicesComponent),title:'Services'},
 {path:'api-lab',loadComponent:()=>import('./features/api-lab/api-lab.component').then(m=>m.ApiLabComponent),title:'API Lab'},
 {path:'contact',loadComponent:()=>import('./features/contact/contact.component').then(m=>m.ContactComponent),title:'Contact'},
 {path:'**',loadComponent:()=>import('./features/not-found/not-found.component').then(m=>m.NotFoundComponent),title:'Page not found'}];
