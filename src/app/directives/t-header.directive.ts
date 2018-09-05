import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appTHeader]"
})
export class THeaderDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.color = "black"
  }
  
}
