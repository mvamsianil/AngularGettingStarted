import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from '../entity/alert';
import { AlertService } from '../alert.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;  
  alerts: Alert[] = [];  
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private _alertService: AlertService, private _router: Router) {  }

  ngOnInit() {
    this.alertSubscription = this._alertService.onAlert(this.id).subscribe((alert: Alert) => {
        if(!alert.message) {
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        this.alerts.push(alert);
        if(alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      }
    );

    this.routeSubscription = this._router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this._alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if(!this.alerts.includes(alert)) return;

    if(this.fade) {
      alert.fade  =true;

      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if(!alert) return;

    const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];
    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning',
    };

    classes.push(alertTypeClass[alert.type]);

    if(alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}