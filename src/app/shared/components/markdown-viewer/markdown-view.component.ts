import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { HighlightJS } from "ngx-highlightjs";
import marked from 'marked';

@Component({
  selector: 'in4-mv',
  templateUrl: './markdown-view.component.html'
})
export class MarkdownViewComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input() markdown: string = "";

  safeHtml: SafeHtml | undefined;

  private subscription: Subscription = new Subscription();

  constructor(private elRef: ElementRef, private sanitizer: DomSanitizer, private hljs: HighlightJS) {
  }

  ngOnInit() {
    if(this.markdown){
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(marked(this.markdown));
    }
  }

  ngAfterViewInit() {
    this.elRef.nativeElement.querySelectorAll("pre code").forEach((item: HTMLElement) => {
      const sub = this.hljs.highlightBlock(item as HTMLElement).subscribe();
      this.subscription.add(sub);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.markdown){
      
    }

    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(marked(this.markdown));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}