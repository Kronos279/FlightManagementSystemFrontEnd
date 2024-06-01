import { Component, EventEmitter, Output, output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatInputModule,MatButtonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  @Output() search = new EventEmitter<string>();
  text ="";
  onClick(){
    console.log("Search Button Clicked" + this.text)
    this.search.emit(this.text)
  }


  onKeyPress(event:any){
    console.log(event.target.value)
    this.search.emit(this.text)
    this.text=event.target.value;
  }
  inputChange(event:any){
    console.log(event.target.value)
    this.text=event.target.value;
  }

}
