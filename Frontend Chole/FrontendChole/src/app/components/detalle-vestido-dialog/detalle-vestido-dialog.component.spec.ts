import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVestidoDialogComponent } from './detalle-vestido-dialog.component';

describe('DetalleVestidoDialogComponent', () => {
  let component: DetalleVestidoDialogComponent;
  let fixture: ComponentFixture<DetalleVestidoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleVestidoDialogComponent]
    });
    fixture = TestBed.createComponent(DetalleVestidoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
