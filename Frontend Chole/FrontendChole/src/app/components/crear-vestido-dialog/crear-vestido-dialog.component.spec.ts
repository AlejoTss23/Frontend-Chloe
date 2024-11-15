import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVestidoDialogComponent } from './crear-vestido-dialog.component';

describe('CrearVestidoDialogComponent', () => {
  let component: CrearVestidoDialogComponent;
  let fixture: ComponentFixture<CrearVestidoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearVestidoDialogComponent]
    });
    fixture = TestBed.createComponent(CrearVestidoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
