import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAcessoNegadoComponent } from './pagina-acesso-negado.component';

describe('PaginaAcessoNegadoComponent', () => {
  let component: PaginaAcessoNegadoComponent;
  let fixture: ComponentFixture<PaginaAcessoNegadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaAcessoNegadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaAcessoNegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
