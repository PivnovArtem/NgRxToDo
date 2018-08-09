import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from '../car.model';
import {AppState} from '../redux/app.state';
import {Store} from '@ngrx/store';
import {DeleteCar, UpdateCar} from '../redux/cars.action';
import {CarsService} from '../cars.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  @Input() car: Car;

  constructor(private store: Store<AppState>, private service: CarsService) { }

  ngOnInit() {
  }

  onDelete() {
    // this.store.dispatch(new DeleteCar(this.car));
    this.service.deleteCar(this.car);
  }

  onBuy() {
    // this.store.dispatch(new UpdateCar(this.car));
    this.car.isSolid = true;
    this.service.updateCar(this.car);
  }
}
