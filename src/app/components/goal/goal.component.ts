import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent {

  data: Observable<{}>;

  constructor(private _fetch: FetchService) {
    this.data = this._fetch.getData();
  }

}
