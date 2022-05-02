import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsandnoteannonceComponent } from './commentsandnoteannonce.component';

describe('CommentsandnoteannonceComponent', () => {
  let component: CommentsandnoteannonceComponent;
  let fixture: ComponentFixture<CommentsandnoteannonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsandnoteannonceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsandnoteannonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
