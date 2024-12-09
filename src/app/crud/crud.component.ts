import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent {
  items: { id: number; name: string }[] = [];
  currentItem: { id: number; name: string } | null = null;
  itemName: string = '';

  constructor() {
    // Load items from local storage on component initialization
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  // Save items to local storage
  saveItemsToLocalStorage(): void {
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  // Create or update an item
  addOrUpdateItem(): void {
    if (this.itemName.trim() === '') {
      return;
    }

    if (this.currentItem) {
      // Update the existing item
      this.currentItem.name = this.itemName;
    } else {
      // Create a new item
      const newItem = { id: Date.now(), name: this.itemName };
      this.items.push(newItem);
    }

    this.itemName = '';
    this.currentItem = null;
    this.saveItemsToLocalStorage();
  }

  // Edit an item
  editItem(item: { id: number; name: string }): void {
    this.currentItem = item;
    this.itemName = item.name;
  }

  // Delete an item
  deleteItem(item: { id: number; name: string }): void {
    this.items = this.items.filter(i => i.id !== item.id);
    this.saveItemsToLocalStorage();
  }

  // Clear all items
  clearItems(): void {
    this.items = [];
    this.saveItemsToLocalStorage();
  }
}
