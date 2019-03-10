import { Directive, OnInit, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scale-iframe]'
})
export class ScaleIframeDirective implements OnInit {

  @Input() scale: number;
  @Input() width: number;
  @Input() height: number;

  private _iframeHTMLElement: HTMLHyperlinkElementUtils;
  private iframeWrapper: HTMLElement;

  constructor(
    private iframe: ElementRef,
    private renderer: Renderer2
  ) {
    this._iframeHTMLElement = iframe.nativeElement;
    this.iframeWrapper = iframe.nativeElement.parentElement;
  }

  ngOnInit() {
    this.scaleIframe();
    this.resizeIframe();
  }

  ngOnChanges() {
    this.scaleIframe();
    this.resizeIframe();
  }

  @HostListener('window:resize', [])
  onResize(){
    this.scaleIframe();
  }

  resizeIframe() {
    this.renderer.setStyle(this._iframeHTMLElement, 'width', `${this.width}px`);
    this.renderer.setStyle(this._iframeHTMLElement, 'height', `${this.height}px`);
  }

  scaleIframe() {
    this.renderer.setStyle(this._iframeHTMLElement, 'transform', `scale(${ this.iframeWrapper.offsetWidth * this.scale / this.width })`);
  }

}
