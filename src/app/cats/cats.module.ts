import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatsRoutingModule } from './cats-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './pages/main/main.component';
import { SearchMenuComponent } from './components/search-menu/search-menu.component';
import { CardsComponent } from './components/cards/cards.component';
import { CatViewComponent } from './pages/cat-view/cat-view.component';

@NgModule({
  declarations: [MainComponent, SearchMenuComponent, CardsComponent, CatViewComponent],
  imports: [CommonModule, CatsRoutingModule, SharedModule],
})
export class CatsModule {}
