import { Component, OnInit } from '@angular/core';
import { clients } from '../../assets/data';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableRow } from './clients-table-row';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule,FormsModule, ReactiveFormsModule],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.css'
})
export class ClientsTableComponent implements OnInit{
  data: TableRow[] = this.transformData(clients);
  filteredData: TableRow[] = this.transformData(clients);
  showSettings:boolean = false;
  pageSize : number = 10;
  totalItems: number = this.data.length;
  selectedPage: string | undefined;
  currentPage:number = 1;
  inputValue = '';
  sortBy: string = '';
  sortDirection: number = 1;
  selectOptions: number;

  columnForm: FormGroup;
  columns = ['Picture','Name','Surname', 'Age','Address','Balance','Company','email','Favourite Fruit','tags','Active'];
  columnsVisible: boolean[] = Array(this.columns.length).fill(true);
  constructor(private fb: FormBuilder) {
    this.selectOptions = this.data.length;
    this.columnForm = this.fb.group({});
    this.columns.forEach(column => {
      this.columnForm.addControl(column, this.fb.control(true)); // Set all checkboxes to true by default
    });
  }

  ngOnInit() {
    this.setPage(this.currentPage);
  }

  showDropdown(showSettings: boolean){
    this.showSettings = !showSettings;
  }

  toggleColumn(index: number) {
    this.columnsVisible[index] = !this.columnsVisible[index];
  }
  increaseValue(): void {
    if (this.pageSize < this.selectOptions) {
      this.pageSize++;
    }
  }

  decreaseValue(): void {
    if (this.pageSize > 0) {
      this.pageSize--;
    }
  }
  
  transformData(data: any[]): TableRow[] {
    return data.map(item => ({
      _id: item._id,
      isActive: item.isActive,
      balance: item.balance !== undefined ? item.balance : '',
      picture: item.picture,
      age: item.age,
      name: item.name !== undefined ? item.name['first'] : '',
      surname: item.name !== undefined && item.name.last !== undefined? item.name['last'] : '',
      company: item.company !== undefined ? item.company : '',
      email: item.email !== undefined ? item.email : '',
      address: item.address,
      favoriteFruit: item.favoriteFruit,
      tags: item.tags,
      key: item.key !== undefined ? item.key : ''
    }));
  }

  filterData(searchTerm: string) {
    this.filteredData = this.data.filter(item =>
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    this.totalItems = this.filteredData.length;
  }

  sortData(column: string): void {
    if(column === 'Favourite Fruit'){
      column = 'favoriteFruit';
    } else if(column === 'Active'){
      column = 'isActive';
    } else {
      column = column.toString().toLowerCase();
    }
    
    if (this.sortBy === column) {
      this.sortDirection = -this.sortDirection;
    } else {
      this.sortBy = column;
      this.sortDirection = 1; 
    }
    this.data.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * this.sortDirection;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * this.sortDirection;
      } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return (aValue === bValue ? 0 : aValue ? -1 : 1) * this.sortDirection;
      }  else if (typeof aValue === 'object' && typeof bValue === 'object') {
        return aValue[0].localeCompare(bValue[0]) * this.sortDirection;
      } else {
        return 0;
      }
    });
    this.filteredData = this.data;
  }

  setPage(page: number){
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.data.length);
    this.currentPage = page;
    this.filteredData = this.data.slice(startIndex, endIndex);
  }

  pageChanged(page: number) {
    this.setPage(page);
  }

  changePageAmount(){
    this.pageSize = parseInt(this.selectedPage !== undefined ? this.selectedPage : '0');
    this.pageChanged(1);
  }

}
