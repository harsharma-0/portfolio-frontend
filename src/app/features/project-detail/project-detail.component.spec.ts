import { signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Project } from '../../core/models/portfolio.models';
import { ApiService } from '../../core/services/api.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { NotificationService } from '../../core/services/notification.service';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { SeoService } from '../../core/services/seo.service';
import { ProjectDetailComponent } from './project-detail.component';

describe('ProjectDetailComponent loading',()=>{
  it('renders the unwrapped project after the request completes while paramMap remains active',()=>{
    const project={slug:'amazon-q-cost-analytics-assistant',title:'Amazon Q Cost Analytics Assistant',summary:'Summary'} as Project;
    const route={paramMap:of(convertToParamMap({slug:project.slug}))} as ActivatedRoute;
    const api={project:()=>of(project)} as unknown as ApiService;
    const local={comments:()=>[]} as unknown as LocalStorageService;
    const seo={set:()=>undefined} as unknown as SeoService;
    const component=new ProjectDetailComponent(route,api,new FormBuilder(),local,{} as NotificationService,seo,{data:signal(null)} as unknown as PortfolioStore);

    expect(component.loading()).toBeFalse();
    expect(component.project()).toBe(project);
    expect(component.error()).toBe('');
  });
});
