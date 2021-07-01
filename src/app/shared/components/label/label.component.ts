import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'in4-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  @Input() labelText: string = '';
  @Input() icon: string = '';
  @Input() colorStyle: string = '';
  constructor() { }

  ngOnInit(): void {

  }


}
