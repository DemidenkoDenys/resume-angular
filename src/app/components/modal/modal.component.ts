import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() open: boolean;
  @Input() url: string;
  @Input() type: string;

  @Output() onCloseModal = new EventEmitter<{}>();

  constructor() {}

  ngOnInit() {}

  closeModal() {
    this.onCloseModal.emit();
  }

}
