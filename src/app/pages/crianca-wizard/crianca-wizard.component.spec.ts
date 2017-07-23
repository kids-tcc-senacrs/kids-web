import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriancaWizardComponent } from './crianca-wizard.component';

describe('CriancaWizardComponent', () => {
  let component: CriancaWizardComponent;
  let fixture: ComponentFixture<CriancaWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriancaWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriancaWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
