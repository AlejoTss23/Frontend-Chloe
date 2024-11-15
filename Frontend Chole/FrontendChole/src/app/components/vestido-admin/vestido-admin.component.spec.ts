import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidoAdminComponent } from './vestido-admin.component';

describe('VestidoAdminComponent', () => {
  let component: VestidoAdminComponent;
  let fixture: ComponentFixture<VestidoAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VestidoAdminComponent]
    });
    fixture = TestBed.createComponent(VestidoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
