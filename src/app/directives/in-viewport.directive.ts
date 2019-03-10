import {
  Directive,
  OnInit,
  OnDestroy,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { fromEvent } from "rxjs";

@Directive({
  selector: "[in-viewport]"
})
export class InViewportDirective implements OnInit, OnDestroy {
  private scroll: any;
  private resize: any;

  @Output("inViewport") inViewport: EventEmitter<Object>;

  constructor(private _el: ElementRef) {
    this.inViewport = new EventEmitter();
  }

  ngOnInit() {
    this.check();
    this.scroll = fromEvent(window, "scroll").subscribe(event => this.check());
    this.resize = fromEvent(window, "resize").subscribe(event => this.check());
  }

  ngOnDestroy() {
    this.scroll.unsubscribe();
    this.resize.unsubscribe();
  }

  check(partial: boolean = true, direction: string = "both") {
    const el = this._el.nativeElement;
    const elSize = el.offsetWidth * el.offsetHeight;
    const rec = el.getBoundingClientRect();
    const vp = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const tViz = rec.top >= 0 && rec.top < vp.height;
    const bViz = rec.bottom > 0 && rec.bottom <= vp.height;
    const lViz = rec.left >= 0 && rec.left < vp.width;
    const rViz = rec.right > 0 && rec.right <= vp.width;
    const vVisible = partial ? tViz || bViz : tViz && bViz;
    const hVisible = partial ? lViz || rViz : lViz && rViz;

    let event = {
      target: el,
      value: false
    };

    el.classList.add('in-viewport');

    if (direction === "both") {
      event["value"] = elSize && vVisible && hVisible ? true : false;
    } else if (direction === "vertical") {
      event["value"] = elSize && vVisible ? true : false;
    } else if (direction === "horizontal") {
      event["value"] = elSize && hVisible ? true : false;
    }

    if (!el.classList.contains("animated") && event["value"]) {
      el.classList.add("animated");
    }

    this.inViewport.emit(event);
  }
}
