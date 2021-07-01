import { Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'n4-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class FooterComponent {
  year = new Date().getFullYear();

  constructor(

  ) { }


}
