import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerDialogComponent } from './alquiler-dialog.component';

describe('AlquilerDialogComponent', () => {
  let component: AlquilerDialogComponent;
  let fixture: ComponentFixture<AlquilerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlquilerDialogComponent]
    });
    fixture = TestBed.createComponent(AlquilerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
