import { bootstrapApplication } from '@angular/platform-browser';
import { CrudComponent } from './app/crud/crud.component';

bootstrapApplication(CrudComponent)
  .catch(err => console.error(err));
