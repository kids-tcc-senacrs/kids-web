import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConteudoRightComponent } from './home-conteudo-right.component';

describe('UsuarioFamiliarConteudoRightComponent', () => {
  let component: HomeConteudoRightComponent;
  let fixture: ComponentFixture<HomeConteudoRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeConteudoRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConteudoRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
