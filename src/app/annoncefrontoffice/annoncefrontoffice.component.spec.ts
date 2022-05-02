import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncefrontofficeComponent } from './annoncefrontoffice.component';

describe('AnnoncefrontofficeComponent', () => {
  let component: AnnoncefrontofficeComponent;
  let fixture: ComponentFixture<AnnoncefrontofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnoncefrontofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncefrontofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
