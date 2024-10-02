import { ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPageComponent {}
