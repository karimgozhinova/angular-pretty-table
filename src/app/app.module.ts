import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxPaginationModule } from "ngx-pagination";
import { ClientsTableComponent } from "./clients-table/clients-table.component";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, ClientsTableComponent, NgxPaginationModule, ReactiveFormsModule],
    declarations: [],
    bootstrap: []
})
export class MyAppModule {}

