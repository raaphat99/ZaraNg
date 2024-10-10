import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { HelpComponent } from "./features/help/components/help/help.component";
import { SearchComponent } from "./features/search/components/search/search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HelpComponent, HelpComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZaraNg';
}
