import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ModalComponent {

  @Input() open: boolean;
  @Input() url: string;
  @Input() type: string;

  @Output() onCloseModal = new EventEmitter<{}>();

  constructor() {}

  closeModal(): void {
    this.onCloseModal.emit();
  }

}
