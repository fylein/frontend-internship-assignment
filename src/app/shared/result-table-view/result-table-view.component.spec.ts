import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultTableViewComponent } from './result-table-view.component';

describe('ResultTableViewComponent', () => {
  let component: ResultTableViewComponent;
  let fixture: ComponentFixture<ResultTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultTableViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
