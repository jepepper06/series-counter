import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  clockForm: FormGroup;
  minutes: number | string = '00';
  seconds: number | string = '00';
  errorMessage: string;
  subscription: Subscription;
  alarmUrl: string = '../../../assets/alarm.mp3';

  constructor(private _builder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.clockForm = this._builder.group({
      fMinutes: ['00',Validators.required],
      fSeconds: ['00',Validators.required],
      sMinutes: ['00',Validators.required],
      sSeconds: ['00',Validators.required],
      cycles: ['1',Validators.required]
    });
  }
  setErrorMessage(value: string){
    this.errorMessage = value;
  }
  playAlarm(): void{
    let audio: HTMLAudioElement = new Audio(this.alarmUrl);
    audio.play()
    setTimeout(() => {
      audio.pause();
      audio.load();
    },1400);
  }
  convertingToSeconds(minutes: number, seconds: number): number{
    let result: number;
    if(seconds != 0){
      result = minutes*60+seconds;
    }else{
      result = minutes*60;
    }
    return result;
  }
  timeConverter(timeInSeconds: number): void{
    this.minutes = Math.trunc((timeInSeconds)/60);
    this.seconds = timeInSeconds%60;
    if(this.minutes < 10){
      this.minutes = '0'+this.minutes;
    }
    if(this.seconds < 10){
      this.seconds = '0'+this.seconds;
    }
  }
  resetClockForm(): void | string {
    this.clockForm.controls['fMinutes'].setValue('00');
    this.clockForm.controls['fSeconds'].setValue('00');
    this.clockForm.controls['sMinutes'].setValue('00');
    this.clockForm.controls['sSeconds'].setValue('00');
    this.clockForm.controls['cycles'].setValue('01');
  }
  startCounting(): void{
    let firstInterval: number = this.convertingToSeconds(
      this.clockForm.get('fMinutes')?.value,
      this.clockForm.get('fSeconds')?.value);
      let secondInterval: number = this.convertingToSeconds(
        this.clockForm.get('sMinutes')?.value,
        this.clockForm.get('sSeconds')?.value);
    let cycles: number = this.clockForm.get('cycles')?.value;
    let secondsCounted: number = 0;
    let step: number = 0;
    let source = interval(1000);
    const playingAudioLogic = () => {
      this.resetClockForm();
      secondsCounted+=1;
      if(firstInterval == 0 || secondInterval == 0){
        this.setErrorMessage('No se puede inicializar una cuenta con 0');
        return;
      }
      if(secondsCounted <= firstInterval){
        this.timeConverter(firstInterval - secondsCounted);
      }else{
        this.timeConverter(firstInterval + secondInterval - secondsCounted);
      }
      if(secondsCounted == firstInterval){
        this.playAlarm();
      }
      if(secondsCounted == secondInterval+firstInterval){
        this.playAlarm();
        step+=1;
        secondsCounted = 0;
        if(step == cycles){
          this.subscription.unsubscribe();
        }
      }
    }
    this.subscription = source.subscribe(playingAudioLogic);
  }


}
