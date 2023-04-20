import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountdownComponent } from './countdown.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;
  let form: FormGroup = new FormGroup({});
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountdownComponent ],
      imports:[
        ReactiveFormsModule
        ,FormsModule],
        providers:[FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Prueba de formulario', () => {

    let fMinutes =  component.clockForm.controls['fMinutes'];
    let fSeconds = component.clockForm.controls['fSeconds'];
    let sMinutes =  component.clockForm.controls['sMinutes'];
    let sSeconds =  component.clockForm.controls['sSeconds'];
    let cycles = component.clockForm.controls['cycles'];

    fMinutes.setValue('00');
    fSeconds.setValue('05');
    sMinutes.setValue('00');
    sSeconds.setValue('05');
    cycles.setValue('1');

    expect(form.valid).toBe(true);
  })
  it('testing converter', () => {
    component.timeConverter(120);
    let array = [component.minutes,component.seconds];
    expect(array).toEqual(['02','00'])
  })
  it('testing converter to seconds', () => {
    let result = component.convertingToSeconds(2,25);
    expect(result).toEqual(145);
  })
  it('prove of clockform reset',() => {
    let fMinutes = component.clockForm.controls['fMinutes'];
    let fSeconds = component.clockForm.controls['fSeconds'];
    let sMinutes = component.clockForm.controls['sMinutes'];
    let sSeconds = component.clockForm.controls['sSeconds'];
    let cycles = component.clockForm.controls['cycles'];

    component.resetClockForm();

    let arr = [fMinutes.value,fSeconds.value, sMinutes.value,sSeconds.value, cycles.value];

    expect(arr).toEqual(['00','00','00','00','01']);

  })
});
