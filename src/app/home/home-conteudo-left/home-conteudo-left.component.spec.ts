import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFamiliarConteudoLeftComponent } from './usuario-familiar-conteudo-left.component';

describe('UsuarioFamiliarConteudoLeftComponent', () => {
  let component: UsuarioFamiliarConteudoLeftComponent;
  let fixture: ComponentFixture<UsuarioFamiliarConteudoLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioFamiliarConteudoLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFamiliarConteudoLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
