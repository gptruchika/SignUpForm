import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateChildGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Promise<boolean> | Observable<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
