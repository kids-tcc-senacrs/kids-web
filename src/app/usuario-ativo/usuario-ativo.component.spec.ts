import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAtivoComponent } from './usuario-ativo.component';

describe('UsuarioAtivoComponent', () => {
  let component: UsuarioAtivoComponent;
  let fixture: ComponentFixture<UsuarioAtivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioAtivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
