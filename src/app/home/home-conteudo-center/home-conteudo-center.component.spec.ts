import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConteudoCenterComponent } from './home-conteudo-center.component';

describe('HomeConteudoCenterComponent', () => {
  let component: HomeConteudoCenterComponent;
  let fixture: ComponentFixture<HomeConteudoCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeConteudoCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConteudoCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
