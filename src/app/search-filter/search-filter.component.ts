import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    CommonModule,
    DropdownModule,
    TooltipModule,
    FloatLabelModule,
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent {
  searchText: string = '';
  priority: string = '';
  priorityFilterOptions: string[] = ['P0', 'P1', 'P2'];

  @Output() searchEvent = new EventEmitter<string>();
  @Output() priorityEvent = new EventEmitter<string>();

  onSearch() {
    this.searchEvent.emit(this.searchText);
  }

  onPriorityChange() {
    this.priorityEvent.emit(this.priority);
  }
}
