import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNaoCadastradoComponent } from './usuario-nao-cadastrado.component';

describe('UsuarioNaoCadastradoComponent', () => {
  let component: UsuarioNaoCadastradoComponent;
  let fixture: ComponentFixture<UsuarioNaoCadastradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioNaoCadastradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioNaoCadastradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
