import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoIndisponivelComponent } from './servico-indisponivel.component';

describe('ServicoIndisponivelComponent', () => {
  let component: ServicoIndisponivelComponent;
  let fixture: ComponentFixture<ServicoIndisponivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicoIndisponivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoIndisponivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
