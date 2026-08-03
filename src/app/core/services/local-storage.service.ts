import { Injectable } from '@angular/core';

export interface LocalComment { id:string;displayName:string;message:string;createdAt:string;editedAt?:string }

@Injectable({providedIn:'root'})
export class LocalStorageService {
  private readonly prefix='harsh-portfolio';
  private get storage():Storage|null { try{return typeof localStorage==='undefined'?null:localStorage}catch{return null} }
  private safeSlug(slug:string){return slug.replace(/[^a-z0-9-]/gi,'').slice(0,120)}
  liked(slug:string){try{return this.storage?.getItem(`${this.prefix}:like:${this.safeSlug(slug)}`)==='true'}catch{return false}}
  toggleLike(slug:string){const value=!this.liked(slug);try{this.storage?.setItem(`${this.prefix}:like:${this.safeSlug(slug)}`,String(value))}catch{}return value}
  comments(slug:string):LocalComment[]{
    try{
      const parsed:unknown=JSON.parse(this.storage?.getItem(`${this.prefix}:comments:${this.safeSlug(slug)}`)||'[]');
      if(!Array.isArray(parsed))return [];
      return parsed.filter(this.isComment).slice(0,100);
    }catch{return []}
  }
  saveComment(slug:string,displayName:string,message:string){const items=this.comments(slug);items.unshift({id:crypto.randomUUID(),displayName:displayName.trim().slice(0,80),message:message.trim().slice(0,1000),createdAt:new Date().toISOString()});this.write(slug,items)}
  editComment(slug:string,id:string,message:string){this.write(slug,this.comments(slug).map(c=>c.id===id?{...c,message:message.trim().slice(0,1000),editedAt:new Date().toISOString()}:c))}
  deleteComment(slug:string,id:string){this.write(slug,this.comments(slug).filter(c=>c.id!==id))}
  private isComment(value:unknown):value is LocalComment {if(!value||typeof value!=='object')return false;const c=value as Record<string,unknown>;return typeof c['id']==='string'&&typeof c['displayName']==='string'&&c['displayName'].length<=80&&typeof c['message']==='string'&&c['message'].length<=1000&&typeof c['createdAt']==='string'&&!Number.isNaN(Date.parse(c['createdAt']))&&(c['editedAt']===undefined||(typeof c['editedAt']==='string'&&!Number.isNaN(Date.parse(c['editedAt']))))}
  private write(slug:string,items:LocalComment[]){try{this.storage?.setItem(`${this.prefix}:comments:${this.safeSlug(slug)}`,JSON.stringify(items.slice(0,100)))}catch{}}
}
