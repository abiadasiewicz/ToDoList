import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToDoPageComponent } from './add-to-do-page.component';

describe('AddToDoPageComponent', () => {
  let component: AddToDoPageComponent;
  let fixture: ComponentFixture<AddToDoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToDoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToDoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
