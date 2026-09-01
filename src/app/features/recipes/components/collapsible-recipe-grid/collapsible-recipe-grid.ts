import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-collapsible-recipe-grid',
  templateUrl: './collapsible-recipe-grid.html',
  styleUrl: './collapsible-recipe-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleRecipeGrid implements AfterViewInit, OnDestroy {
  private readonly grid = viewChild.required<ElementRef<HTMLElement>>('grid');
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;

  protected readonly expanded = signal(false);
  protected readonly expandable = signal(false);
  protected readonly secondRowTop = signal(0);

  ngAfterViewInit(): void {
    const grid = this.grid().nativeElement;

    this.resizeObserver = new ResizeObserver(() => this.measureRows());
    this.mutationObserver = new MutationObserver(() => this.observeCards());
    this.mutationObserver.observe(grid, { childList: true });
    this.observeCards();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  protected toggleExpanded(): void {
    this.expanded.update((expanded) => !expanded);
  }

  private observeCards(): void {
    const grid = this.grid().nativeElement;

    this.resizeObserver?.disconnect();
    this.resizeObserver?.observe(grid);

    for (const card of Array.from(grid.children)) {
      this.resizeObserver?.observe(card);
    }

    this.measureRows();
  }

  private measureRows(): void {
    const cards = Array.from(this.grid().nativeElement.children) as HTMLElement[];
    const firstCard = cards[0];

    if (!firstCard) {
      this.expandable.set(false);
      this.secondRowTop.set(0);
      return;
    }

    const firstRowTop = firstCard.offsetTop;
    const secondRowCard = cards.find((card) => card.offsetTop > firstRowTop + 1);

    if (!secondRowCard) {
      this.expandable.set(false);
      this.expanded.set(false);
      this.secondRowTop.set(0);
      return;
    }

    this.secondRowTop.set(secondRowCard.offsetTop);
    this.expandable.set(true);
  }
}
