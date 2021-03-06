import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterestsComponent {

  interests$: Observable<{}>;

  sliderSettings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 100,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } }
    ]
  };

  constructor(private _fetch: FetchService) {
    this.interests$ = this._fetch.getInterests();
  }

}
