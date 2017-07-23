import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriancaComponent } from './crianca.component';

describe('CriancaComponent', () => {
  let component: CriancaComponent;
  let fixture: ComponentFixture<CriancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
