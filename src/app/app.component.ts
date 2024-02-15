import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { MyAppModule } from './app.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientsTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-pretty-table';
}
