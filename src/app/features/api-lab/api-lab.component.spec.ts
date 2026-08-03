import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiLabComponent } from './api-lab.component';

describe('ApiLabComponent',()=>{
  it('sends text to the analyzer and renders the structured result',async()=>{
    await TestBed.configureTestingModule({imports:[ApiLabComponent],providers:[provideHttpClient(),provideHttpClientTesting()]}).compileComponents();
    const fixture=TestBed.createComponent(ApiLabComponent);
    const http=TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    fixture.componentInstance.text='FastAPI works.';
    fixture.componentInstance.analyze();
    const request=http.expectOne('http://localhost:8000/api/v1/playground/text-analysis');
    expect(request.request.body).toEqual({text:'FastAPI works.'});
    request.flush({success:true,message:'Text analyzed',data:{character_count:14,character_count_excluding_spaces:13,word_count:2,unique_word_count:2,sentence_count:1,average_word_length:6,most_frequent_words:[{word:'fastapi',count:1}],estimated_reading_time_minutes:.01,uppercase_count:4,lowercase_count:8,digit_count:0,special_character_count:1}});
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('2');
    expect(fixture.nativeElement.textContent).toContain('Words');
    http.verify();
  });
});
