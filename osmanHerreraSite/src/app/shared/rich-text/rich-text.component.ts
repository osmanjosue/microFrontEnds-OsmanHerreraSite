import { Component, Input } from '@angular/core';
import { RichText, RichTextSegment } from '@shared/content';

// Renderiza un RichText del config compartido (texto + segmentos con formato)
@Component({
  selector: 'app-rich-text',
  template: `<ng-container *ngFor="let seg of value"
    ><ng-container *ngIf="asSegment(seg) as s; else plain"
      ><a *ngIf="s.href; else span" [href]="s.href" [ngClass]="classes(s)">{{ s.text }}</a
      ><ng-template #span><span [ngClass]="classes(s)">{{ s.text }}</span></ng-template></ng-container
    ><ng-template #plain>{{ seg }}</ng-template></ng-container
  >`,
})
export class RichTextComponent {
  @Input({ required: true }) value: RichText = [];

  asSegment(seg: string | RichTextSegment): RichTextSegment | null {
    return typeof seg === 'string' ? null : seg;
  }

  classes(s: RichTextSegment): Record<string, boolean> {
    return {
      'color-variant': !!s.highlight,
      'font-semibold': !!s.bold,
      'underline hover:opacity-85': !!s.href,
    };
  }
}
