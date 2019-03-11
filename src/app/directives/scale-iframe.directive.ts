import { Directive, OnInit, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { fromEvent } from "rxjs";

@Directive({
  selector: '[scale-iframe]'
})
export class ScaleIframeDirective implements OnInit {

  @Input() scale: number;
  @Input() width: number;
  @Input() height: number;

  private _iframeHTMLElement: HTMLHyperlinkElementUtils;
  private _iframeWrapper: HTMLElement;
  private _resize: any;

  constructor(
    private iframe: ElementRef,
    private renderer: Renderer2
  ) {
    this._iframeHTMLElement = iframe.nativeElement;
    this._iframeWrapper = iframe.nativeElement.parentElement;
  }

  ngOnInit() {
    this.scaleIframe();
    this.resizeIframe();
    this._resize = fromEvent(window, "resize").subscribe(() => this.scaleIframe());
  }

  ngOnChanges() {
    this.scaleIframe();
    this.resizeIframe();
  }

  ngOnDestroy() {
    this._resize.unsubscribe();
  }

  resizeIframe() {
    this.renderer.setStyle(this._iframeHTMLElement, 'width', `${this.width}px`);
    this.renderer.setStyle(this._iframeHTMLElement, 'height', `${this.height}px`);
  }

  scaleIframe() {
    this.renderer.setStyle(this._iframeHTMLElement, 'transform', `scale(${ this._iframeWrapper.offsetWidth * this.scale / this.width })`);
  }

}
