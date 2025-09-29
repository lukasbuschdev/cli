import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: 'textarea[autoGrow]',
  standalone: true
})
export class AutoGrowDirective implements OnInit {
  private minHeight!: number;

  constructor(private textarea: ElementRef<HTMLTextAreaElement>) {}

  ngOnInit() {
    const styles = window.getComputedStyle(this.textarea.nativeElement);
    this.minHeight = parseFloat(styles.height);
  }

  @HostListener('input')
  onInput() {
    this.resize();
  }

  public resize() {
    const textarea = this.textarea.nativeElement;
    textarea.style.overflow = 'hidden';

    if(textarea.scrollHeight > this.minHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    } else {
      textarea.style.removeProperty('height');
    }
  }
}

