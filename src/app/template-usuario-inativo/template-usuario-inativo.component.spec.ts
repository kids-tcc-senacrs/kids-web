import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateUsuarioInativoComponent } from './template-usuario-inativo.component';

describe('TemplateUsuarioInativoComponent', () => {
  let component: TemplateUsuarioInativoComponent;
  let fixture: ComponentFixture<TemplateUsuarioInativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateUsuarioInativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateUsuarioInativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
