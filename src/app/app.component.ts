import { Component } from '@angular/core';
import { version, name } from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = name;
  appversion = version;
}
