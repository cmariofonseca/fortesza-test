import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatViewComponent } from './pages/cat-view/cat-view.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'cat/:id',
        component: CatViewComponent,
      },
      {
        path: '**',
        redirectTo: 'main',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatsRoutingModule {}
