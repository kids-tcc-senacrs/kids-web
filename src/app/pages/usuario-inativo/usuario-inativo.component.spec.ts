import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInativoComponent } from './usuario-inativo.component';

describe('UsuarioInativoComponent', () => {
  let component: UsuarioInativoComponent;
  let fixture: ComponentFixture<UsuarioInativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioInativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioInativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
