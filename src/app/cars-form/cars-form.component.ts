import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import {Car} from '../car.model';
import * as moment from 'moment';
import {AppState} from '../redux/app.state';
import {AddCar} from '../redux/cars.action';
import {CarsService} from '../cars.service';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent implements OnInit {
  carName: string = '';
  carModel: string = '';
  // public car: Partial<Car> = {};

  // @Output() addCar = new EventEmitter<Car>();

  // private id: number = 2;

  constructor(private store: Store<AppState>, private service: CarsService) { }

  ngOnInit() {
  }

  onAdd() {
    if (this.carModel === '' || this.carName === '') { return; }

    // this.id = ++this.id;

    // this.car.name =

    const car = new Car(
      this.carName,
      moment().format('DD.MM.YY'),
      this.carModel,
      false,
      // this.id
    );
    // this.addCar.emit(car);
    // this.store.dispatch(new AddCar(car));
    this.service.addCar(car);

    this.carName = '';
    this.carModel = '';
  }

  onLoad() {
    this.service.loadCars();
  }
}
