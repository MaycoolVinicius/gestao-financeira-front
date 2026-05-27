import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaReceita } from './nova-receita';

describe('NovaReceita', () => {
  let component: NovaReceita;
  let fixture: ComponentFixture<NovaReceita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaReceita],
    }).compileComponents();

    fixture = TestBed.createComponent(NovaReceita);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
