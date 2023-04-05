import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrendingSubjectsComponent } from './trending-subjects.component';

describe('TrendingSubjectsComponent', () => {
  let component: TrendingSubjectsComponent;
  let fixture: ComponentFixture<TrendingSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrendingSubjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
