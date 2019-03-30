import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTitleComponent{

  back: boolean;

  @Input() title: string;
  @Input() externalLink: string;
  @Input() set backLink(value: any) {
    this.back = (value != null && `${value}` !== 'false');
  }

  constructor(private _location: Location) {}

  backClicked() {
    this._location.back();
  }
}
