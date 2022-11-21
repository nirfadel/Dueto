import { ɵparseCookieValue } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { RocketTimer } from './rocket.model';

@Component({
  selector: 'count-down-clock',
  templateUrl: './count.down.clock.html',
  styleUrls: ['./count.down.clock.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountDownClockComponent implements OnInit {
  timerNumber: number = 5 * 60 * 1000;
  minutes: number = 5;
  seconds: number = 0;
  rocketTimer: RocketTimer | undefined;
  startTimer: Subscription | undefined;
  firstTimeStamp: number | undefined;
  ngOnInit(): void {
     this.firstTimeStamp = Date.now();
     this.saveToSession(true);
     this.startTimer = timer(0, 1000).subscribe(x => this.calculateTimer());
  }
 
  calculateTimer()
  {
    let rt = sessionStorage.getItem("timerNumber")!;
    if(rt!= "null")
    {
      this.rocketTimer = JSON.parse(rt);
      const currentTimeStamp = Date.now();
      if(this.rocketTimer?.timeStamp != this.firstTimeStamp)
      {
        this.timerNumber = this.rocketTimer?.time!;
      }
    }
    
    this.timerNumber = this.timerNumber - 1000;
    this.minutes = Math.floor((this.timerNumber % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.timerNumber % (1000 * 60)) / 1000);
    
    if(this.timerNumber === 0)
    {
      this.startTimer?.unsubscribe();
      alert("You missed the last rocket to mars!");
    }

    this.saveToSession(false);
  }

  saveToSession(first: boolean)
  {
    let rt = sessionStorage.getItem("timerNumber")!;
    if(first)
    {
      if(rt == null || rt == "null")
      {
        this.rocketTimer = JSON.parse(rt);
        this.rocketTimer = new RocketTimer();
        this.rocketTimer.time = this.timerNumber;
        this.rocketTimer.timeStamp = this.firstTimeStamp;
      }
      else
      {
        const currentRT: RocketTimer = JSON.parse(rt);
        currentRT.timeStamp = Date.now();
        this.rocketTimer = currentRT;
      }
    }
    else
    {
      this.rocketTimer = JSON.parse(rt);
      if(this.rocketTimer != null)
      {
        this.rocketTimer.time = this.timerNumber;
      }
    }
    sessionStorage.setItem("timerNumber", JSON.stringify(this.rocketTimer));
  }

  resetTimer()
  {
     this.timerNumber = 5 * 60 * 1000;
     sessionStorage.removeItem("timerNumber");
     this.saveToSession(true);
  }

}
