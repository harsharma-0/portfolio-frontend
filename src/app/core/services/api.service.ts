import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../config/environment';
import { Achievement, ApiResponse, ContactRequest, Experience, FeedbackRequest, JsonInspection, Portfolio, Profile, Project, ProjectFilters, Service, Skill, TextAnalysis, TransformRequest, TransformResult } from '../models/portfolio.models';
@Injectable({providedIn:'root'}) export class ApiService {
  constructor(private http:HttpClient){}
  private get<T>(path:string,params?:HttpParams){return this.unwrap(this.http.get<ApiResponse<T>>(`${environment.apiUrl}${path}`,{params}))}
  private post<T>(path:string,body:unknown){return this.unwrap(this.http.post<ApiResponse<T>>(`${environment.apiUrl}${path}`,body))}
  private unwrap<T>(source:Observable<ApiResponse<T>>):Observable<T>{return source.pipe(map(response=>{if(!response?.success||response.data===undefined)throw new Error(response?.message||'Invalid API response');return response.data}))}
  profile(){return this.get<Profile>('/profile')} portfolio(){return this.get<Portfolio>('/portfolio')}
  projects(filters:ProjectFilters={}){let p=new HttpParams();Object.entries(filters).forEach(([k,v])=>{if(v!==undefined&&v!==''&&v!==null)p=p.set(k,String(v))});return this.get<Project[]>('/projects',p)}
  project(slug:string){return this.get<Project>(`/projects/${encodeURIComponent(slug)}`)} skills(){return this.get<Skill[]>('/skills')} experience(){return this.get<Experience[]>('/experience')} services(){return this.get<Service[]>('/services')} achievements(){return this.get<Achievement[]>('/achievements')}
  contact(body:ContactRequest){return this.post<{delivery:string}>('/contact',body)} feedback(body:FeedbackRequest){return this.post<{delivery:string}>('/feedback',body)}
  analyzeText(text:string){return this.post<TextAnalysis>('/playground/text-analysis',{text})} inspectJson(payload:object|unknown[]){return this.post<JsonInspection>('/playground/json-inspector',{payload})} transform(body:TransformRequest){return this.post<TransformResult>('/playground/data-transform',body)}
}
